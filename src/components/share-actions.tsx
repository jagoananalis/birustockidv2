import { useEffect, useState } from "react";
import { Check, Copy, Send, Share2 } from "lucide-react";
import { IconTelegram } from "@/components/icons";

export function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const share = async () => {
    if (!url) return;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const copy = async () => {
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const telegram = url ? `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` : "#";
  const whatsapp = url ? `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}` : "#";

  return <div className="share-actions" aria-label="Bagikan konten">
    <span className="share-label"><Share2 size={15} /> Bagikan</span>
    <button type="button" className="share-btn" onClick={copy} aria-label="Salin tautan">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Tersalin" : "Salin"}</button>
    <a className="share-btn" href={telegram} target="_blank" rel="noopener noreferrer"><IconTelegram size={15} /> Telegram</a>
    <a className="share-btn" href={whatsapp} target="_blank" rel="noopener noreferrer"><Send size={14} /> WhatsApp</a>
    <button type="button" className="share-btn share-btn-primary" onClick={share}><Share2 size={15} /> Bagikan</button>
  </div>;
}

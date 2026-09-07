import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { IconInstagram, IconTelegram, IconTikTok } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { submitContactMessage } from "@/lib/contact";

export const Route = createFileRoute("/kontak")({
  component: KontakPage,
  head: () => ({
    meta: [{ title: "Kontak | Birustock Indonesia" }],
  }),
});

function KontakPage() {
  const [error, setError] = useState("");
  const [sentName, setSentName] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    setError("");
    setBusy(true);
    try {
      await submitContactMessage({ data: { name, email, message } });
      setSentName(name);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pesan gagal dikirim. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  if (sentName) {
    return (
      <section className="py-16">
        <div className="container-site">
          <div className="enter-up mx-auto max-w-xl rounded-md border border-line bg-surface px-10 py-10 text-center">
            <h2 className="mb-2.5 text-xl font-extrabold">Terima kasih, {sentName}!</h2>
            <p className="mb-5 text-muted">
              Pesan kamu sudah kami terima. Tim Birustock akan merespons secepatnya.
            </p>
            <Link to="/" className="btn btn-primary">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Hubungi Kami"
        title="Kontak Birustock Indonesia"
        description="Ada pertanyaan seputar analisis, kerja sama, atau masukan untuk konten kami? Kirim pesan lewat form atau kanal sosial di bawah."
      />
      <section className="py-16 max-md:py-11">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <form onSubmit={onSubmit} noValidate>
            {error ? <p className="mb-3.5 text-sm text-accent-red">{error}</p> : null}
            <div className="mb-4">
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                Nama
              </label>
              <input id="name" name="name" type="text" className="form-field" placeholder="Nama lengkap" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <input id="email" name="email" type="email" className="form-field" placeholder="email@contoh.com" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
                Pesan
              </label>
              <textarea id="message" name="message" rows={5} className="form-field" placeholder="Tulis pesan kamu di sini..." required />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
              {busy ? "Mengirim…" : "Kirim Pesan"}
            </button>
          </form>

          <div>
            <ContactRow icon={<IconTelegram />} title="Telegram" href="https://t.me/birustockid" label="t.me/birustockid" />
            <ContactRow icon={<IconTikTok />} title="TikTok" href="https://www.tiktok.com/@birustock.id" label="@birustock.id" />
            <ContactRow icon={<IconInstagram />} title="Instagram" href="https://www.instagram.com/birustock.id" label="@birustock.id" />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  title,
  href,
  label,
}: {
  icon: ReactNode;
  title: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mb-6 flex gap-3.5">
      <div className="icon-tile">{icon}</div>
      <div>
        <h4 className="mb-1 text-[15px] font-bold">{title}</h4>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary">
          {label}
        </a>
      </div>
    </div>
  );
}

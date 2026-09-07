import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Newspaper } from "lucide-react";
import type { AnalisisItem, EdukasiItem } from "@/lib/content";
import type { NewsItem } from "@/lib/news";
import { AnalisisCard } from "@/components/analisis-card";
import { EdukasiCard } from "@/components/edukasi-card";
import { NewsThumb } from "@/components/icons";

export function RelatedContent({ analisis = [], news = [], edukasi = [] }: { analisis?: AnalisisItem[]; news?: NewsItem[]; edukasi?: EdukasiItem[] }) {
  return <section className="related-section"><div className="container-site"><div className="section-kicker"><div><span className="eyebrow">Lanjut eksplorasi</span><h2>Konten terkait</h2></div><span className="section-kicker-note">Temukan konteks lain sebelum lanjut.</span></div>
    <div className="related-grid">
      {analisis.length ? <div><div className="related-heading"><span><FileText size={16} /> Analisis</span><Link to="/analisis" search={{ page: 1 }} className="link-arrow">Lihat semua <ArrowRight size={14} /></Link></div><div className="related-stack">{analisis.slice(0, 2).map((item) => <AnalisisCard key={item.slug} item={item} />)}</div></div> : null}
      {news.length ? <div><div className="related-heading"><span><Newspaper size={16} /> News</span><Link to="/news" search={{ page: 1 }} className="link-arrow">Lihat semua <ArrowRight size={14} /></Link></div><div className="related-news-list">{news.slice(0, 3).map((item) => <Link key={item.slug} to="/news/$slug" params={{ slug: item.slug }} search={{ page: 1 }} className="related-news-item"><div className="related-thumb"><NewsThumb type={item.thumb} /></div><div><span>{item.category}</span><strong>{item.title}</strong><small>{item.date}</small></div><ArrowRight size={15} /></Link>)}</div></div> : null}
      {edukasi.length ? <div><div className="related-heading"><span><BookOpen size={16} /> Edukasi</span><Link to="/edukasi" search={{ page: 1 }} className="link-arrow">Lihat semua <ArrowRight size={14} /></Link></div><div className="related-stack">{edukasi.slice(0, 2).map((item) => <EdukasiCard key={item.slug} item={item} />)}</div></div> : null}
    </div>
  </div></section>;
}

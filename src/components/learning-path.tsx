import { BookOpen, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { EdukasiItem, EduLevel } from "@/lib/content";

const ORDER: EduLevel[] = ["Pemula", "Menengah", "Lanjutan"];

export function LearningPath({ items }: { items: EdukasiItem[] }) {
  return <div className="learning-path"><div className="learning-intro"><div><span className="eyebrow">Learning path</span><h2>Belajar bertahap, bukan acak</h2><p>Mulai dari fondasi, naik ke praktik, lalu perdalam konteks dan strategi.</p></div><div className="learning-total"><strong>{items.length}</strong><span>materi tersedia</span></div></div><div className="learning-levels">
    {ORDER.map((level, index) => {
      const lessons = items.filter((item) => item.level === level);
      return <section className="learning-level" key={level}><div className="learning-level-head"><span className="learning-step">0{index + 1}</span><div><strong>{level}</strong><span>{lessons.length} materi</span></div></div><div className="learning-lesson-list">{lessons.map((item, lessonIndex) => <Link key={item.slug} to="/edukasi/$slug" params={{ slug: item.slug }} className="learning-lesson"><span className="learning-lesson-icon"><BookOpen size={16} /></span><span className="learning-lesson-copy"><strong>{item.title}</strong><span>{item.description}</span></span><span className="learning-check"><CheckCircle2 size={15} /></span><span className="learning-index">{lessonIndex + 1}</span></Link>)}</div></section>;
    })}
  </div></div>;
}

import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@/components/icons";
import type { EdukasiItem } from "@/lib/content";

export function EdukasiCard({ item }: { item: EdukasiItem }) {
  return (
    <Link to="/edukasi/$slug" params={{ slug: item.slug }} className="edu-card">
      <div className="card-cover">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt="" loading="lazy" />
        ) : (
          <div className="skeleton size-full" />
        )}
      </div>
      <div className="edu-card-body">
        <div className="text-xs font-bold tracking-wide text-primary uppercase">{item.level}</div>
        <h3 className="text-[17px] font-bold">{item.title}</h3>
        <p className="text-sm text-muted">{item.description}</p>
        <span className="link-arrow mt-2">
          Baca Materi <IconArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

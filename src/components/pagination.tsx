import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, search }: { page: number; totalPages: number; search: Record<string, unknown> }) {
  if (totalPages <= 1) return null;
  const makeSearch = (nextPage: number) => ({ ...search, page: nextPage });
  return (
    <nav className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6" aria-label="Navigasi halaman">
      {page > 1 ? (
        <Link to="." search={makeSearch(page - 1) as never} className="btn btn-outline"><ChevronLeft size={16} /> Sebelumnya</Link>
      ) : <span className="btn btn-outline opacity-40"><ChevronLeft size={16} /> Sebelumnya</span>}
      <span className="text-sm text-subtle">Halaman {page} dari {totalPages}</span>
      {page < totalPages ? (
        <Link to="." search={makeSearch(page + 1) as never} className="btn btn-outline">Berikutnya <ChevronRight size={16} /></Link>
      ) : <span className="btn btn-outline opacity-40">Berikutnya <ChevronRight size={16} /></span>}
    </nav>
  );
}

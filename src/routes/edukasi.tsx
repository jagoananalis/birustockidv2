import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { EdukasiCard } from "@/components/edukasi-card";
import { PageHero } from "@/components/page-hero";
import { Pagination } from "@/components/pagination";
import { listEdukasiPage } from "@/lib/content";

export const Route = createFileRoute("/edukasi")({
  validateSearch: z.object({ page: z.coerce.number().int().min(1).catch(1) }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ deps }) => listEdukasiPage({ data: { page: deps.page, pageSize: 9 } }),
  component: EdukasiPage,
  head: () => ({ meta: [{ title: "Edukasi Trading | Birustock Indonesia", name: "description", content: "Materi edukasi trading Birustock dari dasar hingga lanjutan." }] }),
});

function EdukasiPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();

  return (
    <>
      <PageHero eyebrow="Edukasi Trading" title="Belajar dari Dasar hingga Lanjutan" description="Klik materi yang kamu minati untuk membaca pembahasan lengkap, contoh, dan konsep pentingnya." />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          {data.items.length === 0 ? (
            <p className="text-sm text-subtle">Belum ada materi. Founder bisa menambahkan lewat Studio.</p>
          ) : (
            <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item) => <EdukasiCard key={item.slug} item={item} />)}
            </div>
          )}
          <Pagination page={data.page} totalPages={data.totalPages} search={{ ...search }} />
        </div>
      </section>
    </>
  );
}

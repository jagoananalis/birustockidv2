import { createFileRoute } from "@tanstack/react-router";
import { EdukasiCard } from "@/components/edukasi-card";
import { PageHero } from "@/components/page-hero";
import { listEdukasi } from "@/lib/content";

export const Route = createFileRoute("/edukasi")({
  loader: () => listEdukasi(),
  component: EdukasiPage,
  head: () => ({
    meta: [{ title: "Edukasi Trading | Birustock Indonesia" }],
  }),
});

function EdukasiPage() {
  const items = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Edukasi Trading"
        title="Belajar dari Dasar hingga Lanjutan"
        description="Materi edukasi seputar forex, emas, dan kripto — diunggah founder, lengkap dengan gambar dan penjelasan."
      />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          {items.length === 0 ? (
            <p className="text-sm text-subtle">Belum ada materi. Founder bisa menambahkan lewat Studio.</p>
          ) : (
            <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <EdukasiCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IconArrowRight } from "@/components/icons";
import { getEdukasiBySlug } from "@/lib/content";
import { splitParagraphs } from "@/lib/format";

export const Route = createFileRoute("/edukasi/$slug")({
  loader: async ({ params }) => {
    const item = await getEdukasiBySlug({ data: { slug: params.slug } });
    if (!item) throw notFound();
    return item;
  },
  component: EdukasiDetail,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Edukasi"} | Birustock Indonesia` },
      { name: "description", content: loaderData?.description ?? "" },
    ],
  }),
});

function EdukasiDetail() {
  const item = Route.useLoaderData();
  const paragraphs = splitParagraphs(item.body);

  return (
    <section className="py-16 max-md:py-11">
      <div className="container-site">
        <article className="mx-auto max-w-[760px] stagger">
          <div className="mb-6">
            <Link to="/edukasi" className="link-arrow">
              <span className="inline-block rotate-180">
                <IconArrowRight size={15} />
              </span>
              Kembali ke Edukasi
            </Link>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <span className="badge">{item.level}</span>
          </div>
          <h1 className="mb-6 text-[30px] leading-snug font-extrabold tracking-tight">{item.title}</h1>
          {item.imageUrl ? (
            <div className="cover-frame mb-8">
              <img src={item.imageUrl} alt={item.title} />
            </div>
          ) : null}
          {paragraphs.map((p) => (
            <p key={p} className="mb-4.5 text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <div className="mt-8 rounded-[8px] border border-line bg-bg-alt px-4.5 py-4 text-[13.5px] text-muted">
            Materi ini bersifat edukasi umum untuk membantu memahami konsep dasar trading, bukan
            rekomendasi atau sinyal untuk membuka posisi tertentu. Selalu sesuaikan dengan riset dan
            toleransi risiko pribadi.
          </div>
        </article>
      </div>
    </section>
  );
}

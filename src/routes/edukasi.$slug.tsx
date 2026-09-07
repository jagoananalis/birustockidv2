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
  head: ({ loaderData }) => {
    const title = `${loaderData?.title ?? "Edukasi"} | Birustock Indonesia`;
    const description = loaderData?.description ?? "";
    const image = loaderData?.imageUrl || "/og.jpg";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/edukasi/${loaderData?.slug ?? ""}` }],
    };
  },
});

function EdukasiDetail() {
  const item = Route.useLoaderData();
  const paragraphs = splitParagraphs(item.body);

  return (
    <section className="py-16 max-md:py-11">
      <div className="container-site">
        <article className="mx-auto max-w-[760px] stagger">
          <div className="mb-6">
            <Link to="/edukasi" search={{ page: 1 }} className="link-arrow">
              <span className="inline-block rotate-180">
                <IconArrowRight size={15} />
              </span>
              Kembali ke Edukasi
            </Link>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="badge">{item.level}</span><span className="text-[13px] text-subtle">Terbit {item.publishedAt}</span>
          </div>
          <h1 className="mb-4 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.08] font-extrabold tracking-tight">{item.title}</h1>
          <p className="mb-7 text-lg leading-relaxed text-muted">{item.description}</p>
          {item.imageUrl ? (
            <div className="cover-frame mb-8">
              <img src={item.imageUrl} alt={item.title} />
            </div>
          ) : null}
          <div className="reading-column">
          {paragraphs.map((p) => (
            <p key={p} className="mb-4.5 text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
          </div>
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

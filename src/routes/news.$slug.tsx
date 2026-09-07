import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IconArrowRight, NewsThumb } from "@/components/icons";
import { getNewsBySlug } from "@/lib/news";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const item = await getNewsBySlug({ data: { slug: params.slug } });
    if (!item) throw notFound();
    return item;
  },
  component: NewsDetail,
  head: ({ loaderData }) => {
    const title = `${loaderData?.title ?? "News"} | Birustock Indonesia`;
    const description = loaderData?.excerpt ?? "";
    const image = "/og.jpg";
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
      links: [{ rel: "canonical", href: `/news/${loaderData?.slug ?? ""}` }],
    };
  },
});

function NewsDetail() {
  const item = Route.useLoaderData();
  return (
    <section className="py-16 max-md:py-11">
      <div className="container-site">
        <article className="mx-auto max-w-[820px] stagger">
          <Link to="/news" search={{ page: 1 }} className="link-arrow mb-6"><span className="inline-block rotate-180"><IconArrowRight size={15} /></span>Kembali ke News</Link>
          <div className="mb-5 overflow-hidden rounded-md border border-line bg-surface">
            <div className="aspect-video"><NewsThumb type={item.thumb} /></div>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3"><span className="badge">{item.category}</span><span className="text-[13px] text-subtle">Terbit {item.date}</span>{item.updatedAt.slice(0, 10) !== item.date ? <span className="text-[13px] text-subtle">Diperbarui {item.updatedAt.slice(0, 10)}</span> : null}</div>
          <h1 className="mb-4 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.08] font-extrabold tracking-tight">{item.title}</h1>
          <p className="mb-7 text-lg leading-relaxed text-muted">{item.excerpt}</p>
          <div className="reading-column">{item.body.map((p) => <p key={p} className="mb-5 text-base leading-[1.85] text-muted">{p}</p>)}</div>
        <div className="mt-8 rounded-[8px] border border-line bg-bg-alt px-4.5 py-4 text-[13.5px] leading-relaxed text-muted">Berita ini disajikan sebagai informasi pasar. Selalu cek data dan sumber terbaru sebelum mengambil keputusan finansial.</div>
        </article>
      </div>
    </section>
  );
}

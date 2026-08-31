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
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "News"} | Birustock Indonesia` },
      { name: "description", content: loaderData?.excerpt ?? "" },
    ],
  }),
});

function NewsDetail() {
  const item = Route.useLoaderData();
  return (
    <section className="py-16 max-md:py-11">
      <div className="container-site">
        <article className="mx-auto max-w-[820px] stagger">
          <Link to="/news" className="link-arrow mb-6"><span className="inline-block rotate-180"><IconArrowRight size={15} /></span>Kembali ke News</Link>
          <div className="mb-5 overflow-hidden rounded-md border border-line bg-surface">
            <div className="aspect-video"><NewsThumb type={item.thumb} /></div>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3"><span className="badge">{item.category}</span><span className="text-[13px] text-subtle">{item.date}</span></div>
          <h1 className="mb-5 text-[clamp(2rem,4vw,3.2rem)] leading-tight font-extrabold tracking-tight">{item.title}</h1>
          <p className="mb-7 text-lg leading-relaxed text-muted">{item.excerpt}</p>
          {item.body.map((p) => <p key={p} className="mb-5 text-base leading-[1.8] text-muted">{p}</p>)}
        </article>
      </div>
    </section>
  );
}

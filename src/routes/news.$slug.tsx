import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IconArrowRight, IconCalendar, IconDocument, NewsThumb } from "@/components/icons";
import { getNewsBySlug } from "@/lib/news";
import { formatIdDate } from "@/lib/format";

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
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: "/og.jpg" },
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
    <main className="analysis-detail-page py-10 max-md:py-7">
      <div className="container-site">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/news" search={{ page: 1 }}>News</Link>
          <span>/</span>
          <span aria-current="page">{item.title}</span>
        </nav>

        <section className="content-detail-hero stagger">
          <div>
            <Link to="/news" search={{ page: 1 }} className="detail-back-link">
              <span className="inline-block rotate-180"><IconArrowRight size={15} /></span>
              Kembali ke News
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="badge">{item.category}</span>
              <span className="detail-pill">Berita</span>
            </div>
            <h1>{item.title}</h1>
            <p className="analysis-detail-lead">{item.excerpt}</p>
            <div className="analysis-detail-meta">
              <span><IconCalendar size={15} />Terbit {formatIdDate(item.publishedAt)}</span>
              <span><IconDocument size={15} />Diperbarui {formatIdDate(item.updatedAt.slice(0, 10))}</span>
            </div>
          </div>
          <div className="content-detail-media">
            <NewsThumb type={item.thumb} />
          </div>
        </section>

        <div className="content-detail-layout mt-6">
          <article className="detail-panel content-detail-reading">
            <h2 className="detail-section-title">Berita Lengkap</h2>
            <div className="reading-column analysis-reading-column">
              {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="analysis-disclaimer">
              Berita ini disajikan sebagai informasi pasar. Selalu cek data dan sumber terbaru sebelum mengambil keputusan finansial.
            </div>
          </article>
          <aside className="detail-panel detail-side-card">
            <h2 className="detail-section-title">Informasi Konten</h2>
            <div className="info-row"><span>Kategori</span><strong>{item.category}</strong></div>
            <div className="info-row"><span>Tanggal Terbit</span><strong>{formatIdDate(item.publishedAt)}</strong></div>
            <div className="info-row"><span>Diperbarui</span><strong>{formatIdDate(item.updatedAt.slice(0, 10))}</strong></div>
          </aside>
        </div>
      </div>
    </main>
  );
}

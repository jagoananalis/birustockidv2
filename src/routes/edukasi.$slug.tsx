import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IconArrowRight, IconCalendar, IconDocument, IconGraduation } from "@/components/icons";
import { getEdukasiBySlug } from "@/lib/content";
import { formatIdDate, splitParagraphs } from "@/lib/format";

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
    <main className="analysis-detail-page py-10 max-md:py-7">
      <div className="container-site">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/edukasi" search={{ page: 1 }}>Edukasi</Link>
          <span>/</span>
          <span aria-current="page">{item.title}</span>
        </nav>

        <section className="content-detail-hero stagger">
          <div>
            <Link to="/edukasi" search={{ page: 1 }} className="detail-back-link">
              <span className="inline-block rotate-180"><IconArrowRight size={15} /></span>
              Kembali ke Edukasi
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="badge"><IconGraduation size={13} /> {item.level}</span>
              <span className="detail-pill">Materi Edukasi</span>
            </div>
            <h1>{item.title}</h1>
            <p className="analysis-detail-lead">{item.description}</p>
            <div className="analysis-detail-meta">
              <span><IconCalendar size={15} />Terbit {formatIdDate(item.publishedAt)}</span>
              <span><IconDocument size={15} />Diperbarui {formatIdDate(item.updatedAt.slice(0, 10))}</span>
            </div>
          </div>
          <div className="content-detail-media">
            {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : <div className="content-detail-media-empty"><IconGraduation size={42} /></div>}
          </div>
        </section>

        <div className="content-detail-layout mt-6">
          <article className="detail-panel content-detail-reading">
            <h2 className="detail-section-title">Materi Lengkap</h2>
            <div className="reading-column analysis-reading-column">
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="analysis-disclaimer">
              Materi ini bersifat edukasi umum untuk membantu memahami konsep trading, bukan rekomendasi atau sinyal untuk membuka posisi tertentu.
            </div>
          </article>
          <aside className="detail-panel detail-side-card">
            <h2 className="detail-section-title">Informasi Materi</h2>
            <div className="info-row"><span>Level</span><strong>{item.level}</strong></div>
            <div className="info-row"><span>Tanggal Terbit</span><strong>{formatIdDate(item.publishedAt)}</strong></div>
            <div className="info-row"><span>Diperbarui</span><strong>{formatIdDate(item.updatedAt.slice(0, 10))}</strong></div>
          </aside>
        </div>
      </div>
    </main>
  );
}

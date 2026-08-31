import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <section className="py-16">
      <div className="container-site py-16 text-center stagger">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 mb-3 text-4xl font-extrabold tracking-tight text-ink">
          Halaman tidak ditemukan
        </h1>
        <p className="mb-6 text-muted">Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}

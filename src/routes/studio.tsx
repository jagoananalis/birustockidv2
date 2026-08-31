import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { deleteAnalisis, deleteEdukasi, founderLogin, founderPing, listAnalisis, listEdukasi, saveAnalisis, saveEdukasi, type Accent, type AnalisisItem, type EdukasiItem, type EduLevel } from "@/lib/content";
import { deleteNews, listNews, saveNews, type NewsItem } from "@/lib/news";
import { formatIdDate } from "@/lib/format";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
  head: () => ({ meta: [{ title: "Studio Founder | Birustock Indonesia" }] }),
});

const TOKEN_KEY = "bs-founder-token";
type Tab = "dashboard" | "analisis" | "news" | "edukasi";

function StudioPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [analisis, setAnalisis] = useState<AnalisisItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [edukasi, setEdukasi] = useState<EdukasiItem[]>([]);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const [a, n, e] = await Promise.all([listAnalisis(), listNews(), listEdukasi()]);
    setAnalisis(a); setNews(n); setEdukasi(e);
  }

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) { setChecking(false); return; }
    founderPing({ data: { token: stored } }).then((res) => {
      if (res.ok) setToken(stored); else localStorage.removeItem(TOKEN_KEY);
    }).catch(() => localStorage.removeItem(TOKEN_KEY)).finally(() => setChecking(false));
  }, []);

  useEffect(() => { if (token) void refresh(); }, [token]);

  async function onLogin(e: FormEvent) {
    e.preventDefault(); setError(""); setBusy(true);
    try { const res = await founderLogin({ data: { pin } }); localStorage.setItem(TOKEN_KEY, res.token); setToken(res.token); setPin(""); }
    catch (err) { setError(err instanceof Error ? err.message : "Gagal masuk."); }
    finally { setBusy(false); }
  }

  if (checking) return <section className="py-24"><div className="container-site"><div className="skeleton h-28 w-full max-w-xl mx-auto" /></div></section>;

  if (!token) return (
    <section className="py-16"><div className="container-site"><form onSubmit={onLogin} className="enter-up mx-auto max-w-md rounded-lg border border-line bg-surface p-8">
      <p className="eyebrow">Founder Studio</p><h1 className="mt-2 mb-2 text-2xl font-extrabold tracking-tight">Kelola Birustock</h1>
      <p className="mb-6 text-sm text-muted">Satu tempat untuk menerbitkan analisis, news, dan edukasi ke website.</p>
      {error ? <p className="mb-3 text-sm text-accent-red">{error}</p> : null}
      <Field label="PIN Studio"><input id="pin" type="password" className="form-field" value={pin} onChange={(e) => setPin(e.target.value)} autoComplete="current-password" required /></Field>
      <button type="submit" className="btn btn-primary btn-block mt-4" disabled={busy}>{busy ? "Memeriksa…" : "Masuk"}</button>
      <p className="mt-4 text-center text-xs text-subtle">PIN production diambil dari konfigurasi server.</p>
    </form></div></section>
  );

  const stats = [
    ["Analisis", analisis.length, "Konten market"],
    ["News", news.length, "Berita tersimpan"],
    ["Edukasi", edukasi.length, "Materi belajar"],
  ];

  return <section className="py-12 max-md:py-8"><div className="container-site">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Founder Studio</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Content Command Center</h1><p className="mt-2 max-w-2xl text-sm text-muted">Database-backed publishing untuk menjaga konten Birustock tetap konsisten, terstruktur, dan siap berkembang.</p></div><button type="button" className="btn btn-outline" onClick={() => { localStorage.removeItem(TOKEN_KEY); setToken(null); }}>Keluar</button></div>
    <nav className="mb-7 flex gap-2 overflow-x-auto pb-1" aria-label="Studio sections">{(["dashboard", "analisis", "news", "edukasi"] as Tab[]).map((item) => <button key={item} type="button" className={`filter-chip ${tab === item ? "is-active" : ""}`} onClick={() => setTab(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}</nav>
    {tab === "dashboard" ? <Dashboard stats={stats} onSelect={setTab} /> : null}
    {tab === "analisis" ? <AnalisisStudio token={token} items={analisis} onChange={refresh} busy={busy} setBusy={setBusy} /> : null}
    {tab === "news" ? <NewsStudio token={token} items={news} onChange={refresh} busy={busy} setBusy={setBusy} /> : null}
    {tab === "edukasi" ? <EdukasiStudio token={token} items={edukasi} onChange={refresh} busy={busy} setBusy={setBusy} /> : null}
  </div></section>;
}

function Dashboard({ stats, onSelect }: { stats: (string | number)[][]; onSelect: (tab: Tab) => void }) {
  return <div className="grid gap-5 md:grid-cols-3">{stats.map(([title, count, desc], i) => <button key={title} type="button" className="rounded-md border border-line bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-primary" onClick={() => onSelect((i === 0 ? "analisis" : i === 1 ? "news" : "edukasi") as Tab)}><div className="text-sm text-subtle">{title}</div><div className="mt-2 text-4xl font-extrabold tracking-tight">{count}</div><div className="mt-2 text-sm text-muted">{desc}</div></button>)}</div>;
}

function ImageField({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return <div className="grid gap-3 md:grid-cols-[1fr_180px]"><div><Field label="URL gambar"><input className="form-field" value={value.startsWith("data:") ? "" : value} placeholder="https://… atau unggah file" onChange={(e) => onChange(e.target.value)} /></Field><input type="file" accept="image/*" className="mt-2 block w-full text-xs text-subtle" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 350_000) { alert("Maksimal 350KB."); return; } const reader = new FileReader(); reader.onload = () => onChange(String(reader.result ?? "")); reader.readAsDataURL(file); }} /></div><div className="cover-frame h-28"><>{value ? <img src={value} alt="" /> : <div className="skeleton size-full" />}</></div></div>;
}

function AnalisisStudio({ token, items, onChange, busy, setBusy }: { token: string; items: AnalisisItem[]; onChange: () => Promise<void>; busy: boolean; setBusy: (v: boolean) => void }) {
  const empty = useMemo(() => ({ id: undefined as number | undefined, pair: "XAU/USD", title: "", excerpt: "", body: "", imageUrl: "", accent: "blue" as Accent, publishedAt: new Date().toISOString().slice(0, 10), timeframe: "H4", bias: "Bullish", support: "", resistance: "", target: "", invalidation: "", scenarioBullish: "", scenarioBearish: "" }), []);
  const [form, setForm] = useState(empty); const [error, setError] = useState("");
  const fill = (item: AnalisisItem) => setForm({ ...item, scenarioBullish: item.scenarioBullish, scenarioBearish: item.scenarioBearish });
  async function submit(e: FormEvent) { e.preventDefault(); setError(""); setBusy(true); try { await saveAnalisis({ data: { token, ...form } }); setForm(empty); await onChange(); } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan."); } finally { setBusy(false); } }
  return <div className="studio-shell"><ListPane title="Analisis" items={items} onSelect={fill} render={(i) => <><div className="text-xs text-subtle">{i.pair} · {i.timeframe} · {i.bias}</div><div className="text-sm font-semibold">{i.title}</div></>} /><form onSubmit={submit} className="rounded-md border border-line bg-surface p-5"><EditorTitle title={form.id ? "Edit analisis" : "Analisis baru"} onNew={() => setForm(empty)} /><p className="mb-4 text-xs text-subtle">Struktur level di bawah akan menjadi metadata analisis, bukan sekadar teks artikel.</p>{error ? <p className="mb-3 text-sm text-accent-red">{error}</p> : null}<div className="grid gap-3 sm:grid-cols-4"><Field label="Pair"><input className="form-field" value={form.pair} onChange={(e) => setForm({ ...form, pair: e.target.value })} required /></Field><Field label="Timeframe"><select className="form-field" value={form.timeframe} onChange={(e) => setForm({ ...form, timeframe: e.target.value })}>{["M15","H1","H4","D1","W1"].map(v => <option key={v}>{v}</option>)}</select></Field><Field label="Bias"><select className="form-field" value={form.bias} onChange={(e) => setForm({ ...form, bias: e.target.value })}>{["Bullish","Bearish","Netral"].map(v => <option key={v}>{v}</option>)}</select></Field><Field label="Tanggal"><input className="form-field" type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} required /></Field></div><Field label="Judul"><input className="form-field mt-3" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field><Field label="Ringkasan"><input className="form-field mt-3" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required /></Field><div className="my-4 grid gap-3 sm:grid-cols-2"><Field label="Support"><input className="form-field" value={form.support} onChange={(e) => setForm({ ...form, support: e.target.value })} placeholder="2,380 · 2,365" /></Field><Field label="Resistance"><input className="form-field" value={form.resistance} onChange={(e) => setForm({ ...form, resistance: e.target.value })} placeholder="2,420 · 2,450" /></Field><Field label="Target"><input className="form-field" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} /></Field><Field label="Invalidation"><input className="form-field" value={form.invalidation} onChange={(e) => setForm({ ...form, invalidation: e.target.value })} /></Field></div><div className="grid gap-3 sm:grid-cols-2"><Field label="Skenario Bullish"><textarea className="form-field" rows={4} value={form.scenarioBullish} onChange={(e) => setForm({ ...form, scenarioBullish: e.target.value })} /></Field><Field label="Skenario Bearish"><textarea className="form-field" rows={4} value={form.scenarioBearish} onChange={(e) => setForm({ ...form, scenarioBearish: e.target.value })} /></Field></div><Field label="Market commentary"><textarea className="form-field mt-3" rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required /></Field><div className="my-4"><ImageField value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} /></div><Field label="Aksen"><select className="form-field mb-4" value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value as Accent })}><option value="blue">Biru</option><option value="orange">Oranye</option><option value="green">Hijau</option><option value="red">Merah</option></select></Field><Actions busy={busy} id={form.id} onDelete={async () => { if (!form.id || !confirm("Hapus analisis ini?")) return; setBusy(true); try { await deleteAnalisis({ data: { token, id: form.id } }); setForm(empty); await onChange(); } finally { setBusy(false); } }} href={form.id ? `/analisis/${items.find(i => i.id === form.id)?.slug ?? ""}` : undefined} /></form></div>;
}

function NewsStudio({ token, items, onChange, busy, setBusy }: { token: string; items: NewsItem[]; onChange: () => Promise<void>; busy: boolean; setBusy: (v: boolean) => void }) {
  const empty = useMemo(() => ({ id: undefined as number | undefined, category: "Ekonomi Global", title: "", excerpt: "", body: "", thumb: "capitol" as const, publishedAt: new Date().toISOString().slice(0, 10) }), []); const [form, setForm] = useState(empty); const [error, setError] = useState("");
  async function submit(e: FormEvent) { e.preventDefault(); setError(""); setBusy(true); try { await saveNews({ data: { token, ...form } }); setForm(empty); await onChange(); } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan."); } finally { setBusy(false); } }
  return <div className="studio-shell"><ListPane title="News" items={items} onSelect={(i) => setForm({ id: i.id, category: i.category, title: i.title, excerpt: i.excerpt, body: i.body.join("\n\n"), thumb: i.thumb, publishedAt: i.publishedAt })} render={(i) => <><div className="text-xs text-subtle">{i.category} · {formatIdDate(i.publishedAt)}</div><div className="text-sm font-semibold">{i.title}</div></>} /><form onSubmit={submit} className="rounded-md border border-line bg-surface p-5"><EditorTitle title={form.id ? "Edit news" : "News baru"} onNew={() => setForm(empty)} />{error ? <p className="mb-3 text-sm text-accent-red">{error}</p> : null}<div className="grid gap-3 sm:grid-cols-3"><Field label="Kategori"><input className="form-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></Field><Field label="Visual"><select className="form-field" value={form.thumb} onChange={(e) => setForm({ ...form, thumb: e.target.value as NewsItem["thumb"] })}><option value="capitol">Ekonomi</option><option value="gold">Emas</option><option value="bitcoin">Bitcoin</option></select></Field><Field label="Tanggal"><input className="form-field" type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} required /></Field></div><Field label="Judul"><input className="form-field mt-3" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field><Field label="Ringkasan"><input className="form-field mt-3" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required /></Field><Field label="Isi berita"><textarea className="form-field mt-3" rows={12} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required /></Field><Actions busy={busy} id={form.id} onDelete={async () => { if (!form.id || !confirm("Hapus news ini?")) return; setBusy(true); try { await deleteNews({ data: { token, id: form.id } }); setForm(empty); await onChange(); } finally { setBusy(false); } }} href={form.id ? `/news/${items.find(i => i.id === form.id)?.slug ?? ""}` : undefined} /></form></div>;
}

function EdukasiStudio({ token, items, onChange, busy, setBusy }: { token: string; items: EdukasiItem[]; onChange: () => Promise<void>; busy: boolean; setBusy: (v: boolean) => void }) {
  const empty = useMemo(() => ({ id: undefined as number | undefined, level: "Pemula" as EduLevel, title: "", description: "", body: "", imageUrl: "" }), []); const [form, setForm] = useState(empty); const [error, setError] = useState("");
  async function submit(e: FormEvent) { e.preventDefault(); setError(""); setBusy(true); try { await saveEdukasi({ data: { token, ...form } }); setForm(empty); await onChange(); } catch (err) { setError(err instanceof Error ? err.message : "Gagal menyimpan."); } finally { setBusy(false); } }
  return <div className="studio-shell"><ListPane title="Edukasi" items={items} onSelect={(i) => setForm(i)} render={(i) => <><div className="text-xs text-subtle">{i.level}</div><div className="text-sm font-semibold">{i.title}</div></>} /><form onSubmit={submit} className="rounded-md border border-line bg-surface p-5"><EditorTitle title={form.id ? "Edit materi" : "Materi baru"} onNew={() => setForm(empty)} />{error ? <p className="mb-3 text-sm text-accent-red">{error}</p> : null}<Field label="Level"><select className="form-field" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as EduLevel })}><option>Pemula</option><option>Menengah</option><option>Lanjutan</option></select></Field><Field label="Judul"><input className="form-field mt-3" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field><Field label="Ringkasan"><input className="form-field mt-3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></Field><Field label="Isi materi"><textarea className="form-field mt-3" rows={12} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required /></Field><div className="my-4"><ImageField value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} /></div><Actions busy={busy} id={form.id} onDelete={async () => { if (!form.id || !confirm("Hapus materi ini?")) return; setBusy(true); try { await deleteEdukasi({ data: { token, id: form.id } }); setForm(empty); await onChange(); } finally { setBusy(false); } }} /></form></div>;
}

function ListPane<T extends { id: number }>({ title, items, onSelect, render }: { title: string; items: T[]; onSelect: (item: T) => void; render: (item: T) => ReactNode }) { return <aside className="rounded-md border border-line bg-surface p-4"><h2 className="mb-3 text-sm font-bold tracking-wide text-subtle uppercase">{title}</h2><div className="flex max-h-[620px] flex-col gap-2 overflow-auto">{items.map(i => <button key={i.id} type="button" className="rounded-sm border border-line px-3 py-2.5 text-left hover:border-primary" onClick={() => onSelect(i)}>{render(i)}</button>)}</div></aside>; }
function EditorTitle({ title, onNew }: { title: string; onNew: () => void }) { return <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-extrabold">{title}</h2><button type="button" className="btn btn-ghost" onClick={onNew}>Buat baru</button></div>; }
function Actions({ busy, id, onDelete, href }: { busy: boolean; id?: number; onDelete: () => Promise<void>; href?: string }) { return <div className="flex flex-wrap gap-2"><button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Menyimpan…" : "Simpan"}</button>{id ? <button type="button" className="btn btn-danger" disabled={busy} onClick={() => void onDelete()}>Hapus</button> : null}{href ? <Link to={href as any} className="btn btn-outline">Lihat publik</Link> : null}</div>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block"><span className="mb-1.5 block text-sm font-semibold">{label}</span>{children}</label>; }

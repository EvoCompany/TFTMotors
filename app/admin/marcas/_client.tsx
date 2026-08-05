"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Check, X, Award, ImageIcon, Search, Loader2 } from "lucide-react";
import Image from "next/image";

interface Marca { id: string; nome: string; slug: string; imagem_url: string | null; pais: string | null; ativo: boolean }
interface FormState { nome: string; slug: string; imagem_url: string; pais: string; ativo: boolean }

const emptyForm = (): FormState => ({ nome: "", slug: "", imagem_url: "", pais: "", ativo: true });

function toSlug(nome: string) {
  return nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30";

interface PexelsPhoto { id: number; url: string; thumb: string; alt: string }

function PexelsPicker({ onSelect, onClose }: { onSelect: (url: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/pexels?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setPhotos(data.photos ?? []);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="font-semibold text-white flex items-center gap-2"><ImageIcon className="h-4 w-4 text-yellow-400" /> Buscar foto no Pexels</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Ex: Toyota emblem, Volkswagen logo..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30" />
            <button onClick={search} disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-60 transition-colors">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Buscar
            </button>
          </div>
          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
              {photos.map((p) => (
                <button key={p.id} onClick={() => { onSelect(p.url); onClose(); }}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-transparent hover:border-yellow-400 transition-all group">
                  <Image src={p.thumb} alt={p.alt} fill className="object-cover" sizes="160px" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/30 text-sm py-8">{loading ? "Buscando..." : "Digite um termo e pressione Buscar"}</p>
          )}
        </div>
        <p className="border-t border-white/10 px-4 py-2 text-[10px] text-white/20">Fotos fornecidas pelo Pexels</p>
      </div>
    </div>
  );
}

export function MarcasClient({ marcas: initial }: { marcas: Marca[] }) {
  const router = useRouter();
  const [marcas, setMarcas] = useState(initial);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPexels, setShowPexels] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => { setEditingId(null); setForm(emptyForm()); setSlugManual(false); setError(""); setShowForm(true); };
  const openEdit = (m: Marca) => {
    setEditingId(m.id);
    setForm({ nome: m.nome, slug: m.slug, imagem_url: m.imagem_url ?? "", pais: m.pais ?? "", ativo: m.ativo });
    setSlugManual(true); setError(""); setShowForm(true);
  };
  const cancel = () => { setShowForm(false); setEditingId(null); setError(""); };

  const handleSave = async () => {
    if (!form.nome.trim()) { setError("Nome é obrigatório."); return; }
    if (!form.slug.trim()) { setError("Slug é obrigatório."); return; }
    setSaving(true); setError("");
    const supabase = createClient();
    const payload = { nome: form.nome.trim(), slug: form.slug.trim(), imagem_url: form.imagem_url.trim() || null, pais: form.pais.trim() || null, ativo: form.ativo };
    if (editingId) {
      const { error: err } = await supabase.from("marcas").update(payload).eq("id", editingId);
      if (err) { setError(err.message); setSaving(false); return; }
      setMarcas((prev) => prev.map((m) => m.id === editingId ? { ...m, ...payload } : m));
    } else {
      const { data, error: err } = await supabase.from("marcas").insert(payload).select().single();
      if (err) { setError(err.message); setSaving(false); return; }
      if (data) setMarcas((prev) => [...prev, data].sort((a, b) => a.nome.localeCompare(b.nome)));
    }
    router.refresh(); cancel(); setSaving(false);
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Excluir marca "${nome}"?`)) return;
    setDeletingId(id);
    await createClient().from("marcas").delete().eq("id", id);
    setMarcas((prev) => prev.filter((m) => m.id !== id));
    router.refresh(); setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      {showPexels && <PexelsPicker onSelect={(url) => set("imagem_url", url)} onClose={() => setShowPexels(false)} />}

      <div className="flex justify-end">
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-4 py-2.5 text-sm font-semibold hover:bg-yellow-300 transition-colors">
          <Plus className="h-4 w-4" /> Nova Marca
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-yellow-400/20 bg-[#161616] p-6 space-y-4">
          <h3 className="font-semibold text-white">{editingId ? "Editar Marca" : "Nova Marca"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Nome *</label>
              <input type="text" value={form.nome} onChange={(e) => { set("nome", e.target.value); if (!slugManual) set("slug", toSlug(e.target.value)); }} className={inputCls} placeholder="Ex: Toyota" />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Slug *</label>
              <input type="text" value={form.slug} onChange={(e) => { setSlugManual(true); set("slug", e.target.value); }} className={inputCls} placeholder="toyota" />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">País</label>
              <input type="text" value={form.pais} onChange={(e) => set("pais", e.target.value)} className={inputCls} placeholder="Ex: Japão" />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Imagem</label>
              <div className="flex gap-2">
                <input type="url" value={form.imagem_url} onChange={(e) => set("imagem_url", e.target.value)} className={inputCls} placeholder="https://..." />
                <button type="button" onClick={() => setShowPexels(true)}
                  className="flex-shrink-0 flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors">
                  <ImageIcon className="h-3.5 w-3.5" /> Pexels
                </button>
              </div>
              {form.imagem_url && (
                <div className="mt-2 relative aspect-video w-32 overflow-hidden rounded-lg border border-white/10">
                  <img src={form.imagem_url} alt="preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.ativo} onChange={(e) => set("ativo", e.target.checked)} className="h-4 w-4 rounded accent-yellow-400" />
            <span className="text-sm text-white">Marca ativa</span>
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-5 py-2 text-sm font-semibold disabled:opacity-60">
              <Check className="h-4 w-4" />{saving ? "Salvando..." : "Salvar"}
            </button>
            <button onClick={cancel} className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2 text-sm text-white/60 hover:bg-white/5">
              <X className="h-4 w-4" /> Cancelar
            </button>
          </div>
        </div>
      )}

      {marcas.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#161616] p-16 text-center">
          <Award className="h-10 w-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">Nenhuma marca cadastrada ainda.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">Marca</th>
                <th className="text-left px-5 py-3 hidden sm:table-cell">País</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Slug</th>
                <th className="text-center px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {marcas.map((m) => (
                <tr key={m.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-16 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                        {m.imagem_url
                          ? <img src={m.imagem_url} alt={m.nome} className="h-full w-full object-cover" />
                          : <div className="h-full w-full flex items-center justify-center"><span className="text-yellow-400 font-bold text-xs">{m.nome.slice(0, 2).toUpperCase()}</span></div>}
                      </div>
                      <span className="font-medium text-white">{m.nome}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/50 hidden sm:table-cell">{m.pais ?? "—"}</td>
                  <td className="px-5 py-3.5 text-white/30 font-mono text-xs hidden md:table-cell">{m.slug}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${m.ativo ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                      {m.ativo ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(m)} className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-white/60 hover:bg-white/5 transition-colors">
                        <Pencil className="h-3 w-3" /> Editar
                      </button>
                      <button onClick={() => handleDelete(m.id, m.nome)} disabled={deletingId === m.id}
                        className="flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50">
                        <Trash2 className="h-3 w-3" />{deletingId === m.id ? "..." : "Excluir"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Check, X, Award } from "lucide-react";

interface Marca { id: string; nome: string; slug: string; logo_url: string | null; pais: string | null; ativo: boolean }
interface FormState { nome: string; slug: string; logo_url: string; pais: string; ativo: boolean }

const emptyForm = (): FormState => ({ nome: "", slug: "", logo_url: "", pais: "", ativo: true });

function toSlug(nome: string) {
  return nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30";

export function MarcasClient({ marcas: initial }: { marcas: Marca[] }) {
  const router = useRouter();
  const [marcas, setMarcas] = useState(initial);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => { setEditingId(null); setForm(emptyForm()); setSlugManual(false); setError(""); setShowForm(true); };
  const openEdit = (m: Marca) => {
    setEditingId(m.id);
    setForm({ nome: m.nome, slug: m.slug, logo_url: m.logo_url ?? "", pais: m.pais ?? "", ativo: m.ativo });
    setSlugManual(true); setError(""); setShowForm(true);
  };
  const cancel = () => { setShowForm(false); setEditingId(null); setError(""); };

  const handleSave = async () => {
    if (!form.nome.trim()) { setError("Nome é obrigatório."); return; }
    if (!form.slug.trim()) { setError("Slug é obrigatório."); return; }
    setSaving(true); setError("");
    const supabase = createClient();
    const payload = { nome: form.nome.trim(), slug: form.slug.trim(), logo_url: form.logo_url.trim() || null, pais: form.pais.trim() || null, ativo: form.ativo };
    if (editingId) {
      const { error: err } = await supabase.from("marcas").update(payload).eq("id", editingId);
      if (err) { setError(err.message); setSaving(false); return; }
      setMarcas((prev) => prev.map((m) => m.id === editingId ? { ...m, ...payload, id: editingId } : m));
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
              <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">URL do Logo</label>
              <input type="url" value={form.logo_url} onChange={(e) => set("logo_url", e.target.value)} className={inputCls} placeholder="https://..." />
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
                      <div className="h-8 w-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                        {m.logo_url
                          ? <img src={m.logo_url} alt={m.nome} className="h-full w-full object-contain rounded-lg p-1" />
                          : <span className="text-yellow-400 font-bold text-xs">{m.nome.slice(0, 2).toUpperCase()}</span>}
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

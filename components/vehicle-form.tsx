"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Car, Check, ChevronDown } from "lucide-react";

interface Marca { id: string; nome: string; slug: string }

interface VehicleFormProps {
  mode: "create" | "edit";
  marcas: Marca[];
  featuredCount: number;
  initial?: {
    id: string;
    nome: string; slug: string; marca_id: string; tipo: string; modelo: string;
    ano: number; preco: number; km: number; combustivel: string; cambio: string;
    cor: string; descricao: string; imagem_url: string; destaque: boolean; disponivel: boolean;
  };
}

const TIPOS = ["Hatch", "Sedan", "SUV", "Picape", "Minivan", "Conversível"];
const COMBUSTIVEIS = ["Flex", "Gasolina", "Diesel", "Elétrico", "Híbrido"];
const CAMBIOS = ["Manual", "Automático", "CVT"];
const ANOS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);

function toSlug(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function VehicleForm({ mode, marcas, featuredCount, initial }: VehicleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugManual, setSlugManual] = useState(mode === "edit");

  const [form, setForm] = useState({
    nome: initial?.nome ?? "",
    slug: initial?.slug ?? "",
    marca_id: initial?.marca_id ?? "",
    tipo: initial?.tipo ?? "Hatch",
    modelo: initial?.modelo ?? "",
    ano: initial?.ano ?? new Date().getFullYear(),
    preco: initial?.preco ?? 0,
    km: initial?.km ?? 0,
    combustivel: initial?.combustivel ?? "Flex",
    cambio: initial?.cambio ?? "Manual",
    cor: initial?.cor ?? "",
    descricao: initial?.descricao ?? "",
    imagem_url: initial?.imagem_url ?? "",
    destaque: initial?.destaque ?? false,
    disponivel: initial?.disponivel ?? true,
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleNomeChange = (nome: string) => {
    set("nome", nome);
    if (!slugManual) set("slug", toSlug(nome));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim()) { setError("Nome é obrigatório."); return; }
    if (!form.slug.trim()) { setError("Slug é obrigatório."); return; }
    if (!form.marca_id)    { setError("Selecione uma marca."); return; }
    if (!form.modelo.trim()) { setError("Modelo é obrigatório."); return; }
    if (form.destaque && !initial?.destaque && featuredCount >= 10) {
      setError("Limite de 10 veículos em destaque atingido."); return;
    }

    setSaving(true);
    setError("");
    const supabase = createClient();

    const payload = {
      nome: form.nome.trim(),
      slug: form.slug.trim(),
      marca_id: form.marca_id,
      tipo: form.tipo,
      modelo: form.modelo.trim(),
      ano: form.ano,
      preco: form.preco,
      km: form.km,
      combustivel: form.combustivel,
      cambio: form.cambio,
      cor: form.cor.trim() || null,
      descricao: form.descricao.trim() || null,
      imagem_url: form.imagem_url.trim() || null,
      destaque: form.destaque,
      disponivel: form.disponivel,
    };

    if (mode === "edit" && initial) {
      const { error: err } = await supabase.from("veiculos").update(payload).eq("id", initial.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("veiculos").insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }

    router.push("/admin/veiculos");
    router.refresh();
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/40";
  const selectCls = inputCls + " appearance-none cursor-pointer";
  const labelCls = "text-xs font-medium text-white/50 uppercase tracking-wider block mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Informações Básicas */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2"><Car className="h-4 w-4 text-yellow-400" /> Informações Básicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelCls}>Nome do Veículo *</label>
            <input type="text" value={form.nome} onChange={(e) => handleNomeChange(e.target.value)} placeholder="Ex: Toyota Corolla 2.0 XEI 2023" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Slug (URL) *</label>
            <input type="text" value={form.slug} onChange={(e) => { setSlugManual(true); set("slug", e.target.value); }} placeholder="toyota-corolla-2023" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Modelo *</label>
            <input type="text" value={form.modelo} onChange={(e) => set("modelo", e.target.value)} placeholder="Ex: Corolla" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Marca *</label>
            <div className="relative">
              <select value={form.marca_id} onChange={(e) => set("marca_id", e.target.value)} required className={selectCls}>
                <option value="">— Selecionar —</option>
                {marcas.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Tipo *</label>
            <div className="relative">
              <select value={form.tipo} onChange={(e) => set("tipo", e.target.value)} className={selectCls}>
                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Ano *</label>
            <div className="relative">
              <select value={form.ano} onChange={(e) => set("ano", parseInt(e.target.value))} className={selectCls}>
                {ANOS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Cor</label>
            <input type="text" value={form.cor} onChange={(e) => set("cor", e.target.value)} placeholder="Ex: Prata" className={inputCls} />
          </div>
        </div>
      </div>

      {/* Detalhes Técnicos */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
        <h2 className="font-semibold text-white">Detalhes Técnicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Quilometragem *</label>
            <input type="number" min="0" value={form.km} onChange={(e) => set("km", parseInt(e.target.value) || 0)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Combustível *</label>
            <div className="relative">
              <select value={form.combustivel} onChange={(e) => set("combustivel", e.target.value)} className={selectCls}>
                {COMBUSTIVEIS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Câmbio</label>
            <div className="relative">
              <select value={form.cambio} onChange={(e) => set("cambio", e.target.value)} className={selectCls}>
                {CAMBIOS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Preço e Mídia */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
        <h2 className="font-semibold text-white">Preço e Mídia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Preço (R$) *</label>
            <input type="number" min="0" step="100" value={form.preco} onChange={(e) => set("preco", parseFloat(e.target.value) || 0)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>URL da Imagem Principal</label>
            <input type="url" value={form.imagem_url} onChange={(e) => set("imagem_url", e.target.value)} placeholder="https://..." className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Descrição</label>
            <textarea value={form.descricao} onChange={(e) => set("descricao", e.target.value)} rows={3} placeholder="Descrição do veículo..." className={inputCls + " resize-none"} />
          </div>
        </div>
      </div>

      {/* Configurações */}
      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-3">
        <h2 className="font-semibold text-white mb-3">Configurações</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.destaque} onChange={(e) => set("destaque", e.target.checked)}
            disabled={!form.destaque && featuredCount >= 10}
            className="h-4 w-4 rounded accent-yellow-400" />
          <div>
            <span className="text-sm font-medium text-white">Em Destaque</span>
            <p className="text-xs text-white/30">{featuredCount}/10 destaques ativos</p>
          </div>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.disponivel} onChange={(e) => set("disponivel", e.target.checked)} className="h-4 w-4 rounded accent-yellow-400" />
          <span className="text-sm font-medium text-white">Disponível para venda</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-6 py-2.5 text-sm font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-60">
          <Check className="h-4 w-4" />
          {saving ? "Salvando..." : mode === "edit" ? "Salvar Alterações" : "Cadastrar Veículo"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}

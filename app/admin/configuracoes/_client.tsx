"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, MessageCircle, Store, Instagram, MapPin } from "lucide-react";

interface Props { whatsappNumero: string; nomeLoja: string; instagram: string; endereco: string }

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30";

export function ConfiguracoesClient({ whatsappNumero, nomeLoja, instagram, endereco }: Props) {
  const [whatsapp, setWhatsapp] = useState(whatsappNumero);
  const [nome, setNome] = useState(nomeLoja);
  const [ig, setIg] = useState(instagram);
  const [end, setEnd] = useState(endereco);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true); setSaved(false); setError("");
    try {
      const supabase = createClient();
      await Promise.all([
        supabase.from("configuracoes").upsert({ chave: "whatsapp_numero", valor: whatsapp.trim() }, { onConflict: "chave" }),
        supabase.from("configuracoes").upsert({ chave: "nome_loja",       valor: nome.trim()     }, { onConflict: "chave" }),
        supabase.from("configuracoes").upsert({ chave: "instagram",       valor: ig.trim()       }, { onConflict: "chave" }),
        supabase.from("configuracoes").upsert({ chave: "endereco",        valor: end.trim()      }, { onConflict: "chave" }),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2"><Store className="h-4 w-4 text-yellow-400" /> Loja</h2>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Nome da Loja</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className={inputCls} placeholder="TFT Motors" />
        </div>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5 flex items-center gap-1"><MapPin className="h-3 w-3" /> Endereço</label>
          <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} className={inputCls} placeholder="Rua Exemplo, 123 — Cidade/RS" />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2"><MessageCircle className="h-4 w-4 text-green-400" /> WhatsApp</h2>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Número (somente dígitos)</label>
          <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputCls} placeholder="5555991876326" />
          <p className="text-xs text-white/20 mt-1">Formato: código país + DDD + número. Ex: 5555991876326</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
        <h2 className="font-semibold text-white flex items-center gap-2"><Instagram className="h-4 w-4 text-pink-400" /> Instagram</h2>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">URL do Instagram</label>
          <input type="url" value={ig} onChange={(e) => setIg(e.target.value)} className={inputCls} placeholder="https://www.instagram.com/tftmotors_oficial/" />
        </div>
      </div>

      {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-6 py-2.5 text-sm font-semibold hover:bg-yellow-300 disabled:opacity-60 transition-colors">
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
        {saved && <span className="flex items-center gap-1.5 text-sm text-green-400 font-medium"><Check className="h-4 w-4" /> Salvo!</span>}
      </div>
    </div>
  );
}

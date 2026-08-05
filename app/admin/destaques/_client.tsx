"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Star, StarOff, Car } from "lucide-react";

interface Veiculo { id: string; nome: string; preco: number; imagem_url: string | null; tipo: string; ano: number; marcas: { nome: string } | null; destaque: boolean }

const MAX = 10;

export function DestaquesClient({ veiculos }: { veiculos: Veiculo[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const featured = veiculos.filter((v) => v.destaque);
  const others = veiculos.filter((v) => !v.destaque);
  const atLimit = featured.length >= MAX;

  const toggle = async (id: string, current: boolean) => {
    if (!current && atLimit) return;
    setLoading(id);
    await createClient().from("veiculos").update({ destaque: !current }).eq("id", id);
    router.refresh();
    setLoading(null);
  };

  const Row = ({ v, isFeatured }: { v: Veiculo; isFeatured: boolean }) => (
    <tr className={`transition-colors ${!isFeatured && atLimit ? "opacity-40" : "hover:bg-white/5"}`}>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
            {v.imagem_url ? <img src={v.imagem_url} alt={v.nome} className="h-full w-full object-cover" /> : <Car className="h-5 w-5 text-white/20 m-2.5" />}
          </div>
          <div>
            <p className="font-medium text-white line-clamp-1">{v.nome}</p>
            <p className="text-xs text-white/30">{(v.marcas as { nome: string } | null)?.nome} · {v.tipo} · {v.ano}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 text-right font-bold text-yellow-400 hidden sm:table-cell">
        R$ {Number(v.preco).toLocaleString("pt-BR")}
      </td>
      <td className="px-5 py-3.5 text-right">
        {isFeatured ? (
          <button onClick={() => toggle(v.id, true)} disabled={loading === v.id}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50 ml-auto">
            <StarOff className="h-3.5 w-3.5" />{loading === v.id ? "..." : "Remover"}
          </button>
        ) : (
          <button onClick={() => toggle(v.id, false)} disabled={loading === v.id || atLimit}
            title={atLimit ? "Limite de 10 atingido" : undefined}
            className="flex items-center gap-1.5 rounded-lg border border-yellow-400/30 px-3 py-1.5 text-xs text-yellow-400 hover:bg-yellow-400/10 disabled:opacity-40 disabled:cursor-not-allowed ml-auto">
            <Star className="h-3.5 w-3.5" />{loading === v.id ? "..." : "Destacar"}
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-semibold text-white">Em Destaque</h2>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${atLimit ? "bg-red-500/10 text-red-400" : "bg-yellow-400/10 text-yellow-400"}`}>
            {featured.length}/{MAX}
          </span>
          {atLimit && <span className="text-xs text-red-400">Limite atingido</span>}
        </div>
        {featured.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#161616] p-10 text-center">
            <Star className="h-8 w-8 text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">Nenhum veículo em destaque ainda.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
            <table className="w-full text-sm"><tbody className="divide-y divide-white/5">{featured.map((v) => <Row key={v.id} v={v} isFeatured />)}</tbody></table>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-semibold text-white">Outros Veículos</h2>
          {!atLimit && <span className="text-xs text-white/30">{MAX - featured.length} vaga(s) disponível(is)</span>}
        </div>
        {others.length === 0 ? (
          <p className="text-white/40 text-sm">Todos os veículos estão em destaque.</p>
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
            <table className="w-full text-sm"><tbody className="divide-y divide-white/5">{others.map((v) => <Row key={v.id} v={v} isFeatured={false} />)}</tbody></table>
          </div>
        )}
      </section>
    </div>
  );
}

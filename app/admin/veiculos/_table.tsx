"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Car, Pencil, Trash2, Search, X, Star } from "lucide-react";

interface Veiculo {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string | null;
  tipo: string;
  ano: number;
  km: number;
  combustivel: string;
  destaque: boolean;
  disponivel: boolean;
  ativo: boolean;
  marcas: { nome: string } | null;
}

export function VeiculosTable({ veiculos }: { veiculos: Veiculo[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = query.trim()
    ? veiculos.filter((v) =>
        v.nome.toLowerCase().includes(query.toLowerCase()) ||
        (v.marcas?.nome ?? "").toLowerCase().includes(query.toLowerCase()) ||
        v.tipo.toLowerCase().includes(query.toLowerCase())
      )
    : veiculos;

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Excluir "${nome}"? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("veiculos").delete().eq("id", id);
    router.refresh();
    setDeletingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, marca ou tipo..."
          className="w-full rounded-xl border border-white/10 bg-[#161616] pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && <p className="text-sm text-white/40"><span className="font-semibold text-white">{filtered.length}</span> resultado(s) para &quot;{query}&quot;</p>}

      <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3">Veículo</th>
              <th className="text-left px-5 py-3 hidden md:table-cell">Marca</th>
              <th className="text-left px-5 py-3 hidden lg:table-cell">Tipo/Ano</th>
              <th className="text-left px-5 py-3 hidden xl:table-cell">KM</th>
              <th className="text-right px-5 py-3">Preço</th>
              <th className="text-center px-5 py-3 hidden sm:table-cell">Status</th>
              <th className="text-right px-5 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((v) => (
              <tr key={v.id} className="hover:bg-white/5 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                      {v.imagem_url
                        ? <img src={v.imagem_url} alt={v.nome} className="h-full w-full object-cover" />
                        : <Car className="h-5 w-5 text-white/20 m-2.5" />}
                    </div>
                    <span className="font-medium text-white line-clamp-1">{v.nome}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-white/50 hidden md:table-cell">{v.marcas?.nome ?? "—"}</td>
                <td className="px-5 py-3.5 text-white/50 hidden lg:table-cell">{v.tipo} · {v.ano}</td>
                <td className="px-5 py-3.5 text-white/50 hidden xl:table-cell">{v.km.toLocaleString("pt-BR")} km</td>
                <td className="px-5 py-3.5 text-right font-bold text-yellow-400">
                  R$ {Number(v.preco).toLocaleString("pt-BR")}
                </td>
                <td className="px-5 py-3.5 text-center hidden sm:table-cell">
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {v.destaque && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/15 text-yellow-400 px-2 py-0.5 text-[10px] font-semibold">
                        <Star className="h-2.5 w-2.5" /> Destaque
                      </span>
                    )}
                    {!v.disponivel && (
                      <span className="rounded-full bg-red-500/10 text-red-400 px-2 py-0.5 text-[10px] font-semibold">Indisponível</span>
                    )}
                    {v.disponivel && !v.destaque && (
                      <span className="text-white/20 text-xs">—</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/veiculos/${v.id}/editar`}
                      className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Pencil className="h-3 w-3" /> Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(v.id, v.nome)}
                      disabled={deletingId === v.id}
                      className="flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      {deletingId === v.id ? "..." : "Excluir"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { AdminSidebar } from "@/components/admin-sidebar";
import { VEICULOS, MARCAS } from "@/lib/vehicles-data";
import Link from "next/link";
import { Car, Star, Search } from "lucide-react";

export default function AdminVeiculosPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
              <Car className="h-6 w-6 text-yellow-400" />
              Veículos
            </h1>
            <p className="text-white/40 text-sm mt-1">{VEICULOS.length} veículos no estoque</p>
          </div>
          <div className="flex items-center gap-3">
            {MARCAS.map((m) => {
              const count = VEICULOS.filter((v) => v.marcaSlug === m.slug).length;
              return (
                <span key={m.slug} className="hidden lg:inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-white/50">
                  {m.nome} <span className="text-yellow-400 font-bold">{count}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">Veículo</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Marca</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Tipo</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Ano</th>
                <th className="text-left px-5 py-3 hidden xl:table-cell">KM</th>
                <th className="text-right px-5 py-3">Preço</th>
                <th className="text-center px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {VEICULOS.map((v) => (
                <tr key={v.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.imagemUrl} alt={v.nome} className="h-10 w-14 object-cover rounded-lg flex-shrink-0 border border-white/10" />
                      <div>
                        <p className="font-medium text-white truncate max-w-[180px]">{v.nome}</p>
                        <p className="text-xs text-white/30">{v.combustivel} · {v.cambio}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/50 hidden md:table-cell">{v.marca}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-white/60">{v.tipo}</span>
                  </td>
                  <td className="px-5 py-3.5 text-white/50 hidden lg:table-cell">{v.ano}</td>
                  <td className="px-5 py-3.5 text-white/50 hidden xl:table-cell">{v.km.toLocaleString("pt-BR")} km</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="font-bold text-yellow-400">
                      R$ {v.preco.toLocaleString("pt-BR")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {v.destaque ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/15 text-yellow-400 px-2.5 py-1 text-[11px] font-semibold">
                        <Star className="h-3 w-3" /> Destaque
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-white/5 text-white/30 px-2.5 py-1 text-[11px]">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-white/10 text-xs text-white/30 flex items-center justify-between">
            <span>{VEICULOS.length} veículos · {VEICULOS.filter((v) => v.destaque).length} em destaque</span>
            <Link href="/" className="text-yellow-400/60 hover:text-yellow-400 transition-colors">
              Ver site →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

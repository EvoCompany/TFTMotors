import { AdminSidebar } from "@/components/admin-sidebar";
import { VEICULOS } from "@/lib/vehicles-data";
import { Star } from "lucide-react";

export default function AdminDestaquesPage() {
  const destaques = VEICULOS.filter((v) => v.destaque);
  const outros = VEICULOS.filter((v) => !v.destaque);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" />
            Destaques
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Veículos em destaque na página inicial. ({destaques.length} ativos)
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">Veículo</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Marca</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Tipo</th>
                <th className="text-right px-5 py-3">Preço</th>
                <th className="text-center px-5 py-3">Destaque</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[...destaques, ...outros].map((v) => (
                <tr key={v.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.imagemUrl} alt={v.nome} className="h-10 w-14 object-cover rounded-lg flex-shrink-0" />
                      <span className="font-medium text-white truncate max-w-[200px]">{v.nome}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/50 hidden md:table-cell">{v.marca}</td>
                  <td className="px-5 py-3.5 text-white/50 hidden md:table-cell">{v.tipo}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-yellow-400">
                    R$ {v.preco.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {v.destaque ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/15 text-yellow-400 px-2.5 py-1 text-xs font-semibold">
                        <Star className="h-3 w-3" /> Sim
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-white/5 text-white/30 px-2.5 py-1 text-xs">
                        Não
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

import { AdminSidebar } from "@/components/admin-sidebar";
import { MARCAS, VEICULOS } from "@/lib/vehicles-data";
import { Award } from "lucide-react";

export default function AdminMarcasPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-400" />
            Marcas
          </h1>
          <p className="text-white/40 text-sm mt-1">Marcas cadastradas no estoque.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">Marca</th>
                <th className="text-left px-5 py-3">País</th>
                <th className="text-center px-5 py-3">Veículos</th>
                <th className="text-left px-5 py-3">Slug</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MARCAS.map((m) => {
                const qtd = VEICULOS.filter((v) => v.marcaSlug === m.slug).length;
                return (
                  <tr key={m.slug} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                          <span className="text-yellow-400 font-bold text-xs">{m.nome.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="font-medium text-white">{m.nome}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-white/50">{m.pais}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center h-6 min-w-[24px] rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2">
                        {qtd}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-white/30 font-mono text-xs">{m.slug}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

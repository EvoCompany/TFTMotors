import { AdminSidebar } from "@/components/admin-sidebar";
import { TIPOS, VEICULOS } from "@/lib/vehicles-data";
import { Tag } from "lucide-react";

export default function AdminCategoriasPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Tag className="h-6 w-6 text-yellow-400" />
            Categorias
          </h1>
          <p className="text-white/40 text-sm mt-1">Tipos de carroceria no estoque.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIPOS.map((t) => {
            const qtd = VEICULOS.filter((v) => v.tipo === t.nome).length;
            const pct = Math.round((qtd / VEICULOS.length) * 100);
            return (
              <div key={t.slug} className="rounded-xl border border-white/10 bg-[#161616] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white">{t.nome}</span>
                  <span className="text-2xl font-bold text-yellow-400">{qtd}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 mb-2">
                  <div className="h-1.5 rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span className="font-mono">{t.slug}</span>
                  <span>{pct}% do estoque</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

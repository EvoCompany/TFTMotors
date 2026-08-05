import { AdminSidebar } from "@/components/admin-sidebar";
import { Settings } from "lucide-react";

export default function AdminConfiguracoesPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Settings className="h-6 w-6 text-yellow-400" />
            Configurações
          </h1>
          <p className="text-white/40 text-sm mt-1">Informações da loja.</p>
        </div>

        <div className="max-w-2xl space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#161616] p-6 space-y-4">
            <h2 className="font-semibold text-white text-base">Dados da Loja</h2>
            {[
              { label: "Nome", value: "TFT Motors" },
              { label: "Endereço", value: "Rua Silveira Martins, 1258 — Centro, Santiago/RS" },
              { label: "WhatsApp", value: "(55) 9 9187-6326" },
              { label: "Instagram", value: "@tftmotors_oficial" },
              { label: "Horário", value: "Seg–Sex 08:00–18:00 | Sáb 08:00–13:00" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wider">{label}</label>
                <div className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
            <p className="text-yellow-400/80 text-sm">
              Para alterar as informações da loja, edite o arquivo{" "}
              <code className="bg-yellow-400/10 px-1 rounded font-mono text-xs">lib/vehicles-data.ts</code>{" "}
              e os componentes de contato.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

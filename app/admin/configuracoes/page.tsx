import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Settings } from "lucide-react";
import { ConfiguracoesClient } from "./_client";

export default async function AdminConfiguracoesPage() {
  const supabase = await createClient();
  const { data: configs } = await supabase.from("configuracoes").select("chave, valor");

  const map: Record<string, string> = {};
  for (const c of configs ?? []) map[c.chave] = c.valor ?? "";

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Settings className="h-6 w-6 text-yellow-400" /> Configurações
          </h1>
          <p className="text-white/40 text-sm mt-1">Ajustes gerais da loja.</p>
        </div>
        <ConfiguracoesClient
          whatsappNumero={map["whatsapp_numero"] ?? ""}
          nomeLoja={map["nome_loja"] ?? ""}
          instagram={map["instagram"] ?? ""}
          endereco={map["endereco"] ?? ""}
        />
      </main>
    </div>
  );
}

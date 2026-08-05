import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { MessageSquare } from "lucide-react";
import { LeadsClient } from "./_client";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("id, nome, telefone, email, mensagem, veiculo_id, status, created_at, veiculos(nome)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-yellow-400" /> Contatos
          </h1>
          <p className="text-white/40 text-sm mt-1">Leads e mensagens recebidos de clientes.</p>
        </div>
        <LeadsClient leads={leads ?? []} />
      </main>
    </div>
  );
}

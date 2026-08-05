import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Star } from "lucide-react";
import { DestaquesClient } from "./_client";

export default async function AdminDestaquesPage() {
  const supabase = await createClient();
  const { data: veiculos } = await supabase
    .from("veiculos")
    .select("id, nome, preco, imagem_url, tipo, ano, marcas(nome), destaque")
    .eq("ativo", true)
    .order("destaque", { ascending: false })
    .order("nome");

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" /> Destaques
          </h1>
          <p className="text-white/40 text-sm mt-1">Veículos exibidos em destaque na página inicial. Máximo 10.</p>
        </div>
        <DestaquesClient veiculos={veiculos ?? []} />
      </main>
    </div>
  );
}

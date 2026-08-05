import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import Link from "next/link";
import { Car, Plus, Star } from "lucide-react";
import { VeiculosTable } from "./_table";

export default async function AdminVeiculosPage() {
  const supabase = await createClient();
  const { data: veiculos } = await supabase
    .from("veiculos")
    .select("id, nome, preco, imagem_url, tipo, ano, km, combustivel, destaque, disponivel, ativo, marcas(nome)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
              <Car className="h-6 w-6 text-yellow-400" /> Veículos
            </h1>
            <p className="text-white/40 text-sm mt-1">{veiculos?.length ?? 0} veículo(s) no estoque</p>
          </div>
          <Link
            href="/admin/veiculos/novo"
            className="flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-4 py-2.5 text-sm font-semibold hover:bg-yellow-300 transition-colors"
          >
            <Plus className="h-4 w-4" /> Novo Veículo
          </Link>
        </div>

        {(!veiculos || veiculos.length === 0) ? (
          <div className="rounded-xl border border-white/10 bg-[#161616] p-16 text-center">
            <Car className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Nenhum veículo cadastrado ainda.</p>
            <Link href="/admin/veiculos/novo" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-4 py-2 text-sm font-semibold">
              <Plus className="h-4 w-4" /> Adicionar veículo
            </Link>
          </div>
        ) : (
          <VeiculosTable veiculos={veiculos} />
        )}
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { VehicleForm } from "@/components/vehicle-form";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function NovoVeiculoPage() {
  const supabase = await createClient();
  const [{ data: marcas }, { count: featuredCount }] = await Promise.all([
    supabase.from("marcas").select("id, nome, slug").eq("ativo", true).order("nome"),
    supabase.from("veiculos").select("id", { count: "exact", head: true }).eq("destaque", true),
  ]);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <nav className="flex items-center gap-1.5 text-sm text-white/30 mb-6">
          <Link href="/admin/veiculos" className="hover:text-yellow-400 transition-colors">Veículos</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white font-medium">Novo Veículo</span>
        </nav>
        <h1 className="text-2xl font-bold text-white font-serif mb-8">Cadastrar Veículo</h1>
        <VehicleForm mode="create" marcas={marcas ?? []} featuredCount={featuredCount ?? 0} />
      </main>
    </div>
  );
}

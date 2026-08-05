import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Award } from "lucide-react";
import { MarcasClient } from "./_client";

export default async function AdminMarcasPage() {
  const supabase = await createClient();
  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nome, slug, imagem_url, pais, ativo")
    .order("nome");

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-400" /> Marcas
          </h1>
          <p className="text-white/40 text-sm mt-1">Gerencie as marcas de veículos.</p>
        </div>
        <MarcasClient marcas={marcas ?? []} />
      </main>
    </div>
  );
}

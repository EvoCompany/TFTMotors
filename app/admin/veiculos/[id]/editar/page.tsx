import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import { VehicleForm } from "@/components/vehicle-form";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function EditarVeiculoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: veiculo }, { data: marcas }, { count: featuredCount }] = await Promise.all([
    supabase.from("veiculos").select("*").eq("id", id).single(),
    supabase.from("marcas").select("id, nome, slug").eq("ativo", true).order("nome"),
    supabase.from("veiculos").select("id", { count: "exact", head: true }).eq("destaque", true),
  ]);

  if (!veiculo) notFound();

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <nav className="flex items-center gap-1.5 text-sm text-white/30 mb-6">
          <Link href="/admin/veiculos" className="hover:text-yellow-400 transition-colors">Veículos</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white font-medium line-clamp-1">{veiculo.nome}</span>
        </nav>
        <h1 className="text-2xl font-bold text-white font-serif mb-8">Editar Veículo</h1>
        <VehicleForm
          mode="edit"
          marcas={marcas ?? []}
          featuredCount={featuredCount ?? 0}
          initial={{
            id: veiculo.id,
            nome: veiculo.nome,
            slug: veiculo.slug,
            marca_id: veiculo.marca_id ?? "",
            tipo: veiculo.tipo,
            modelo: veiculo.modelo,
            ano: veiculo.ano,
            preco: Number(veiculo.preco),
            km: veiculo.km,
            combustivel: veiculo.combustivel,
            cambio: veiculo.cambio ?? "Manual",
            cor: veiculo.cor ?? "",
            descricao: veiculo.descricao ?? "",
            imagem_url: veiculo.imagem_url ?? "",
            destaque: veiculo.destaque,
            disponivel: veiculo.disponivel,
          }}
        />
      </main>
    </div>
  );
}

import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { VehicleCard } from "@/components/vehicle-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getVeiculosByMarca } from "@/lib/supabase-vehicles";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function MarcaPage({ params }: { params: Promise<{ marca: string }> }) {
  const { marca: marcaSlug } = await params;

  const sb = await createClient();
  const [marcaRes, veiculos, configRes] = await Promise.all([
    sb.from("marcas").select("id,nome,slug").eq("slug", marcaSlug).maybeSingle(),
    getVeiculosByMarca(marcaSlug),
    createClient().then((s) => s.from("configuracoes").select("chave,valor")),
  ]);

  const marcaData = marcaRes.data;
  if (!marcaData) notFound();

  const cfg: Record<string, string> = {};
  for (const c of configRes.data ?? []) cfg[c.chave] = c.valor ?? "";
  const whatsapp = cfg["whatsapp_numero"] || "5555991876326";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="bg-[#111] border-b border-white/10">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-3">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/busca" className="hover:text-primary transition-colors">Estoque</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white font-medium">{marcaData.nome}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xl font-bold">
                {marcaData.nome.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-white md:text-3xl">{marcaData.nome}</h1>
                <p className="text-white/50 text-sm mt-0.5">
                  {veiculos.length} {veiculos.length === 1 ? "veículo disponível" : "veículos disponíveis"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="py-10">
          <div className="container mx-auto px-4">
            {veiculos.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">Nenhum veículo disponível no momento.</p>
                <Link href="/busca" className="mt-4 inline-block text-primary font-semibold hover:underline">Ver todo o estoque</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {veiculos.map((v) => <VehicleCard key={v.id} veiculo={v} whatsapp={whatsapp} />)}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

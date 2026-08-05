import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { VehicleCard } from "@/components/vehicle-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getAllVeiculos } from "@/lib/supabase-vehicles";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const TIPOS = ["Hatch", "Sedan", "SUV", "Picape", "Conversível"];

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; marca?: string; tipo?: string; ano?: string }>;
}) {
  const sp = await searchParams;
  const { q = "", marca = "", tipo = "", ano = "" } = sp;

  const [veiculos, marcasRes, configRes] = await Promise.all([
    getAllVeiculos({ q: q || undefined, marca: marca || undefined, tipo: tipo || undefined, ano: ano || undefined }),
    createClient().then((sb) => sb.from("marcas").select("id,nome,slug").order("nome")),
    createClient().then((sb) => sb.from("configuracoes").select("chave,valor")),
  ]);

  const marcas = marcasRes.data ?? [];
  const cfg: Record<string, string> = {};
  for (const c of configRes.data ?? []) cfg[c.chave] = c.valor ?? "";
  const whatsapp = cfg["whatsapp_numero"] || "5555991876326";

  const marcaLabel = marca ? marcas.find((m) => m.slug === marca)?.nome : null;
  const title = q ? `Resultados para "${q}"` : [marcaLabel, tipo, ano].filter(Boolean).join(" · ") || "Todo o Estoque";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="bg-[#111] border-b border-white/10">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-3">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white font-medium">Estoque</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="h-8 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-white md:text-3xl">{title}</h1>
                <p className="text-white/50 text-sm mt-0.5">
                  {veiculos.length} {veiculos.length === 1 ? "veículo encontrado" : "veículos encontrados"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <form method="GET" className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <input name="q" defaultValue={q} placeholder="Buscar veículo..." className="w-full sm:w-auto rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <select name="marca" defaultValue={marca} className="w-full sm:w-auto rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Todas as marcas</option>
                {marcas.map((m) => <option key={m.id} value={m.slug}>{m.nome}</option>)}
              </select>
              <select name="tipo" defaultValue={tipo} className="w-full sm:w-auto rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Todos os tipos</option>
                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 sm:flex-none rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  Filtrar
                </button>
                {(q || marca || tipo || ano) && (
                  <Link href="/busca" className="flex-1 sm:flex-none text-center rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Limpar
                  </Link>
                )}
              </div>
            </form>

            {veiculos.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg mb-2">Nenhum veículo encontrado.</p>
                <Link href="/busca" className="text-primary font-semibold hover:underline">Ver todo o estoque</Link>
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

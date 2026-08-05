import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryGrid } from "@/components/category-grid";
import { BrandGrid } from "@/components/brand-grid";
import { VehicleCard } from "@/components/vehicle-card";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getVeiculosDestaque } from "@/lib/supabase-vehicles";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const [destaques, configRes] = await Promise.all([
    getVeiculosDestaque(),
    createClient().then((sb) => sb.from("configuracoes").select("chave,valor")),
  ]);

  const cfg: Record<string, string> = {};
  for (const c of configRes.data ?? []) cfg[c.chave] = c.valor ?? "";
  const whatsapp = cfg["whatsapp_numero"] || "5555991876326";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">Destaques do Estoque</h2>
                  <p className="text-sm text-muted-foreground">Veículos selecionados para você</p>
                </div>
              </div>
              <Link href="/busca" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destaques.map((v) => <VehicleCard key={v.id} veiculo={v} whatsapp={whatsapp} />)}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/busca" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Ver todo o estoque <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <BrandGrid />
        <CategoryGrid />

        <section className="bg-[#0a0a0a] py-14">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-3 font-serif text-2xl font-bold text-white md:text-3xl">Não Encontrou o Que Procura?</h2>
            <p className="mb-6 text-white/60 max-w-md mx-auto">Fale conosco pelo WhatsApp e nossa equipe vai encontrar o veículo ideal para o seu perfil e orçamento.</p>
            <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-4 font-bold text-white transition-colors hover:bg-green-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

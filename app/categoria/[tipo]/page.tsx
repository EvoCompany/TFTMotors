import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { VehicleCard } from "@/components/vehicle-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getVeiculosByTipo } from "@/lib/supabase-vehicles";
import { getWhatsapp } from "@/lib/supabase-config";

export const revalidate = 60;

const TIPO_MAP: Record<string, string> = {
  hatch: "Hatch", sedan: "Sedan", suv: "SUV",
  picape: "Picape", conversivel: "Conversível",
};

export async function generateStaticParams() {
  return Object.keys(TIPO_MAP).map((tipo) => ({ tipo }));
}

export async function generateMetadata({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params;
  const nome = TIPO_MAP[tipo];
  if (!nome) return {};
  return { title: `${nome} — Seminovos | TFT Motors`, description: `Encontre ${nome}s seminovos com qualidade na TFT Motors.` };
}

export default async function CategoriaPage({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params;
  const nomeDb = TIPO_MAP[tipo];
  if (!nomeDb) notFound();

  const [veiculos, whatsapp] = await Promise.all([
    getVeiculosByTipo(nomeDb),
    getWhatsapp(),
  ]);

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
              <span className="text-white font-medium">{nomeDb}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="h-8 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-white md:text-3xl">{nomeDb}s</h1>
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
                <p className="text-lg">Nenhum veículo nesta categoria no momento.</p>
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

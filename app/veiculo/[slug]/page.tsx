import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ChevronRight, Fuel, Gauge, Calendar, Settings, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVeiculoBySlug } from "@/lib/supabase-vehicles";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

const FALLBACK = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80";

export default async function VeiculoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [veiculo, configRes] = await Promise.all([
    getVeiculoBySlug(slug),
    createClient().then((sb) => sb.from("configuracoes").select("chave,valor")),
  ]);

  if (!veiculo) notFound();

  const cfg: Record<string, string> = {};
  for (const c of configRes.data ?? []) cfg[c.chave] = c.valor ?? "";
  const whatsapp = cfg["whatsapp_numero"] || "5555991876326";

  const whatsappMsg = encodeURIComponent(`Olá! Tenho interesse no veículo: ${veiculo.nome} — R$ ${veiculo.preco.toLocaleString("pt-BR")}`);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${whatsappMsg}`;
  const parcela = Math.round(veiculo.preco / 60);
  const img = veiculo.imagem_url || FALLBACK;

  const specs = [
    { icon: Calendar, label: "Ano", value: veiculo.ano ? String(veiculo.ano) : "—" },
    { icon: Gauge, label: "Quilometragem", value: veiculo.km != null ? `${veiculo.km.toLocaleString("pt-BR")} km` : "—" },
    { icon: Fuel, label: "Combustível", value: veiculo.combustivel ?? "—" },
    { icon: Settings, label: "Câmbio", value: veiculo.cambio ?? "—" },
    { icon: MapPin, label: "Categoria", value: veiculo.tipo ?? "—" },
    { icon: MapPin, label: "Cor", value: veiculo.cor ?? "—" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="bg-[#111] border-b border-white/10">
          <div className="container mx-auto px-4 py-5">
            <nav className="flex items-center gap-1.5 text-sm text-white/40">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/busca" className="hover:text-primary transition-colors">Estoque</Link>
              <ChevronRight className="h-4 w-4" />
              {veiculo.marcas && (
                <>
                  <Link href={`/marca/${veiculo.marcas.slug}`} className="hover:text-primary transition-colors">{veiculo.marcas.nome}</Link>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
              <span className="text-white truncate max-w-[180px]">{veiculo.modelo}</span>
            </nav>
          </div>
        </div>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-sm">
                <Image src={img} alt={veiculo.nome} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {veiculo.ano && <span className="rounded bg-[#111] px-2.5 py-1 text-xs font-bold text-white">{veiculo.ano}</span>}
                  {veiculo.tipo && <span className="rounded bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">{veiculo.tipo}</span>}
                </div>
              </div>

              <div>
                {veiculo.marcas && <span className="text-xs font-bold text-primary uppercase tracking-wider">{veiculo.marcas.nome}</span>}
                <h1 className="font-serif text-2xl font-bold text-foreground mt-1 mb-4 md:text-3xl leading-tight">{veiculo.nome}</h1>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-semibold text-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {veiculo.descricao && (
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{veiculo.descricao}</p>
                )}

                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 mb-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Preço</p>
                  <p className="text-3xl font-bold text-foreground">R$ {veiculo.preco.toLocaleString("pt-BR")}</p>
                  <p className="text-sm text-muted-foreground mt-1">ou <span className="font-semibold text-foreground">60x de R$ {parcela.toLocaleString("pt-BR")}</span>*</p>
                  <p className="text-[10px] text-muted-foreground mt-2">*Financiamento sujeito a análise de crédito</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold gap-2 py-6">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Quero Este Veículo
                    </a>
                  </Button>
                  {veiculo.marcas && (
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link href={`/marca/${veiculo.marcas.slug}`}>Ver outros {veiculo.marcas.nome}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

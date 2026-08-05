"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MARCAS, MODELOS_POR_MARCA, VEICULOS, type Veiculo } from "@/lib/vehicles-data";

const ANOS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);
const WHATSAPP_BASE = "https://api.whatsapp.com/send?phone=5555991876326";

function formatPrice(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function PriceRange({ min, max }: { min: number; max: number }) {
  const range = max - min;
  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded-full bg-muted relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: "100%" }} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
      {range > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-1">
          Variação de até {formatPrice(range)} entre os exemplares
        </p>
      )}
    </div>
  );
}

function ResultCard({ veiculo }: { veiculo: Veiculo }) {
  const msg = encodeURIComponent(`Olá! Tenho interesse no ${veiculo.nome} — ${formatPrice(veiculo.preco)}`);
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">{veiculo.marca}</span>
          <h3 className="font-serif font-bold text-foreground text-base leading-snug">{veiculo.modelo} {veiculo.ano}</h3>
          <p className="text-xs text-muted-foreground">{veiculo.combustivel} · {veiculo.cambio} · {veiculo.tipo}</p>
        </div>
        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
          {veiculo.km.toLocaleString("pt-BR")} km
        </span>
      </div>
      <p className="text-2xl font-bold text-foreground">{formatPrice(veiculo.preco)}</p>
      <p className="text-xs text-muted-foreground mb-4">
        ou 60x de {formatPrice(Math.round(veiculo.preco / 60))}*
      </p>
      <a
        href={`${WHATSAPP_BASE}&text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Tenho Interesse
      </a>
    </div>
  );
}

export default function ComparadorPage() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [resultados, setResultados] = useState<Veiculo[] | null>(null);

  const modelos = marca ? MODELOS_POR_MARCA[marca] ?? [] : [];

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMarca(e.target.value);
    setModelo("");
    setResultados(null);
  };

  const handleBuscar = () => {
    let filtered = VEICULOS;
    if (marca) filtered = filtered.filter((v) => v.marcaSlug === marca);
    if (modelo) filtered = filtered.filter((v) => v.modelo === modelo);
    if (ano) filtered = filtered.filter((v) => v.ano === Number(ano));
    setResultados(filtered);
  };

  const precos = resultados?.map((v) => v.preco) ?? [];
  const minPreco = precos.length ? Math.min(...precos) : 0;
  const maxPreco = precos.length ? Math.max(...precos) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Header */}
        <div className="bg-[#111] border-b border-white/10">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-1.5 text-sm text-white/40 mb-3">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white font-medium">Comparador de Preços</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="h-8 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <div>
                <h1 className="font-serif text-2xl font-bold text-white md:text-3xl">
                  Comparador de Preços
                </h1>
                <p className="text-white/50 text-sm mt-0.5">
                  Pesquise o preço de mercado do veículo que você procura
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-foreground mb-5">
                Selecione o veículo
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Marca
                  </label>
                  <select
                    value={marca}
                    onChange={handleMarcaChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Todas as marcas</option>
                    {MARCAS.map((m) => (
                      <option key={m.slug} value={m.slug}>{m.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Modelo
                  </label>
                  <select
                    value={modelo}
                    onChange={(e) => { setModelo(e.target.value); setResultados(null); }}
                    disabled={!marca}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Todos os modelos</option>
                    {modelos.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Ano
                  </label>
                  <select
                    value={ano}
                    onChange={(e) => { setAno(e.target.value); setResultados(null); }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Qualquer ano</option>
                    {ANOS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleBuscar}
                size="lg"
                className="mt-5 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold gap-2"
              >
                <Search className="h-4 w-4" />
                Consultar Preço
              </Button>
            </div>

            {/* Results */}
            {resultados !== null && (
              <div className="mt-8">
                {resultados.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Nenhum veículo encontrado com esses filtros.</p>
                    <p className="text-sm mt-1">Tente uma busca mais ampla ou fale conosco.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
                      <h3 className="font-serif text-base font-bold text-foreground mb-1">
                        Faixa de Preço no Estoque
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        Baseado em {resultados.length} {resultados.length === 1 ? "veículo" : "veículos"} disponíveis
                      </p>
                      <PriceRange min={minPreco} max={maxPreco} />
                    </div>

                    <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                      Veículos Disponíveis
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {resultados.map((v) => (
                        <ResultCard key={v.id} veiculo={v} />
                      ))}
                    </div>
                  </>
                )}
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

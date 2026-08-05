import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { VeiculoDb } from "@/lib/supabase-vehicles";

const FALLBACK = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80";

interface VehicleCardProps {
  veiculo: VeiculoDb;
  whatsapp?: string;
}

export function VehicleCard({ veiculo, whatsapp = "5555991876326" }: VehicleCardProps) {
  const whatsappMsg = encodeURIComponent(`Olá! Tenho interesse no veículo: ${veiculo.nome} — R$ ${veiculo.preco.toLocaleString("pt-BR")}`);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${whatsappMsg}`;
  const parcela = Math.round(veiculo.preco / 60);
  const img = veiculo.imagem_url || FALLBACK;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-sm border border-border transition-all hover:shadow-lg hover:-translate-y-0.5">
      <Link href={`/veiculo/${veiculo.slug}`} className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={img}
          alt={veiculo.nome}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2rem), 320px"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {veiculo.ano && <Badge className="bg-[#111] text-white text-[10px] font-bold">{veiculo.ano}</Badge>}
          {veiculo.destaque && <Badge className="bg-secondary text-secondary-foreground text-[10px] font-bold">Destaque</Badge>}
        </div>
        {veiculo.tipo && (
          <div className="absolute top-2 right-2">
            <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">{veiculo.tipo}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/veiculo/${veiculo.slug}`}>
          <h3 className="mb-1 text-sm font-bold text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
            {veiculo.nome}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-xs text-muted-foreground">
          {veiculo.km != null && (
            <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{veiculo.km.toLocaleString("pt-BR")} km</span>
          )}
          {veiculo.combustivel && (
            <span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{veiculo.combustivel}</span>
          )}
          {veiculo.cambio && (
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{veiculo.cambio}</span>
          )}
        </div>

        <div className="mt-auto border-t border-border/50 pt-3">
          <p className="text-xs text-muted-foreground">A partir de</p>
          <p className="text-xl font-bold text-foreground leading-tight">R$ {veiculo.preco.toLocaleString("pt-BR")}</p>
          <p className="text-xs text-muted-foreground">ou <span className="font-medium text-foreground">60x de R$ {parcela.toLocaleString("pt-BR")}</span>*</p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Button asChild size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <svg className="mr-1.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Tenho Interesse
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={`/veiculo/${veiculo.slug}`}>Ver Detalhes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

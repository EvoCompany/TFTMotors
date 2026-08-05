"use client";

import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, GitMerge } from "lucide-react";
import { motion } from "motion/react";
import type { VeiculoDb } from "@/lib/supabase-vehicles";

const FALLBACK = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80";

const WA = () => (
  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface VehicleCardProps {
  veiculo: VeiculoDb;
  whatsapp?: string;
  index?: number;
}

export function VehicleCard({ veiculo, whatsapp = "5555991876326", index = 0 }: VehicleCardProps) {
  const whatsappMsg = encodeURIComponent(`Olá! Tenho interesse no veículo: ${veiculo.nome} — R$ ${veiculo.preco.toLocaleString("pt-BR")}`);
  const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${whatsappMsg}`;
  const parcela = Math.round(veiculo.preco / 60);
  const img = veiculo.imagem_url || FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
    >
      <motion.div
        className="relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border"
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{
          rest: { y: 0, boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" },
          hover: { y: -7, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.15)", transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        {/* Image */}
        <Link href={`/veiculo/${veiculo.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-muted">
          <motion.div
            className="absolute inset-0"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.07, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <Image
              src={img}
              alt={veiculo.nome}
              fill
              className="object-cover"
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2rem), 320px"
              loading="lazy"
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {veiculo.ano && (
              <span className="rounded-md bg-black/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white">
                {veiculo.ano}
              </span>
            )}
            {veiculo.destaque && (
              <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-black text-primary-foreground uppercase tracking-wide">
                ★ Destaque
              </span>
            )}
          </div>
          {veiculo.tipo && (
            <div className="absolute top-3 right-3 z-10">
              <span className="rounded-md bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wide">
                {veiculo.tipo}
              </span>
            </div>
          )}
        </Link>

        {/* Yellow bottom border reveal */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary"
          style={{ transformOrigin: "left" }}
          variants={{
            rest: { scaleX: 0 },
            hover: { scaleX: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
          }}
        />

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 pb-5">
          <Link href={`/veiculo/${veiculo.slug}`}>
            <h3 className="mb-2 text-[15px] font-bold text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
              {veiculo.nome}
            </h3>
          </Link>

          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-xs text-muted-foreground">
            {veiculo.km != null && (
              <span className="flex items-center gap-1">
                <Gauge className="h-3 w-3 text-primary" />
                {veiculo.km.toLocaleString("pt-BR")} km
              </span>
            )}
            {veiculo.combustivel && (
              <span className="flex items-center gap-1">
                <Fuel className="h-3 w-3 text-primary" />
                {veiculo.combustivel}
              </span>
            )}
            {veiculo.cambio && (
              <span className="flex items-center gap-1">
                <GitMerge className="h-3 w-3 text-primary" />
                {veiculo.cambio}
              </span>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-border/60">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">A partir de</p>
            <motion.p
              className="text-2xl font-black text-foreground leading-tight"
              variants={{
                rest: { color: "inherit" },
                hover: { color: "hsl(var(--primary))", transition: { duration: 0.2 } },
              }}
            >
              R$ {veiculo.preco.toLocaleString("pt-BR")}
            </motion.p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              ou <span className="font-semibold text-foreground">60x de R$ {parcela.toLocaleString("pt-BR")}</span>*
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-500 px-3 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <WA /> Tenho Interesse
            </a>
            <Link
              href={`/veiculo/${veiculo.slug}`}
              className="flex items-center justify-center rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Ver Detalhes
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

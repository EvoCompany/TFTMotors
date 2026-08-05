"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface Marca {
  id: string;
  nome: string;
  slug: string;
  imagem_url: string | null;
}

export function BrandGridClient({ marcas }: { marcas: Marca[] }) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Marcas</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif text-2xl font-black text-foreground md:text-3xl uppercase tracking-wide">
            Buscar por Marca
          </h2>
          <p className="text-muted-foreground text-sm mt-2">Selecione a fabricante do seu interesse</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {marcas.map((marca, i) => (
            <motion.div
              key={marca.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/marca/${marca.slug}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-card p-5 border border-border hover:border-primary/40 transition-colors hover:shadow-lg hover:shadow-primary/10 block"
              >
                <div className="relative h-16 w-full overflow-hidden rounded-xl bg-white p-2">
                  {marca.imagem_url ? (
                    <Image
                      src={marca.imagem_url}
                      alt={marca.nome}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#111] text-white text-xs font-bold">
                      {marca.nome.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors text-center">
                  {marca.nome}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

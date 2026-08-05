"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const bodyTypes = [
  { nome: "Hatch", slug: "hatch", image: "/cat-hatch.jpg", desc: "Compacto e econômico" },
  { nome: "Sedan", slug: "sedan", image: "/cat-sedan.jpg", desc: "Conforto e espaço" },
  { nome: "SUV", slug: "suv", image: "/cat-suv.jpg", desc: "Força e versatilidade" },
  { nome: "Picape", slug: "picape", image: "/cat-picape.jpg", desc: "Trabalho e aventura" },
  { nome: "Conversível", slug: "conversivel", image: "/cat-conversivel.jpg", desc: "Estilo e emoção" },
];

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 bg-background">
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
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Categorias</span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif text-2xl font-black text-foreground md:text-3xl uppercase tracking-wide">
            Buscar por Categoria
          </h2>
          <p className="text-muted-foreground text-sm mt-2">Encontre o modelo perfeito para o seu estilo de vida</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {bodyTypes.map((type, i) => (
            <motion.div
              key={type.slug}
              className="w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] md:w-44"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/categoria/${type.slug}`}
                className="group flex flex-col items-center rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors hover:shadow-lg hover:shadow-primary/8 overflow-hidden block"
              >
                {/* Image area */}
                <div className="relative w-full bg-white flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
                  {type.image ? (
                    <Image
                      src={type.image}
                      alt={type.nome}
                      fill
                      className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                    />
                  ) : (
                    <span className="text-4xl select-none">🚌</span>
                  )}
                </div>

                {/* Label */}
                <div className="w-full px-3 py-3 text-center border-t border-border/60">
                  <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{type.nome}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{type.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

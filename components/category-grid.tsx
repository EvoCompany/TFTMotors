"use client";

import Link from "next/link";
import { motion } from "motion/react";

const bodyTypes = [
  { nome: "Hatch", slug: "hatch", emoji: "🚗", desc: "Compacto e econômico" },
  { nome: "Sedan", slug: "sedan", emoji: "🚙", desc: "Conforto e espaço" },
  { nome: "SUV", slug: "suv", emoji: "🚐", desc: "Força e versatilidade" },
  { nome: "Picape", slug: "picape", emoji: "🛻", desc: "Trabalho e aventura" },
  { nome: "Minivan", slug: "minivan", emoji: "🚌", desc: "Família em primeiro lugar" },
  { nome: "Conversível", slug: "conversivel", emoji: "🏎️", desc: "Estilo e emoção" },
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {bodyTypes.map((type, i) => (
            <motion.div
              key={type.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/categoria/${type.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-card p-5 border border-border hover:border-primary/40 transition-colors hover:shadow-lg hover:shadow-primary/8 block"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {type.emoji}
                </div>
                <div className="text-center">
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

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield, Award, Headphones, Star, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const banners = [
  {
    id: 1,
    image: "/slide1.jpg",
    tag: "Estoque Exclusivo",
    title: ["Seu Próximo Carro", "Está"],
    accent: "Aqui.",
    subtitle: "Amplo estoque de seminovos com qualidade e procedência garantida.",
  },
  {
    id: 2,
    image: "/slide2.jpg",
    tag: "Melhores Taxas",
    title: ["Financiamento", "Que"],
    accent: "Cabe.",
    subtitle: "As melhores taxas do mercado para você sair de carro hoje.",
  },
  {
    id: 3,
    image: "/slide3.png",
    tag: "Confiança Total",
    title: ["Garantia em", "Cada"],
    accent: "Veículo.",
    subtitle: "Revisão completa, laudo cautelar e documentação em dia.",
  },
];

const benefits = [
  { icon: Shield, text: "Garantia", subtext: "Em todos os veículos" },
  { icon: Award, text: "Procedência", subtext: "Laudo cautelar" },
  { icon: Headphones, text: "Suporte", subtext: "Pós-venda completo" },
  { icon: Star, text: "Busca Grátis", subtext: "Encontramos seu carro" },
];

const itemV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section>
      <div className="relative min-h-[50vh] overflow-hidden">
        {/* Background images — crossfade */}
        {banners.map((b, i) => (
          <motion.div
            key={b.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <Image
              src={b.image}
              alt=""
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
          </motion.div>
        ))}

        {/* Dark gradient overlay — heavy on left where text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 pointer-events-none" />
        {/* Bottom fade for smooth transition to benefits bar */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.015) 79px,rgba(255,255,255,0.015) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.015) 79px,rgba(255,255,255,0.015) 80px)",
          }}
        />

        {/* Yellow accent line top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ transformOrigin: "left" }}
        />

        <div className="relative z-10 container mx-auto px-4 py-14 md:py-20 lg:py-28 min-h-[50vh] flex items-center">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={containerV}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
              >
                <motion.div variants={itemV}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    {banners[current].tag}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemV}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5 drop-shadow-lg"
                >
                  {banners[current].title.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                  <span className="text-primary">{banners[current].accent}</span>
                </motion.h1>

                <motion.p
                  variants={itemV}
                  className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-md drop-shadow"
                >
                  {banners[current].subtitle}
                </motion.p>

                <motion.div variants={itemV}>
                  <button
                    onClick={() => router.push("/busca")}
                    className="rounded-xl bg-primary px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-black text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wide shadow-lg"
                  >
                    Ver Estoque
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/30 hover:bg-white/55"}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Role</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Benefits bar */}
      <div className="bg-zinc-900">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                  <b.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{b.text}</p>
                  <p className="text-xs text-white/50">{b.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

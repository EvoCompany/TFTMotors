"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Shield, Award, Headphones, Star, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MARCAS, MODELOS_POR_MARCA, TIPOS } from "@/lib/vehicles-data";

const banners = [
  {
    id: 1,
    tag: "Estoque Exclusivo",
    title: ["Seu Próximo Carro", "Está"],
    accent: "Aqui.",
    subtitle: "Amplo estoque de seminovos com qualidade e procedência garantida.",
    bg: "from-[#080808] via-[#111] to-[#080808]",
  },
  {
    id: 2,
    tag: "Melhores Taxas",
    title: ["Financiamento", "Que"],
    accent: "Cabe.",
    subtitle: "As melhores taxas do mercado para você sair de carro hoje.",
    bg: "from-[#080808] via-[#100a00] to-[#080808]",
  },
  {
    id: 3,
    tag: "Confiança Total",
    title: ["Garantia em", "Cada"],
    accent: "Veículo.",
    subtitle: "Revisão completa, laudo cautelar e documentação em dia.",
    bg: "from-[#080808] via-[#080a10] to-[#080808]",
  },
];

const benefits = [
  { icon: Shield, text: "Garantia", subtext: "Em todos os veículos" },
  { icon: Award, text: "Procedência", subtext: "Laudo cautelar" },
  { icon: Headphones, text: "Suporte", subtext: "Pós-venda completo" },
  { icon: Star, text: "Busca Grátis", subtext: "Encontramos seu carro" },
];

const ANOS = Array.from({ length: 27 }, (_, i) => 2026 - i);

const OPT = { background: "#1a1a1a", color: "#fff" };

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
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [tipo, setTipo] = useState("");
  const router = useRouter();

  const modelos = marca ? MODELOS_POR_MARCA[marca] ?? [] : [];

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 6500);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (marca) p.set("marca", marca);
    if (modelo) p.set("modelo", modelo);
    if (ano) p.set("ano", ano);
    if (tipo) p.set("tipo", tipo);
    router.push(`/busca?${p.toString()}`);
  };

  const selectCls =
    "w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/60 backdrop-blur-sm transition-colors hover:bg-white/12";

  return (
    <section>
      {/* Hero */}
      <div className="relative min-h-[88vh] overflow-hidden">
        {/* Slides */}
        {banners.map((b, i) => (
          <motion.div
            key={b.id}
            className={`absolute inset-0 bg-gradient-to-br ${b.bg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        ))}

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.02) 79px,rgba(255,255,255,0.02) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.02) 79px,rgba(255,255,255,0.02) 80px)",
          }}
        />

        {/* Yellow accent line top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ transformOrigin: "left" }}
        />

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 min-h-[88vh] flex items-center">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center w-full">

            {/* Text — stagger on slide change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={containerV}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
              >
                <motion.div variants={itemV}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    {banners[current].tag}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemV}
                  className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
                >
                  {banners[current].title.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                  <span className="text-primary">{banners[current].accent}</span>
                </motion.h1>

                <motion.p
                  variants={itemV}
                  className="text-white/65 text-lg leading-relaxed mb-8 max-w-md"
                >
                  {banners[current].subtitle}
                </motion.p>

                <motion.div variants={itemV} className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push("/busca")}
                    className="rounded-xl bg-primary px-7 py-3.5 text-sm font-black text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wide"
                  >
                    Ver Estoque
                  </button>
                  <button
                    onClick={() => router.push("/comparador")}
                    className="rounded-xl border border-white/25 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-bold text-white hover:bg-white/12 transition-colors"
                  >
                    Comparador
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Search form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/6 backdrop-blur-xl p-7 shadow-2xl"
            >
              <h2 className="text-white font-serif text-xl font-black mb-1 tracking-tight">Encontre seu Carro</h2>
              <p className="text-white/40 text-xs mb-5">Filtre por marca, modelo, ano ou tipo</p>
              <form onSubmit={handleSearch} className="flex flex-col gap-3">
                <select value={marca} onChange={(e) => { setMarca(e.target.value); setModelo(""); }} className={selectCls}>
                  <option value="" style={OPT}>Todas as marcas</option>
                  {MARCAS.map((m) => <option key={m.slug} value={m.slug} style={OPT}>{m.nome}</option>)}
                </select>

                <select value={modelo} onChange={(e) => setModelo(e.target.value)} disabled={!marca} className={selectCls + (marca ? "" : " opacity-40 cursor-not-allowed")}>
                  <option value="" style={OPT}>Todos os modelos</option>
                  {modelos.map((m) => <option key={m} value={m} style={OPT}>{m}</option>)}
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <select value={ano} onChange={(e) => setAno(e.target.value)} className={selectCls}>
                    <option value="" style={OPT}>Qualquer ano</option>
                    {ANOS.map((a) => <option key={a} value={a} style={OPT}>{a}</option>)}
                  </select>
                  <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={selectCls}>
                    <option value="" style={OPT}>Qualquer tipo</option>
                    {TIPOS.map((t) => <option key={t.slug} value={t.slug} style={OPT}>{t.nome}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-3.5 text-sm font-black text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-wide mt-1"
                >
                  <Search className="h-4 w-4" />
                  Buscar Veículos
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1 text-white/30"
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

      {/* Benefits bar — Jeep style: yellow bg, black text */}
      <div className="bg-primary">
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
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black/10">
                  <b.icon className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="text-sm font-black text-black">{b.text}</p>
                  <p className="text-xs text-black/60">{b.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

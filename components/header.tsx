"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, ChevronDown, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MARCAS, TIPOS } from "@/lib/vehicles-data";

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=5555991876326";
const PHONE_NUMBER = "(55) 9 9187-6326";

const WASm = () => (
  <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WAMd = () => (
  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${scrolled ? "shadow-2xl shadow-black/50" : ""}`}>
      {/* Top Bar — collapses on scroll */}
      <div
        className="bg-[#0a0a0a] text-white overflow-hidden transition-all duration-300"
        style={{ maxHeight: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <span className="hidden sm:flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-primary" />
              <a href="tel:+5555991876326" className="hover:text-primary transition-colors">{PHONE_NUMBER}</a>
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-white/70">Segunda a Sábado — 08:00 às 18:00</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors">
              <WASm /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`border-b border-white/10 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-xl" : "bg-[#111111]"}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile menu + Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-[#111] text-white border-white/10">
                  <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                  <div className="flex flex-col gap-6 pt-6">
                    <Link href="/" className="flex items-center gap-3 px-2">
                      <Image src="/logo.jpg" alt="TFT Motors" width={48} height={48}
                        className="h-12 w-12 rounded object-cover" />
                      <span className="font-serif text-xl font-bold text-primary">TFT Motors</span>
                    </Link>
                    <nav className="flex flex-col gap-1">
                      <p className="mb-1 text-xs font-semibold text-white/40 uppercase tracking-wider px-3">Marcas</p>
                      {MARCAS.map((m) => (
                        <Link key={m.slug} href={`/marca/${m.slug}`}
                          className="px-3 py-2 rounded text-sm text-white/80 hover:bg-white/10 hover:text-primary transition-colors">
                          {m.nome}
                        </Link>
                      ))}
                      <p className="mt-3 mb-1 text-xs font-semibold text-white/40 uppercase tracking-wider px-3">Categorias</p>
                      {TIPOS.map((t) => (
                        <Link key={t.slug} href={`/categoria/${t.slug}`}
                          className="px-3 py-2 rounded text-sm text-white/80 hover:bg-white/10 hover:text-primary transition-colors">
                          {t.nome}
                        </Link>
                      ))}
                      <div className="mt-3 border-t border-white/10 pt-3">
                        <Link href="/comparador"
                          className="px-3 py-2 rounded text-sm font-semibold text-primary hover:bg-white/10 transition-colors block">
                          Comparador de Preços
                        </Link>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                <Image src="/logo.jpg" alt="TFT Motors" width={48} height={48}
                  className="h-10 w-10 md:h-12 md:w-12 rounded object-cover" priority />
                <div className="hidden sm:block">
                  <span className="font-serif text-xl font-bold text-primary leading-none block">TFT Motors</span>
                  <motion.div
                    className="h-0.5 bg-primary mt-0.5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </Link>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative w-full max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Buscar por marca, modelo ou ano..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pr-12 pl-4 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15"
                />
                <Button type="submit" size="icon"
                  className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </div>
            </form>

            {/* WhatsApp CTA with pulse ring */}
            <div className="hidden lg:flex relative flex-shrink-0">
              <span className="absolute inset-0 rounded-lg bg-green-500/40 animate-ping" />
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                className="relative flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-500 px-4 py-2 text-sm font-bold text-white transition-colors">
                <WAMd /> Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className={`hidden md:block transition-all duration-300 ${scrolled ? "bg-primary/95 backdrop-blur-xl" : "bg-primary"}`}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-0">
            <li className="group relative">
              <button className="flex items-center gap-1.5 whitespace-nowrap px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-black/15">
                Marcas <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 z-50 hidden min-w-[200px] rounded-b border border-border bg-card shadow-xl group-hover:block">
                <ul className="py-2">
                  {MARCAS.map((m) => (
                    <li key={m.slug}>
                      <Link href={`/marca/${m.slug}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                        <span>{m.nome}</span>
                        <span className="text-xs text-muted-foreground">{m.pais}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="group relative">
              <button className="flex items-center gap-1.5 whitespace-nowrap px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-black/15">
                Categorias <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 z-50 hidden min-w-[160px] rounded-b border border-border bg-card shadow-xl group-hover:block">
                <ul className="py-2">
                  {TIPOS.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/categoria/${t.slug}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                        {t.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <Link href="/comparador"
                className="flex items-center whitespace-nowrap px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-black/15">
                Comparador
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

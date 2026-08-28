import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Instagram } from "lucide-react";
import { MARCAS, TIPOS } from "@/lib/vehicles-data";

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=5555991876326";
const PHONE_NUMBER = "(55) 9 9187-6326";

const WhatsAppIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#080808] text-white">
      {/* Yellow accent top line */}
      <div className="h-[3px] bg-primary" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="TFT Motors" width={52} height={52}
                className="h-12 w-12 rounded object-cover" sizes="52px" />
              <div>
                <span className="font-serif text-xl font-black text-primary block leading-none">TFT Motors</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Seminovos</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/55">
              Sua revenda de confiança em Santiago/RS. Amplo estoque de seminovos
              com qualidade, procedência e as melhores condições de financiamento.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/tftmotors_oficial/" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 border border-white/10 transition-all hover:bg-pink-600 hover:border-pink-600">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 border border-white/10 transition-all hover:bg-green-500 hover:border-green-500">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Marcas */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-black text-primary uppercase tracking-[0.2em]">Marcas</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-white/55">
              {MARCAS.map((m) => (
                <li key={m.slug}>
                  <Link href={`/marca/${m.slug}`}
                    className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {m.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-black text-primary uppercase tracking-[0.2em]">Categorias</h3>
            <ul className="space-y-1.5 text-sm text-white/55">
              {TIPOS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/categoria/${t.slug}`}
                    className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {t.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-serif text-sm font-black text-primary uppercase tracking-[0.2em]">Contato</h3>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-center gap-2.5">
                <span className="text-green-400 flex-shrink-0"><WhatsAppIcon /></span>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors font-medium">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block leading-none mb-0.5">Matriz</span>
                    <span>Rua Silveira Martins, 1258<br />Centro — Santiago/RS</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block leading-none mb-0.5">Filial</span>
                    <span>Rua Tito Beccon, 271 – Sala 2<br />Santiago/RS</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Seg a Sex: 08:00 às 18:00<br />Sáb: 08:00 às 13:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} TFT Motors. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/25">
            *Financiamento sujeito a análise de crédito. Parcelas ilustrativas.
          </p>
        </div>
      </div>
    </footer>
  );
}

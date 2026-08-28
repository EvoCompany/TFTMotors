"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Car, Award, Star, MessageSquare, Settings, LogOut, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin/dashboard",     label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/veiculos",      label: "Veículos",   icon: Car },
  { href: "/admin/marcas",        label: "Marcas",     icon: Award },
  { href: "/admin/destaques",     label: "Destaques",  icon: Star },
  { href: "/admin/leads",         label: "Contatos",   icon: MessageSquare },
  { href: "/admin/configuracoes", label: "Config",     icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-expanded") === "true";
    }
    return false;
  });

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem("sidebar-expanded", String(next));
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={`sticky top-0 h-screen flex-shrink-0 bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-all duration-200 overflow-hidden ${
        expanded ? "w-52" : "w-[60px]"
      }`}
    >
      <button
        onClick={toggle}
        title={expanded ? "Recolher menu" : "Expandir menu"}
        className="h-16 flex items-center gap-3 px-3 border-b border-white/10 flex-shrink-0 w-full hover:bg-white/5 transition-colors"
      >
        <div className="h-9 w-9 flex-shrink-0 rounded-lg overflow-hidden border border-yellow-400/30">
          <Image src="/logo.jpg" alt="TFT Motors" width={36} height={36} className="h-full w-full object-cover" sizes="36px" />
        </div>
        {expanded && <span className="font-serif text-sm font-bold text-yellow-400 truncate">TFT Motors</span>}
      </button>

      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-yellow-400/15 text-yellow-400 border-l-2 border-yellow-400"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {expanded && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-white/10 space-y-1 flex-shrink-0">
        <Link
          href="/admin/veiculos/novo"
          title="Novo Veículo"
          className={`flex items-center gap-2 rounded-lg bg-yellow-400 text-black font-semibold transition-all hover:bg-yellow-300 ${
            expanded ? "px-3 py-2 text-sm" : "p-2.5 justify-center"
          }`}
        >
          <Plus className="h-4 w-4 flex-shrink-0" />
          {expanded && <span className="truncate">Novo Veículo</span>}
        </Link>
        <button
          onClick={handleLogout}
          title="Sair"
          className={`flex items-center gap-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full ${
            expanded ? "px-3 py-2 text-sm" : "p-2.5 justify-center"
          }`}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {expanded && <span className="truncate">Sair</span>}
        </button>
      </div>
    </aside>
  );
}

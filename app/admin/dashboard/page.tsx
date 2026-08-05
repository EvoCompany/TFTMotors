import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin-sidebar";
import Link from "next/link";
import { Car, Star, Award, MessageSquare, Plus, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalVeiculos },
    { count: emDestaque },
    { count: totalMarcas },
    { count: totalLeads },
    { data: recentes },
  ] = await Promise.all([
    supabase.from("veiculos").select("id", { count: "exact", head: true }),
    supabase.from("veiculos").select("id", { count: "exact", head: true }).eq("destaque", true),
    supabase.from("marcas").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("veiculos")
      .select("id, nome, preco, imagem_url, tipo, ano, km, marcas(nome)")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const stats = [
    { label: "Total de Veículos", value: totalVeiculos ?? 0, icon: Car,          color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
    { label: "Em Destaque",       value: emDestaque ?? 0,   icon: Star,          color: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/20" },
    { label: "Marcas",            value: totalMarcas ?? 0,  icon: Award,         color: "text-blue-400",   bg: "bg-blue-400/10",   border: "border-blue-400/20" },
    { label: "Contatos",          value: totalLeads ?? 0,   icon: MessageSquare, color: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/20" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-serif">Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Visão geral do estoque TFT Motors</p>
          </div>
          <Link
            href="/admin/veiculos/novo"
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
          >
            <Plus className="h-4 w-4" /> Novo Veículo
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`rounded-xl border ${border} ${bg} p-5`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50">{label}</span>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Veículos Recentes</h2>
              <Link href="/admin/veiculos" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">Ver todos</Link>
            </div>
            {(!recentes || recentes.length === 0) ? (
              <div className="p-10 text-center">
                <Car className="h-10 w-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">Nenhum veículo cadastrado ainda.</p>
                <Link href="/admin/veiculos/novo" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-yellow-400 text-black px-4 py-2 text-sm font-semibold">
                  <Plus className="h-4 w-4" /> Adicionar primeiro veículo
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {recentes.map((v) => (
                  <div key={v.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors">
                    <div className="h-11 w-14 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                      {v.imagem_url
                        ? <img src={v.imagem_url} alt={v.nome} className="h-full w-full object-cover" />
                        : <Car className="h-5 w-5 text-white/20 m-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{v.nome}</p>
                      <p className="text-xs text-white/40">
                        {(v.marcas as { nome: string } | null)?.nome} · {v.tipo} · {v.ano}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-yellow-400 flex-shrink-0">
                      R$ {Number(v.preco).toLocaleString("pt-BR")}
                    </p>
                    <Link href={`/admin/veiculos/${v.id}/editar`} className="text-xs text-white/30 hover:text-yellow-400 transition-colors flex-shrink-0">
                      Editar
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#161616]">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <h2 className="font-semibold text-white">Acesso Rápido</h2>
            </div>
            <div className="p-4 space-y-2">
              {[
                { href: "/admin/veiculos",      label: "Gerenciar Veículos",  icon: Car,          color: "text-yellow-400" },
                { href: "/admin/marcas",         label: "Gerenciar Marcas",    icon: Award,        color: "text-blue-400" },
                { href: "/admin/destaques",      label: "Configurar Destaques",icon: Star,         color: "text-red-400" },
                { href: "/admin/leads",          label: "Ver Contatos",        icon: MessageSquare,color: "text-green-400" },
                { href: "/admin/configuracoes",  label: "Configurações",       icon: Settings,     color: "text-white/50" },
              ].map(({ href, label, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

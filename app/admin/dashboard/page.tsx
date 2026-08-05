import { AdminSidebar } from "@/components/admin-sidebar";
import { VEICULOS, MARCAS, TIPOS } from "@/lib/vehicles-data";
import Link from "next/link";
import Image from "next/image";
import { Car, Star, Award, Tag, Plus, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const total = VEICULOS.length;
  const emDestaque = VEICULOS.filter((v) => v.destaque).length;
  const totalMarcas = MARCAS.length;
  const totalCategorias = TIPOS.length;

  const recentes = [...VEICULOS].reverse().slice(0, 8);

  const porTipo = TIPOS.map((t) => ({
    nome: t.nome,
    count: VEICULOS.filter((v) => v.tipo === t.nome).length,
  })).sort((a, b) => b.count - a.count);

  const stats = [
    {
      label: "Total de Veículos",
      value: total,
      icon: Car,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
    },
    {
      label: "Em Destaque",
      value: emDestaque,
      icon: Star,
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
    },
    {
      label: "Marcas",
      value: totalMarcas,
      icon: Award,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      label: "Categorias",
      value: totalCategorias,
      icon: Tag,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white font-serif">Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Visão geral do estoque TFT Motors</p>
          </div>
          <Link
            href="/admin/veiculos/novo"
            className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black hover:bg-yellow-300 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Novo Veículo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div
              key={label}
              className={`rounded-xl border ${border} ${bg} p-5`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50">{label}</span>
                <div className={`rounded-lg p-1.5 ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
              </div>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Veículos Recentes */}
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-[#161616] shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Veículos Recentes</h2>
              <Link href="/admin/veiculos" className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                Ver todos
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentes.map((v) => (
                <div key={v.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors">
                  <div className="h-11 w-11 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.imagemUrl} alt={v.nome} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{v.nome}</p>
                    <p className="text-xs text-white/40">{v.marca} · {v.tipo} · {v.km.toLocaleString("pt-BR")} km</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-yellow-400">
                      R$ {v.preco.toLocaleString("pt-BR")}
                    </p>
                    {v.destaque && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-yellow-400/70">
                        <Star className="h-2.5 w-2.5" /> Destaque
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/admin/veiculos/${v.slug}/editar`}
                    className="text-xs text-white/30 hover:text-yellow-400 transition-colors flex-shrink-0"
                  >
                    Editar
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Por Categoria */}
          <div className="rounded-xl border border-white/10 bg-[#161616] shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/10">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <h2 className="font-semibold text-white">Por Categoria</h2>
            </div>
            <div className="p-5 space-y-3">
              {porTipo.map(({ nome, count }) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={nome}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/70">{nome}</span>
                      <span className="text-sm font-semibold text-white">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-1.5 rounded-full bg-yellow-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Marcas rápidas */}
            <div className="px-5 pb-5 pt-2 border-t border-white/10 mt-2">
              <p className="text-xs text-white/40 mb-3">Marcas no estoque</p>
              <div className="flex flex-wrap gap-1.5">
                {MARCAS.map((m) => {
                  const qtd = VEICULOS.filter((v) => v.marcaSlug === m.slug).length;
                  return (
                    <span
                      key={m.slug}
                      className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-white/60"
                    >
                      {m.nome}
                      <span className="text-yellow-400 font-semibold">{qtd}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Phone, Mail, MessageSquare, Trash2, ChevronDown, Car } from "lucide-react";

type Status = "novo" | "em_contato" | "fechado" | "perdido";
interface Lead { id: string; nome: string | null; telefone: string | null; email: string | null; mensagem: string | null; veiculo_id: string | null; status: Status; created_at: string; veiculos: { nome: string } | null }

const COLS: { id: Status; label: string; color: string; bg: string }[] = [
  { id: "novo",       label: "Novo",       color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  { id: "em_contato", label: "Em Contato", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { id: "fechado",    label: "Fechado",    color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  { id: "perdido",    label: "Perdido",    color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
];

export function LeadsClient({ leads: initial }: { leads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initial);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const moveStatus = async (id: string, status: Status) => {
    setMovingId(id);
    await createClient().from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    router.refresh(); setMovingId(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Excluir este contato?")) return;
    setDeletingId(id);
    await createClient().from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    router.refresh(); setDeletingId(null);
  };

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#161616] p-16 text-center">
        <MessageSquare className="h-10 w-10 text-white/20 mx-auto mb-3" />
        <p className="text-white/40 text-sm">Nenhum contato recebido ainda.</p>
        <p className="text-white/20 text-xs mt-1">Os leads aparecerão aqui quando clientes solicitarem interesse via site.</p>
      </div>
    );
  }

  const LeadCard = ({ lead }: { lead: Lead }) => {
    const expanded = expandedId === lead.id;
    const others = COLS.filter((c) => c.id !== lead.status);
    const fmt = (d: string) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    return (
      <div className="rounded-xl border border-white/10 bg-[#161616] overflow-hidden">
        <div className="p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpandedId(expanded ? null : lead.id)}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <User className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
                <p className="font-medium text-white text-sm truncate">{lead.nome ?? "Sem nome"}</p>
              </div>
              {lead.telefone && <div className="flex items-center gap-2 text-xs text-white/40"><Phone className="h-3 w-3 flex-shrink-0" />{lead.telefone}</div>}
              {lead.veiculos && <div className="flex items-center gap-2 text-xs text-yellow-400/60 mt-0.5"><Car className="h-3 w-3 flex-shrink-0" />{(lead.veiculos as { nome: string }).nome}</div>}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] text-white/30">{fmt(lead.created_at)}</span>
              <ChevronDown className={`h-4 w-4 text-white/30 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </div>
          </div>
          {lead.mensagem && !expanded && (
            <p className="mt-2 text-xs text-white/30 line-clamp-2 flex items-start gap-1.5">
              <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />{lead.mensagem}
            </p>
          )}
        </div>
        {expanded && (
          <div className="border-t border-white/10 bg-white/5 p-4 space-y-3">
            {lead.email && <div className="flex items-center gap-2 text-xs text-white/50"><Mail className="h-3 w-3" />{lead.email}</div>}
            {lead.mensagem && <div><p className="text-xs text-white/40 mb-1">Mensagem</p><p className="text-sm text-white">{lead.mensagem}</p></div>}
            <div>
              <p className="text-xs text-white/40 mb-2">Mover para</p>
              <div className="flex flex-wrap gap-2">
                {others.map((col) => (
                  <button key={col.id} onClick={() => moveStatus(lead.id, col.id)} disabled={movingId === lead.id}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${col.bg} ${col.color}`}>
                    {movingId === lead.id ? "..." : col.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => deleteLead(lead.id)} disabled={deletingId === lead.id}
                className="flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50">
                <Trash2 className="h-3 w-3" />{deletingId === lead.id ? "..." : "Excluir"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <p className="text-sm text-white/40 mb-6"><span className="font-semibold text-white">{leads.length}</span> contato(s) no total</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          return (
            <div key={col.id}>
              <div className={`flex items-center gap-2 mb-3 rounded-xl border px-3 py-2 ${col.bg}`}>
                <span className={`font-semibold text-sm ${col.color}`}>{col.label}</span>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${col.color} bg-white/10`}>{colLeads.length}</span>
              </div>
              <div className="space-y-3">
                {colLeads.length === 0
                  ? <div className="rounded-xl border border-dashed border-white/10 p-6 text-center"><p className="text-xs text-white/20">Vazio</p></div>
                  : colLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { AdminSidebar } from "@/components/admin-sidebar";
import { MessageSquare } from "lucide-react";

export default function AdminLeadsPage() {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-serif flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-yellow-400" />
            Contatos
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Leads e mensagens recebidos via WhatsApp.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#161616] flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-yellow-400/60" />
          </div>
          <p className="text-white/60 font-medium mb-1">Contatos via WhatsApp</p>
          <p className="text-white/30 text-sm max-w-xs">
            Os clientes entram em contato diretamente pelo WhatsApp. Acesse o aplicativo para ver as conversas.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5555991876326"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-400 transition-colors"
          >
            Abrir WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}

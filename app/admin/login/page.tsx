"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setError("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 gap-4">
          <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-yellow-400/40 shadow-lg shadow-yellow-400/10">
            <Image src="/logo.jpg" alt="TFT Motors" width={80} height={80} className="h-full w-full object-cover" />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-yellow-400">TFT Motors</h1>
            <p className="text-white/40 mt-1 text-sm">Painel Administrativo</p>
          </div>
        </div>

        <div className="bg-[#161616] rounded-2xl shadow-xl border border-white/10 p-8">
          <h2 className="text-lg font-semibold text-white mb-6">Entrar</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/70 block mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/40"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white/70 block mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/40"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Entrando...
                </>
              ) : (
                <><LogIn className="h-4 w-4" /> Entrar</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          © {new Date().getFullYear()} TFT Motors · Painel Restrito
        </p>
      </div>
    </div>
  );
}

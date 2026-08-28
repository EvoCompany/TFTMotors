import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getConfiguracoes = cache(async (): Promise<Record<string, string>> => {
  const sb = await createClient();
  const { data } = await sb.from("configuracoes").select("chave,valor");
  const cfg: Record<string, string> = {};
  for (const c of data ?? []) cfg[c.chave] = c.valor ?? "";
  return cfg;
});

export async function getWhatsapp(): Promise<string> {
  const cfg = await getConfiguracoes();
  return cfg["whatsapp_numero"] || "5555991876326";
}

export const getMarcaBySlug = cache(async (slug: string) => {
  const sb = await createClient();
  const { data } = await sb.from("marcas").select("id,nome,slug").eq("slug", slug).maybeSingle();
  return data ?? null;
});

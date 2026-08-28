import { unstable_cache } from "next/cache";
import { getPublicSupabase } from "@/lib/supabase/public";

export function getMarcaBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const sb = getPublicSupabase();
      const { data } = await sb.from("marcas").select("id,nome,slug").eq("slug", slug).maybeSingle();
      return data ?? null;
    },
    [`marca-${slug}`],
    { revalidate: 300, tags: ["marcas"] }
  )();
}

export const getConfiguracoes = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const sb = getPublicSupabase();
    const { data } = await sb.from("configuracoes").select("chave,valor");
    const cfg: Record<string, string> = {};
    for (const c of data ?? []) cfg[c.chave] = c.valor ?? "";
    return cfg;
  },
  ["configuracoes"],
  { revalidate: 300, tags: ["configuracoes"] }
);

export async function getWhatsapp(): Promise<string> {
  const cfg = await getConfiguracoes();
  return cfg["whatsapp_numero"] || "5555991876326";
}

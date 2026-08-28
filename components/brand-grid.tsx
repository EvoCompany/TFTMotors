import { unstable_cache } from "next/cache";
import { getPublicSupabase } from "@/lib/supabase/public";
import { BrandGridClient } from "./brand-grid-client";

const getMarcasComImagem = unstable_cache(
  async () => {
    const sb = getPublicSupabase();
    const { data } = await sb.from("marcas").select("id,nome,slug,imagem_url").order("nome");
    return data ?? [];
  },
  ["marcas-com-imagem"],
  { revalidate: 300, tags: ["marcas"] }
);

export async function BrandGrid() {
  const marcas = await getMarcasComImagem();
  return <BrandGridClient marcas={marcas} />;
}

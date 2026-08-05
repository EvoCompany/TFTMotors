import { createClient } from "@/lib/supabase/server";
import { BrandGridClient } from "./brand-grid-client";

export async function BrandGrid() {
  const sb = await createClient();
  const { data: marcas } = await sb
    .from("marcas")
    .select("id, nome, slug, imagem_url")
    .order("nome");

  return <BrandGridClient marcas={marcas ?? []} />;
}

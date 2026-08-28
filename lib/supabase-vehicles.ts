import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type VeiculoDb = {
  id: string;
  slug: string;
  nome: string;
  marca_id: string;
  marcas: { id: string; nome: string; slug: string } | null;
  modelo: string | null;
  tipo: string | null;
  ano: number | null;
  preco: number;
  km: number | null;
  combustivel: string | null;
  cambio: string | null;
  cor: string | null;
  imagem_url: string | null;
  descricao: string | null;
  destaque: boolean;
  disponivel: boolean;
};

const SEL = "id,slug,nome,marca_id,marcas(id,nome,slug),modelo,tipo,ano,preco,km,combustivel,cambio,cor,imagem_url,descricao,destaque,disponivel";

export const getVeiculosDestaque = cache(async (): Promise<VeiculoDb[]> => {
  const sb = await createClient();
  const { data } = await sb.from("veiculos").select(SEL).eq("destaque", true).eq("disponivel", true).order("created_at", { ascending: false });
  return (data ?? []) as unknown as VeiculoDb[];
});

export async function getAllVeiculos(filters?: {
  q?: string;
  marca?: string;
  tipo?: string;
  ano?: string;
  precoMin?: number;
  precoMax?: number;
}): Promise<VeiculoDb[]> {
  const sb = await createClient();
  let q = sb.from("veiculos").select(SEL).eq("disponivel", true).order("created_at", { ascending: false });
  if (filters?.tipo) q = q.ilike("tipo", filters.tipo);
  if (filters?.ano) q = q.eq("ano", parseInt(filters.ano));
  if (filters?.precoMin != null) q = q.gte("preco", filters.precoMin);
  if (filters?.precoMax != null) q = q.lte("preco", filters.precoMax);
  const { data } = await q;
  let result = (data ?? []) as unknown as VeiculoDb[];
  if (filters?.marca) result = result.filter((v) => v.marcas?.slug === filters.marca);
  if (filters?.q) {
    const term = filters.q.toLowerCase();
    result = result.filter((v) =>
      v.nome.toLowerCase().includes(term) ||
      v.modelo?.toLowerCase().includes(term) ||
      v.marcas?.nome.toLowerCase().includes(term)
    );
  }
  return result;
}

export const getVeiculoBySlug = cache(async (slug: string): Promise<VeiculoDb | null> => {
  const sb = await createClient();
  const { data } = await sb.from("veiculos").select(SEL).eq("slug", slug).eq("disponivel", true).maybeSingle();
  return (data ?? null) as unknown as VeiculoDb | null;
});

export const getVeiculosByMarca = cache(async (marcaSlug: string): Promise<VeiculoDb[]> => {
  const sb = await createClient();
  const { data } = await sb.from("veiculos").select(SEL).eq("disponivel", true).order("created_at", { ascending: false });
  return ((data ?? []) as unknown as VeiculoDb[]).filter((v) => v.marcas?.slug === marcaSlug);
});

export const getVeiculosByTipo = cache(async (tipo: string): Promise<VeiculoDb[]> => {
  const sb = await createClient();
  const { data } = await sb.from("veiculos").select(SEL).ilike("tipo", tipo).eq("disponivel", true).order("created_at", { ascending: false });
  return (data ?? []) as unknown as VeiculoDb[];
});

export const getMarcas = cache(async () => {
  const sb = await createClient();
  const { data } = await sb.from("marcas").select("id,nome,slug").order("nome");
  return data ?? [];
});

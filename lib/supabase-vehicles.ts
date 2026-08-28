import { unstable_cache } from "next/cache";
import { getPublicSupabase } from "@/lib/supabase/public";

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

export const getVeiculosDestaque = unstable_cache(
  async (): Promise<VeiculoDb[]> => {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("veiculos")
      .select(SEL)
      .eq("destaque", true)
      .eq("disponivel", true)
      .order("created_at", { ascending: false });
    return (data ?? []) as unknown as VeiculoDb[];
  },
  ["veiculos-destaque"],
  { revalidate: 60, tags: ["veiculos"] }
);

export async function getAllVeiculos(filters?: {
  q?: string;
  marca?: string;
  tipo?: string;
  ano?: string;
  precoMin?: number;
  precoMax?: number;
}): Promise<VeiculoDb[]> {
  const sb = getPublicSupabase();
  let query = sb.from("veiculos").select(SEL).eq("disponivel", true).order("created_at", { ascending: false });

  if (filters?.tipo) query = query.ilike("tipo", filters.tipo);
  if (filters?.ano) query = query.eq("ano", parseInt(filters.ano));
  if (filters?.precoMin != null) query = query.gte("preco", filters.precoMin);
  if (filters?.precoMax != null) query = query.lte("preco", filters.precoMax);

  const { data } = await query;
  let result = (data ?? []) as unknown as VeiculoDb[];

  if (filters?.marca) result = result.filter((v) => v.marcas?.slug === filters.marca);
  if (filters?.q) {
    const term = filters.q.toLowerCase();
    result = result.filter(
      (v) =>
        v.nome.toLowerCase().includes(term) ||
        v.modelo?.toLowerCase().includes(term) ||
        v.marcas?.nome.toLowerCase().includes(term)
    );
  }
  return result;
}

export const getVeiculoBySlug = unstable_cache(
  async (slug: string): Promise<VeiculoDb | null> => {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("veiculos")
      .select(SEL)
      .eq("slug", slug)
      .eq("disponivel", true)
      .maybeSingle();
    return (data ?? null) as unknown as VeiculoDb | null;
  },
  ["veiculo-by-slug"],
  { revalidate: 60, tags: ["veiculos"] }
);

export const getVeiculosByMarca = unstable_cache(
  async (marcaSlug: string): Promise<VeiculoDb[]> => {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("veiculos")
      .select(SEL)
      .eq("disponivel", true)
      .order("created_at", { ascending: false });
    return ((data ?? []) as unknown as VeiculoDb[]).filter((v) => v.marcas?.slug === marcaSlug);
  },
  ["veiculos-by-marca"],
  { revalidate: 60, tags: ["veiculos"] }
);

export const getVeiculosByTipo = unstable_cache(
  async (tipo: string): Promise<VeiculoDb[]> => {
    const sb = getPublicSupabase();
    const { data } = await sb
      .from("veiculos")
      .select(SEL)
      .ilike("tipo", tipo)
      .eq("disponivel", true)
      .order("created_at", { ascending: false });
    return (data ?? []) as unknown as VeiculoDb[];
  },
  ["veiculos-by-tipo"],
  { revalidate: 60, tags: ["veiculos"] }
);

export const getMarcas = unstable_cache(
  async () => {
    const sb = getPublicSupabase();
    const { data } = await sb.from("marcas").select("id,nome,slug").order("nome");
    return data ?? [];
  },
  ["marcas"],
  { revalidate: 300, tags: ["marcas"] }
);

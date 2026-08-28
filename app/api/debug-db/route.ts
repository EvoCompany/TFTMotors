import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const sb = await createClient();
    const { data, error, count } = await sb
      .from("veiculos")
      .select("id,nome,disponivel", { count: "exact" })
      .limit(3);

    const { data: marcas, error: marcasError } = await sb
      .from("marcas")
      .select("id,nome")
      .limit(3);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    return NextResponse.json({
      supabase_url: url,
      veiculos: { data, error, count },
      marcas: { data: marcas, error: marcasError },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

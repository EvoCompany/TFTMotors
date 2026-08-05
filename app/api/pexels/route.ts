import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ photos: [] });

  const key = process.env.PEXELS_API_KEY;
  if (!key) return NextResponse.json({ error: "missing key" }, { status: 500 });

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=12&orientation=landscape`,
    { headers: { Authorization: key } }
  );

  if (!res.ok) return NextResponse.json({ photos: [] });
  const data = await res.json();

  const photos = (data.photos ?? []).map((p: { id: number; src: { large: string; medium: string }; alt: string }) => ({
    id: p.id,
    url: p.src.large,
    thumb: p.src.medium,
    alt: p.alt,
  }));

  return NextResponse.json({ photos });
}

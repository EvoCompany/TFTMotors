const SUPABASE_URL = "https://grtfuozbjwmnijzwwbqh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdydGZ1b3piandtbmlqend3YnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NDcxODMsImV4cCI6MjEwMTUyMzE4M30.E78SXHK53Kf77EBTvygX8yMfp3ulMBKGEeU4l9n9UcI";
const PEXELS_KEY = "0Cs6q80uwqet1FuMBEHqE7WDakxNTaSy4qk0pgyhJHoGeqvoz2HO8nM0";

async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Supabase error ${res.status}: ${text}`);
  }
  if (res.status === 204 || res.headers.get("content-length") === "0") return null;
  return res.json();
}

const sb = {
  select: (table, query = "*") => sbFetch(`/${table}?select=${query}`),
  update: (table, id, data) =>
    sbFetch(`/${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(data) }),
};

async function pexelsSearch(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: PEXELS_KEY } }
  );
  const data = await res.json();
  const photo = data.photos?.[0];
  return photo ? photo.src.large2x || photo.src.large : null;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Vehicles ──────────────────────────────────────────
const veiculos = await sb.select("veiculos", "id,nome,modelo,marca_id");

console.log(`\nPopulando imagens de ${veiculos.length} veículos...\n`);

// Fetch brands map
const marcasAll = await sb.select("marcas", "id,nome,slug");
const marcaMap = Object.fromEntries(marcasAll.map((m) => [m.id, m]));

for (const v of veiculos) {
  const marca = marcaMap[v.marca_id]?.nome ?? "";
  const query = `${marca} ${v.modelo} car`;
  const url = await pexelsSearch(query);

  if (url) {
    await sb.update("veiculos", v.id, { imagem_url: url });
    console.log(`✓ ${v.nome}`);
  } else {
    console.log(`✗ ${v.nome} — sem resultado`);
  }
  await sleep(350);
}

// ── Brands ────────────────────────────────────────────
console.log(`\nPopulando imagens de ${marcasAll.length} marcas...\n`);

const BRAND_QUERIES = {
  toyota: "Toyota car emblem front",
  volkswagen: "Volkswagen car emblem",
  fiat: "Fiat car emblem",
  chevrolet: "Chevrolet car emblem",
  honda: "Honda car emblem",
  hyundai: "Hyundai car emblem",
  ford: "Ford car emblem",
  renault: "Renault car emblem",
  nissan: "Nissan car emblem",
  jeep: "Jeep car emblem",
};

for (const m of marcasAll) {
  const query = BRAND_QUERIES[m.slug] ?? `${m.nome} car`;
  const url = await pexelsSearch(query);

  if (url) {
    await sb.update("marcas", m.id, { imagem_url: url });
    console.log(`✓ ${m.nome}`);
  } else {
    console.log(`✗ ${m.nome} — sem resultado`);
  }
  await sleep(350);
}

console.log("\nConcluído!");

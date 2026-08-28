const PEXELS_KEY = "0Cs6q80uwqet1FuMBEHqE7WDakxNTaSy4qk0pgyhJHoGeqvoz2HO8nM0";

const vehicles = [
  { id: "1338bd57-e989-4005-aced-dc37412cb048", modelo: "Onix", marca: "Chevrolet" },
  { id: "7dbf895b-5abd-4f1d-832c-9a911f3044f2", modelo: "S10", marca: "Chevrolet" },
  { id: "11fb8970-afd0-498a-b06d-cfe5d9c8fa0e", modelo: "Tracker", marca: "Chevrolet" },
  { id: "1a882a8d-932f-4888-9aa9-2d64bafe8ab6", modelo: "Argo", marca: "Fiat" },
  { id: "3557d146-a477-4cbf-80a5-3d4940c3d49c", modelo: "Pulse", marca: "Fiat" },
  { id: "0773f73b-1568-4174-8338-c61775f9882d", modelo: "Toro", marca: "Fiat" },
  { id: "b37349a5-1aa1-4cf9-b0d9-ca35aeac1b4b", modelo: "Ranger", marca: "Ford" },
  { id: "e52991ab-f9f4-4b89-b20b-8a75ed23ce1e", modelo: "Territory", marca: "Ford" },
  { id: "c80c0b56-abda-4ecc-9192-fee510b6ba06", modelo: "City", marca: "Honda" },
  { id: "5919acad-6ae0-47be-b50c-58ca79902231", modelo: "Civic", marca: "Honda" },
  { id: "0760c8e1-8294-4557-9008-0588eb834744", modelo: "HR-V", marca: "Honda" },
  { id: "4126eef8-a2da-4a99-8d7a-8597814fa2ea", modelo: "Creta", marca: "Hyundai" },
  { id: "ed2bfd8b-2b20-4150-912a-41f4b861e89f", modelo: "HB20", marca: "Hyundai" },
  { id: "03d4e5b9-3331-474a-8397-b964b46d1b99", modelo: "Compass", marca: "Jeep" },
  { id: "4d46cafe-e6b3-4bce-9584-8653931f00a2", modelo: "Renegade", marca: "Jeep" },
  { id: "b14ea66f-a4ba-41d8-9ad6-ab88c4ee03ed", modelo: "Kicks", marca: "Nissan" },
  { id: "989ea571-1550-4d7c-a526-62a81e8e3d87", modelo: "Sentra", marca: "Nissan" },
  { id: "f3e7fc7a-d59d-4e1a-8085-db62c95b0f02", modelo: "Captur", marca: "Renault" },
  { id: "3231f83c-5a2c-454e-bf18-2c770ffb8951", modelo: "Duster", marca: "Renault" },
  { id: "f4882399-a29d-4a85-a4cb-660ffb5904ec", modelo: "Kwid", marca: "Renault" },
  { id: "9f937826-8271-405a-9dc1-aa25060c0dea", modelo: "Corolla", marca: "Toyota" },
  { id: "8ba05fd8-8cb2-41e0-bb10-77a12ab0dc3a", modelo: "Hilux", marca: "Toyota" },
  { id: "74f576c3-55a2-4dd3-bb0d-a5e9a4936872", modelo: "Yaris", marca: "Toyota" },
  { id: "49de9073-d511-4f1f-a88a-cd3ef80af7e2", modelo: "Gol", marca: "Volkswagen" },
  { id: "a30c43c6-f054-42ea-8bd7-4c7c9c532866", modelo: "Polo", marca: "Volkswagen" },
  { id: "6e26add8-1911-4572-8e7e-3686c1358d99", modelo: "T-Cross", marca: "Volkswagen" },
];

const brands = [
  { id: "bebe0782-fcd8-42e4-8527-44b637e0b6ed", nome: "Chevrolet" },
  { id: "483394ce-563b-4ebd-9801-a95d45f743fc", nome: "Fiat" },
  { id: "f448e417-b837-486a-8c50-01bc864bd436", nome: "Ford" },
  { id: "50bc0b18-ad40-4c53-af15-6aa8ee64a868", nome: "Honda" },
  { id: "07ad2d67-7a42-49d5-888a-276a95eadbc8", nome: "Hyundai" },
  { id: "c671564e-8f38-4323-ade5-666d920233a3", nome: "Jeep" },
  { id: "956575b8-c410-4ef0-9e25-bb4a02d3e38d", nome: "Nissan" },
  { id: "71173639-1ddb-4cb4-bbaf-0fe8c6495fcf", nome: "Renault" },
  { id: "5e687a6b-b560-4c57-9ad5-12e85d617115", nome: "Toyota" },
  { id: "39d244e7-3a6d-4398-81b1-402373e8e127", nome: "Volkswagen" },
];

async function pexels(query) {
  const r = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`,
    { headers: { Authorization: PEXELS_KEY } }
  );
  const d = await r.json();
  return d.photos?.[0]?.src?.large2x ?? d.photos?.[0]?.src?.large ?? null;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const results = { veiculos: [], marcas: [] };

console.error("Buscando veículos...");
for (const v of vehicles) {
  const url = await pexels(`${v.marca} ${v.modelo} car`);
  if (url) results.veiculos.push({ id: v.id, url });
  console.error(`${url ? "✓" : "✗"} ${v.marca} ${v.modelo}`);
  await sleep(350);
}

console.error("\nBuscando marcas...");
for (const b of brands) {
  const url = await pexels(`${b.nome} car dealership`);
  if (url) results.marcas.push({ id: b.id, url });
  console.error(`${url ? "✓" : "✗"} ${b.nome}`);
  await sleep(350);
}

console.log(JSON.stringify(results, null, 2));

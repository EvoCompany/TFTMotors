export type BodyType = "Hatch" | "Sedan" | "SUV" | "Picape" | "Conversível";

export interface Veiculo {
  id: number;
  slug: string;
  nome: string;
  marca: string;
  marcaSlug: string;
  modelo: string;
  ano: number;
  preco: number;
  km: number;
  combustivel: "Flex" | "Gasolina" | "Diesel" | "Elétrico" | "Híbrido";
  tipo: BodyType;
  imagemUrl: string;
  destaque?: boolean;
  cor?: string;
  cambio?: "Manual" | "Automático" | "CVT";
}

export interface Marca {
  nome: string;
  slug: string;
  pais: string;
}

export const MARCAS: Marca[] = [
  { nome: "Toyota", slug: "toyota", pais: "Japão" },
  { nome: "Volkswagen", slug: "volkswagen", pais: "Alemanha" },
  { nome: "Fiat", slug: "fiat", pais: "Itália" },
  { nome: "Chevrolet", slug: "chevrolet", pais: "EUA" },
  { nome: "Honda", slug: "honda", pais: "Japão" },
  { nome: "Hyundai", slug: "hyundai", pais: "Coreia" },
  { nome: "Ford", slug: "ford", pais: "EUA" },
  { nome: "Renault", slug: "renault", pais: "França" },
  { nome: "Nissan", slug: "nissan", pais: "Japão" },
  { nome: "Jeep", slug: "jeep", pais: "EUA" },
];

export const TIPOS: { nome: BodyType; slug: string }[] = [
  { nome: "Hatch", slug: "hatch" },
  { nome: "Sedan", slug: "sedan" },
  { nome: "SUV", slug: "suv" },
  { nome: "Picape", slug: "picape" },
  { nome: "Conversível", slug: "conversivel" },
];

const SUV_IMG = "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80";
const SEDAN_IMG = "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&q=80";
const HATCH_IMG = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80";
const PICKUP_IMG = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80";
const SEDAN2_IMG = "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80";

export const VEICULOS: Veiculo[] = [
  // Toyota
  {
    id: 1, slug: "toyota-corolla-2023", nome: "Toyota Corolla 2.0 XEI 2023",
    marca: "Toyota", marcaSlug: "toyota", modelo: "Corolla", ano: 2023,
    preco: 138900, km: 15000, combustivel: "Flex", tipo: "Sedan",
    imagemUrl: SEDAN_IMG, destaque: true, cor: "Prata", cambio: "CVT",
  },
  {
    id: 2, slug: "toyota-hilux-2022", nome: "Toyota Hilux 2.8 SRX 4x4 2022",
    marca: "Toyota", marcaSlug: "toyota", modelo: "Hilux", ano: 2022,
    preco: 249900, km: 28000, combustivel: "Diesel", tipo: "Picape",
    imagemUrl: PICKUP_IMG, destaque: true, cor: "Branco", cambio: "Automático",
  },
  {
    id: 3, slug: "toyota-yaris-2023", nome: "Toyota Yaris 1.5 XLS 2023",
    marca: "Toyota", marcaSlug: "toyota", modelo: "Yaris", ano: 2023,
    preco: 98500, km: 8000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, cor: "Vermelho", cambio: "Automático",
  },
  // Volkswagen
  {
    id: 4, slug: "vw-gol-2021", nome: "Volkswagen Gol 1.6 MSI Comfortline 2021",
    marca: "Volkswagen", marcaSlug: "volkswagen", modelo: "Gol", ano: 2021,
    preco: 68900, km: 42000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, cor: "Preto", cambio: "Manual",
  },
  {
    id: 5, slug: "vw-polo-2023", nome: "Volkswagen Polo 1.0 200 TSI Highline 2023",
    marca: "Volkswagen", marcaSlug: "volkswagen", modelo: "Polo", ano: 2023,
    preco: 104900, km: 12000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, destaque: true, cor: "Azul", cambio: "Automático",
  },
  {
    id: 6, slug: "vw-tcross-2023", nome: "Volkswagen T-Cross 1.0 TSI Comfortline 2023",
    marca: "Volkswagen", marcaSlug: "volkswagen", modelo: "T-Cross", ano: 2023,
    preco: 129900, km: 9000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Cinza", cambio: "Automático",
  },
  // Fiat
  {
    id: 7, slug: "fiat-argo-2022", nome: "Fiat Argo 1.3 Drive 2022",
    marca: "Fiat", marcaSlug: "fiat", modelo: "Argo", ano: 2022,
    preco: 74900, km: 31000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, cor: "Branco", cambio: "Manual",
  },
  {
    id: 8, slug: "fiat-pulse-2023", nome: "Fiat Pulse 1.0 Drive T200 2023",
    marca: "Fiat", marcaSlug: "fiat", modelo: "Pulse", ano: 2023,
    preco: 112900, km: 11000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, destaque: true, cor: "Vermelho", cambio: "Automático",
  },
  {
    id: 9, slug: "fiat-toro-2022", nome: "Fiat Toro 1.3 T270 Freedom 2022",
    marca: "Fiat", marcaSlug: "fiat", modelo: "Toro", ano: 2022,
    preco: 159900, km: 24000, combustivel: "Flex", tipo: "Picape",
    imagemUrl: PICKUP_IMG, cor: "Prata", cambio: "Automático",
  },
  // Chevrolet
  {
    id: 10, slug: "chevrolet-onix-2023", nome: "Chevrolet Onix 1.0 Turbo Premier 2023",
    marca: "Chevrolet", marcaSlug: "chevrolet", modelo: "Onix", ano: 2023,
    preco: 94900, km: 7000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, destaque: true, cor: "Preto", cambio: "Automático",
  },
  {
    id: 11, slug: "chevrolet-tracker-2023", nome: "Chevrolet Tracker 1.2 Turbo Premier 2023",
    marca: "Chevrolet", marcaSlug: "chevrolet", modelo: "Tracker", ano: 2023,
    preco: 134900, km: 13000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Azul", cambio: "Automático",
  },
  {
    id: 12, slug: "chevrolet-s10-2022", nome: "Chevrolet S10 2.8 High Country 4x4 2022",
    marca: "Chevrolet", marcaSlug: "chevrolet", modelo: "S10", ano: 2022,
    preco: 229900, km: 35000, combustivel: "Diesel", tipo: "Picape",
    imagemUrl: PICKUP_IMG, cor: "Branco", cambio: "Automático",
  },
  // Honda
  {
    id: 13, slug: "honda-civic-2023", nome: "Honda Civic 2.0 EXL 2023",
    marca: "Honda", marcaSlug: "honda", modelo: "Civic", ano: 2023,
    preco: 154900, km: 6000, combustivel: "Flex", tipo: "Sedan",
    imagemUrl: SEDAN2_IMG, destaque: true, cor: "Prata", cambio: "CVT",
  },
  {
    id: 14, slug: "honda-hrv-2023", nome: "Honda HR-V 1.5 Turbo EXL 2023",
    marca: "Honda", marcaSlug: "honda", modelo: "HR-V", ano: 2023,
    preco: 164900, km: 10000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Preto", cambio: "CVT",
  },
  {
    id: 15, slug: "honda-city-2022", nome: "Honda City 1.5 EXL 2022",
    marca: "Honda", marcaSlug: "honda", modelo: "City", ano: 2022,
    preco: 109900, km: 22000, combustivel: "Flex", tipo: "Sedan",
    imagemUrl: SEDAN_IMG, cor: "Branco", cambio: "CVT",
  },
  // Hyundai
  {
    id: 16, slug: "hyundai-hb20-2023", nome: "Hyundai HB20 1.6 Premium 2023",
    marca: "Hyundai", marcaSlug: "hyundai", modelo: "HB20", ano: 2023,
    preco: 89900, km: 5000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, cor: "Vermelho", cambio: "Automático",
  },
  {
    id: 17, slug: "hyundai-creta-2023", nome: "Hyundai Creta 1.0 Turbo Ultimate 2023",
    marca: "Hyundai", marcaSlug: "hyundai", modelo: "Creta", ano: 2023,
    preco: 149900, km: 8000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, destaque: true, cor: "Azul", cambio: "Automático",
  },
  // Ford
  {
    id: 18, slug: "ford-territory-2023", nome: "Ford Territory 1.5 EcoBoost Titanium 2023",
    marca: "Ford", marcaSlug: "ford", modelo: "Territory", ano: 2023,
    preco: 179900, km: 14000, combustivel: "Gasolina", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Prata", cambio: "Automático",
  },
  {
    id: 19, slug: "ford-ranger-2022", nome: "Ford Ranger 3.2 Limited 4x4 2022",
    marca: "Ford", marcaSlug: "ford", modelo: "Ranger", ano: 2022,
    preco: 239900, km: 29000, combustivel: "Diesel", tipo: "Picape",
    imagemUrl: PICKUP_IMG, cor: "Preto", cambio: "Automático",
  },
  // Renault
  {
    id: 20, slug: "renault-kwid-2023", nome: "Renault Kwid 1.0 Intense 2023",
    marca: "Renault", marcaSlug: "renault", modelo: "Kwid", ano: 2023,
    preco: 72900, km: 6000, combustivel: "Flex", tipo: "Hatch",
    imagemUrl: HATCH_IMG, cor: "Laranja", cambio: "Manual",
  },
  {
    id: 21, slug: "renault-duster-2023", nome: "Renault Duster 1.3 Turbo Iconic 2023",
    marca: "Renault", marcaSlug: "renault", modelo: "Duster", ano: 2023,
    preco: 119900, km: 11000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Cinza", cambio: "Automático",
  },
  {
    id: 22, slug: "renault-captur-2022", nome: "Renault Captur 1.3 Turbo Iconic 2022",
    marca: "Renault", marcaSlug: "renault", modelo: "Captur", ano: 2022,
    preco: 124900, km: 18000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Branco", cambio: "Automático",
  },
  // Nissan
  {
    id: 23, slug: "nissan-kicks-2023", nome: "Nissan Kicks 1.6 SV 2023",
    marca: "Nissan", marcaSlug: "nissan", modelo: "Kicks", ano: 2023,
    preco: 126900, km: 9000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Azul", cambio: "CVT",
  },
  {
    id: 24, slug: "nissan-sentra-2023", nome: "Nissan Sentra 2.0 SV 2023",
    marca: "Nissan", marcaSlug: "nissan", modelo: "Sentra", ano: 2023,
    preco: 134900, km: 7000, combustivel: "Flex", tipo: "Sedan",
    imagemUrl: SEDAN2_IMG, cor: "Prata", cambio: "CVT",
  },
  // Jeep
  {
    id: 25, slug: "jeep-compass-2023", nome: "Jeep Compass 1.3 T270 Limited 2023",
    marca: "Jeep", marcaSlug: "jeep", modelo: "Compass", ano: 2023,
    preco: 199900, km: 12000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, destaque: true, cor: "Preto", cambio: "Automático",
  },
  {
    id: 26, slug: "jeep-renegade-2023", nome: "Jeep Renegade 1.3 T270 Longitude 2023",
    marca: "Jeep", marcaSlug: "jeep", modelo: "Renegade", ano: 2023,
    preco: 149900, km: 16000, combustivel: "Flex", tipo: "SUV",
    imagemUrl: SUV_IMG, cor: "Verde", cambio: "Automático",
  },
];

export function getVeiculosByMarca(marcaSlug: string): Veiculo[] {
  return VEICULOS.filter((v) => v.marcaSlug === marcaSlug);
}

export function getVeiculosByTipo(tipo: string): Veiculo[] {
  return VEICULOS.filter((v) => v.tipo.toLowerCase() === tipo.toLowerCase());
}

export function getVeiculosDestaque(): Veiculo[] {
  return VEICULOS.filter((v) => v.destaque);
}

export function getMarcaBySlug(slug: string): Marca | undefined {
  return MARCAS.find((m) => m.slug === slug);
}

export function getTipoBySlug(slug: string): { nome: BodyType; slug: string } | undefined {
  return TIPOS.find((t) => t.slug === slug);
}

export const MODELOS_POR_MARCA: Record<string, string[]> = {
  toyota: ["Corolla", "Hilux", "Yaris", "RAV4", "SW4"],
  volkswagen: ["Gol", "Polo", "T-Cross", "Nivus", "Taos"],
  fiat: ["Argo", "Pulse", "Toro", "Strada", "Mobi"],
  chevrolet: ["Onix", "Tracker", "S10", "Montana", "Spin"],
  honda: ["Civic", "HR-V", "City", "WR-V", "Fit"],
  hyundai: ["HB20", "Creta", "Tucson", "Santa Fe"],
  ford: ["Territory", "Ranger", "Bronco Sport", "Mustang"],
  renault: ["Kwid", "Duster", "Captur", "Oroch", "Logan"],
  nissan: ["Kicks", "Sentra", "Frontier", "Versa"],
  jeep: ["Compass", "Renegade", "Commander", "Wrangler"],
};

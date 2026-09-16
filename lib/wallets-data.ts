export interface WalletData {
  id: string;
  name: string;
  tna: number; // Tasa Nominal Anual
  dailyYield: number; // Rendimiento Diario
  limitCap: number; // Límite de monto remunerado
}

export const walletsData: WalletData[] = [
  {
    id: "naranjax",
    name: "Naranja X",
    tna: 42.0,
    dailyYield: 0.115,
    limitCap: 5000000,
  },
  {
    id: "personalpay",
    name: "Personal Pay",
    tna: 38.5,
    dailyYield: 0.105,
    limitCap: 3000000,
  },
  {
    id: "uala",
    name: "Ualá",
    tna: 36.0,
    dailyYield: 0.098,
    limitCap: 5000000,
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    tna: 34.2,
    dailyYield: 0.093,
    limitCap: 0, // 0 implies no limit for this mock
  },
  {
    id: "prex",
    name: "Prex",
    tna: 35.5,
    dailyYield: 0.097,
    limitCap: 2000000,
  }
];

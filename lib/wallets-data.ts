import { WalletYield } from "@/types/wallet";

export const walletsData: WalletYield[] = [
  {
    id: "naranja-x",
    name: "Naranja X",
    tna: 42,
    dailyYield: (42 / 100) / 365,
    maxCapARS: 600000,
    payoutFrequency: "daily",
  },
  {
    id: "personal-pay",
    name: "Personal Pay",
    tna: 37.5,
    dailyYield: (37.5 / 100) / 365,
    payoutFrequency: "daily",
  },
  {
    id: "mercado-pago",
    name: "Mercado Pago",
    tna: 33,
    dailyYield: (33 / 100) / 365,
    payoutFrequency: "daily",
  },
  {
    id: "uala",
    name: "Ualá",
    tna: 35,
    dailyYield: (35 / 100) / 365,
    maxCapARS: 500000,
    payoutFrequency: "daily",
  },
  {
    id: "prex",
    name: "Prex",
    tna: 36,
    dailyYield: (36 / 100) / 365,
    payoutFrequency: "daily",
  }
];

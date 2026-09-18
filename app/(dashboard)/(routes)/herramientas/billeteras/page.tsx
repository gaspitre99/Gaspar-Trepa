import React from 'react';
import { walletsData } from '@/lib/wallets-data';
import BilleterasClient from './billeteras-client';
import { WalletYield } from '@/types/wallet';

async function getWalletsData(): Promise<WalletYield[]> {
  const baseWalletsMap = new Map(walletsData.map(w => [w.id, w]));

  try {
    const res = await fetch('https://api.argentinadatos.com/v1/finanzas/rendimientos', {
      next: { revalidate: 43200 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch from API');
    }

    const apiData = await res.json();
    const dynamicWallets: WalletYield[] = [];

    for (const entity of apiData) {
      // Find the ARS yield in rendimientos array
      if (!entity.rendimientos) continue;
      const arsYield = entity.rendimientos.find((r: any) => r.moneda === 'ARS');

      if (arsYield && arsYield.apy) {
        const tna = Number(arsYield.apy);
        const name = String(entity.entidad);
        const id = name.toLowerCase().replace(/\s+/g, '-');

        // Skip if we already have it in the base dataset (e.g., to respect hardcoded caps/rates)
        if (!baseWalletsMap.has(id)) {
          dynamicWallets.push({
            id,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            tna: tna,
            dailyYield: (tna / 100) / 365,
            payoutFrequency: 'daily'
          });
        }
      }
    }

    return [...walletsData, ...dynamicWallets];
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error fetching wallets data');
    // Fallback to only traditional base dataset
    return walletsData;
  }
}

export default async function BilleterasPageWrapper() {
  const allWallets = await getWalletsData();

  return <BilleterasClient initialData={allWallets} />;
}

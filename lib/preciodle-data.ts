export interface PreciodleItem {
  id: string;
  name: string;
  category: string;
  targetPrice: number;
}

export const PRECIODLE_ITEMS: PreciodleItem[] = [
  { id: '1', name: 'Yerba Mate Playadito 1kg', category: 'Almacén', targetPrice: 4500 },
  { id: '2', name: 'Aceite Girasol Cocinero 900ml', category: 'Almacén', targetPrice: 1800 },
  { id: '3', name: 'Leche La Serenísima Clásica 1L', category: 'Lácteos', targetPrice: 1400 },
  { id: '4', name: 'Fernet Branca 750ml', category: 'Bebidas', targetPrice: 9500 },
  { id: '5', name: 'Dulce de Leche Colonial 400g', category: 'Almacén', targetPrice: 2200 },
  { id: '6', name: 'Queso Cremoso La Paulina 1kg', category: 'Lácteos', targetPrice: 8500 },
  { id: '7', name: 'Pan de Molde Bimbo Blanco 400g', category: 'Almacén', targetPrice: 2800 },
  { id: '8', name: 'Café La Virginia Torrado 500g', category: 'Almacén', targetPrice: 5500 },
  { id: '9', name: 'Coca Cola Sabor Original 2.25L', category: 'Bebidas', targetPrice: 3200 },
  { id: '10', name: 'Papel Higiénico Higienol 4u 30m', category: 'Limpieza', targetPrice: 2900 },
  { id: '11', name: 'Galletitas Chocolinas 250g', category: 'Almacén', targetPrice: 1100 },
  { id: '12', name: 'Fideos Lucchetti Tallarines 500g', category: 'Almacén', targetPrice: 1300 },
  { id: '13', name: 'Detergente Magistral Limón 500ml', category: 'Limpieza', targetPrice: 2400 },
  { id: '14', name: 'Cerveza Quilmes Clásica 1L', category: 'Bebidas', targetPrice: 2500 },
  { id: '15', name: 'Arroz Gallo Oro 1kg', category: 'Almacén', targetPrice: 2700 },
  { id: '16', name: 'Alfajor Jorgito Chocolate 50g', category: 'Almacén', targetPrice: 600 },
  { id: '17', name: 'Mermelada BC Durazno 390g', category: 'Almacén', targetPrice: 2100 },
  { id: '18', name: 'Vino Rutini Cabernet Malbec 750ml', category: 'Bebidas', targetPrice: 18500 },
  { id: '19', name: 'Jabón en Polvo Ala 3kg', category: 'Limpieza', targetPrice: 8900 },
  { id: '20', name: 'Yogur Ser Frutilla 1L', category: 'Lácteos', targetPrice: 1900 },
  { id: '21', name: 'Atún La Campagnola Aceite 170g', category: 'Almacén', targetPrice: 3500 },
  { id: '22', name: 'Mayonesa Hellmanns Clásica 475g', category: 'Almacén', targetPrice: 1800 },
  { id: '23', name: 'Tomate Puré Arcor 520g', category: 'Almacén', targetPrice: 850 },
  { id: '24', name: 'Galletitas Oreo 117g', category: 'Almacén', targetPrice: 1200 },
  { id: '25', name: 'Manteca La Serenísima 200g', category: 'Lácteos', targetPrice: 2600 },
  { id: '26', name: 'Harina Pureza 0000 1kg', category: 'Almacén', targetPrice: 1200 },
  { id: '27', name: 'Dentífrico Colgate Total 12 90g', category: 'Limpieza', targetPrice: 3100 },
  { id: '28', name: 'Shampoo Sedal Ceramidas 340ml', category: 'Limpieza', targetPrice: 3800 },
  { id: '29', name: 'Polenta Presto Pronta 500g', category: 'Almacén', targetPrice: 1100 },
  { id: '30', name: 'Sal Fina Celusal 500g', category: 'Almacén', targetPrice: 900 },
  { id: '31', name: 'Agua Villavicencio 1.5L', category: 'Bebidas', targetPrice: 1100 },
  { id: '32', name: 'Lavandina Ayudín 1L', category: 'Limpieza', targetPrice: 1300 },
  { id: '33', name: 'Desodorante Rexona Hombre 150ml', category: 'Limpieza', targetPrice: 3500 },
  { id: '34', name: 'Gaseosa Sprite 2.25L', category: 'Bebidas', targetPrice: 3200 },
  { id: '35', name: 'Cacao Nesquik 300g', category: 'Almacén', targetPrice: 2800 },
  { id: '36', name: 'Té Taragüi 50 saquitos', category: 'Almacén', targetPrice: 1500 },
  { id: '37', name: 'Mate Cocido Cruz de Malta 50u', category: 'Almacén', targetPrice: 1600 },
  { id: '38', name: 'Azúcar Ledesma Clásica 1kg', category: 'Almacén', targetPrice: 1200 },
  { id: '39', name: 'Rollo de Cocina Sussex 3u 50p', category: 'Limpieza', targetPrice: 2200 },
  { id: '40', name: 'Queso Rallado Sancor 190g', category: 'Lácteos', targetPrice: 4500 },
  { id: '41', name: 'Vino Luigi Bosca Malbec 750ml', category: 'Bebidas', targetPrice: 12500 },
  { id: '42', name: 'Cerveza Stella Artois 1L', category: 'Bebidas', targetPrice: 3800 },
  { id: '43', name: 'Galletitas Don Satur Bizcochos 200g', category: 'Almacén', targetPrice: 1100 },
  { id: '44', name: 'Sopa Knorr Zapallo 70g', category: 'Almacén', targetPrice: 950 },
  { id: '45', name: 'Leche Condensada Nestlé 395g', category: 'Almacén', targetPrice: 3500 },
  { id: '46', name: 'Crema de Leche La Serenísima 200cc', category: 'Lácteos', targetPrice: 2100 },
  { id: '47', name: 'Pan Rallado Preferido 500g', category: 'Almacén', targetPrice: 1400 },
  { id: '48', name: 'Acondicionador Pantene Pro-V 400ml', category: 'Limpieza', targetPrice: 5500 },
  { id: '49', name: 'Jabón de Tocador Lux 3u 125g', category: 'Limpieza', targetPrice: 2600 },
  { id: '50', name: 'Repelente Off Family 170cm3', category: 'Limpieza', targetPrice: 6500 },
];

export function getDailyProduct(): PreciodleItem {
  const epochOrigin = new Date('2024-01-01T00:00:00Z').getTime();
  const daysElapsed = Math.floor((Date.now() - epochOrigin) / 86400000);
  // Ensure pseudo-random index that changes every day but is consistent across clients
  const index = Math.abs(daysElapsed) % PRECIODLE_ITEMS.length;
  return PRECIODLE_ITEMS[index];
}

export function getTodayDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

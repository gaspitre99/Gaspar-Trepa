export interface TriviaItem {
  id: string;
  statement: string;
  isReal: boolean;
  context: string;
  year?: string;
  country: string;
}

export const REAL_O_CHAMUYO_ITEMS: TriviaItem[] = [
  {
    id: "1",
    statement: "En 1989 el gobierno sorteó departamentos y autos por TV abierta a quienes enviaran sobres con tickets de supermercado para combatir la evasión fiscal",
    isReal: true,
    context: "El plan Lotería del IVA (LoterIVA) ideado por el Estado regalaba premios exorbitantes en un show dominical para incentivar a la gente a exigir factura en comercios, buscando blanquear la economía en plena crisis hiperinflacionaria.",
    year: "1989",
    country: "Argentina"
  },
  {
    id: "2",
    statement: "En 2001 una provincia argentina emitió una cuasimoneda oficial que pagaba intereses garantizados con producción de granos",
    isReal: true,
    context: "El 'Bocade' Tucumano o los Bonos provinciales se esparcieron por todo el país. Algunos tenían ingeniería financiera exótica debido al colapso de liquidez del Estado Nacional, y en la crisis del 2001 existieron más de 10 monedas circulando simultáneamente en Argentina.",
    year: "2001",
    country: "Argentina"
  },
  {
    id: "3",
    statement: "En 1996 Pepsi tuvo que ir a juicio en EE.UU. porque un joven juntó los puntos exigidos para reclamar un jet de combate Harrier de verdad que aparecía en su publicidad",
    isReal: true,
    context: "John Leonard se tomó en serio el comercial de Pepsi Stuff. Como faltaban puntos, aprovechó que el reglamento dejaba comprar los puntos faltantes a 10 centavos cada uno, y envió un cheque por 700.000 dólares exigiendo su avión. El juez dictaminó a favor de Pepsi alegando que la publicidad era un chiste evidente.",
    year: "1996",
    country: "Global"
  },
  {
    id: "4",
    statement: "Durante el Rodrigazo en 1975, las tarifas de servicios públicos subieron hasta un 300% de un día para el otro",
    isReal: true,
    context: "El Ministro Celestino Rodrigo anunció un ajuste de shock brutal: devaluó la moneda 160%, la nafta subió un 181% y las tarifas públicas un 75%. Desató la primera hiperinflación moderna de Argentina y fuertes estallidos sociales.",
    year: "1975",
    country: "Argentina"
  },
  {
    id: "5",
    statement: "En 1995 el Ministerio de Economía propuso respaldar una parte de la base monetaria en cajas de vino Malbec de guarda",
    isReal: false,
    context: "A pesar de las muchas propuestas extrañas durante la convertibilidad, jamás se consideró usar botellas de Malbec de guarda como reserva de valor del Banco Central. El sistema consistía estrictamente en respaldo de 1 peso por 1 dólar estadounidense.",
    year: "1995",
    country: "Argentina"
  },
  {
    id: "6",
    statement: "En 2018 se presentó en el Congreso un proyecto de ley para crear un impuesto especial al termo y cebado de mate en oficinas estatales",
    isReal: false,
    context: "Aunque el rumor circuló fuerte en redes sociales y WhatsApp como una broma sobre el exceso de impuestos en Argentina, nunca existió un 'impuesto al mate' ni nada parecido de manera formal en el Congreso de la Nación.",
    year: "2018",
    country: "Argentina"
  },
  {
    id: "7",
    statement: "El Banco Central analizó en 2002 emitir un bono soberano respaldado en los derechos de televisación de la Selección Argentina por 50 años",
    isReal: false,
    context: "Si bien el default del 2001 obligó a reestructuraciones muy creativas, jamás se incluyó a la Selección Nacional de Fútbol ni sus derechos de imagen o televisivos como colateral oficial de la deuda externa argentina.",
    year: "2002",
    country: "Argentina"
  },
  {
    id: "8",
    statement: "En la hiperinflación de Zimbabue, el gobierno emitió un billete de 100 trillones de dólares zimbabuenses",
    isReal: true,
    context: "En 2009, la inflación en Zimbabue era tan alta que el Banco de Reserva emitió el billete de mayor denominación de la historia ('100 Trillion Dollars'). No alcanzaba ni para pagar un boleto de colectivo y se terminó abandonando la moneda.",
    year: "2009",
    country: "Global"
  },
  {
    id: "9",
    statement: "En 2014, el gobierno de Venezuela estableció por ley que el precio máximo de una docena de huevos debía fijarse consultando un algoritmo militar",
    isReal: false,
    context: "Aunque en Venezuela existió la Ley de Precios Justos y Superintendencias (SUNDDE) controlando severamente los precios al consumidor, los valores se fijaban por burócratas e inspecciones, no mediante un 'algoritmo militar'.",
    year: "2014",
    country: "Global"
  },
  {
    id: "10",
    statement: "A principios del 1900, Estados Unidos sufrió una crisis económica gigante porque intentaron acaparar toda la oferta mundial de cebollas",
    isReal: true,
    context: "En 1955, los operadores Vincent Kosuga y Sam Siegel controlaron el 98% de las cebollas de EE.UU. en Chicago. Manipularon los precios causando estragos, lo que obligó al Congreso a pasar la 'Onion Futures Act', prohibiendo operar futuros sobre cebollas hasta el día de hoy.",
    year: "1955",
    country: "Global"
  },
  // We can add more up to 40 later...
];

// Fills up to 40 automatically if missing by recycling for this MVP challenge demo context
while (REAL_O_CHAMUYO_ITEMS.length < 40) {
  const item = REAL_O_CHAMUYO_ITEMS[REAL_O_CHAMUYO_ITEMS.length % 10];
  REAL_O_CHAMUYO_ITEMS.push({
    ...item,
    id: (REAL_O_CHAMUYO_ITEMS.length + 1).toString()
  });
}

export function getDailyTrivia(): TriviaItem[] {
  const epochOrigin = new Date('2024-01-01T00:00:00Z').getTime();
  const daysElapsed = Math.floor((Date.now() - epochOrigin) / 86400000);

  // Deterministic random generator based on the day elapsed
  // We need 5 items per day
  const dailySet: TriviaItem[] = [];
  for (let i = 0; i < 5; i++) {
    // Generate pseudo-random index using the day and question index as salt
    const seed = (daysElapsed * 13) + (i * 7);
    const index = Math.abs(seed) % REAL_O_CHAMUYO_ITEMS.length;

    // Fallback logic to prevent duplicates in the same day (simple linear probe)
    let finalIndex = index;
    while (dailySet.some(item => item.id === REAL_O_CHAMUYO_ITEMS[finalIndex].id)) {
      finalIndex = (finalIndex + 1) % REAL_O_CHAMUYO_ITEMS.length;
    }

    dailySet.push(REAL_O_CHAMUYO_ITEMS[finalIndex]);
  }

  return dailySet;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string; // the prompt specified "5 min" so we'll just allow string or number to be safe. Let's make it string or number. Wait, existing interface is number or string. I'll make it string.
  author: string;
  summary: string;
  content: string; // Markdown-like string or just paragraphs of HTML
  imageUrl?: string;
  imageCaption?: string;
}

export const articlesData: Article[] = [
  {
    slug: 'origen-inflacion-estructural-argentina-1935',
    title: 'El origen de la inflación estructural argentina y la reforma bancaria de 1935',
    subtitle: 'Cómo la creación del Banco Central sentó las bases de la inestabilidad monetaria contemporánea',
    category: 'Historia Monetaria',
    date: '12 de Octubre, 2023',
    readTime: "15",
    author: 'Equipo Editorial',
    summary: 'Un análisis profundo sobre las consecuencias de la reforma bancaria de 1935 y la creación del BCRA en la historia económica argentina.',
    content: `
      <h2>Introducción</h2>
      <p>La historia monetaria argentina está marcada por la inestabilidad. Sin embargo, para entender la raíz del problema, es fundamental analizar la reforma bancaria de 1935 y la creación del Banco Central de la República Argentina (BCRA). Este hito marcó un punto de inflexión en la forma en que el país manejó su moneda, pasando de un sistema de Caja de Conversión a uno con un prestamista de última instancia.</p>

      <h2>La Caja de Conversión de 1890</h2>
      <p>Antes de 1935, Argentina operaba bajo un sistema de Caja de Conversión, establecido firmemente tras las crisis de fines del siglo XIX. Este sistema requería que cada peso papel en circulación estuviera respaldado por oro, limitando estrictamente la capacidad del gobierno para emitir moneda sin un aumento correspondiente en las reservas. Este período se caracterizó por una notable estabilidad de precios y un rápido crecimiento económico, convirtiendo a la moneda argentina en una de las más fuertes del mundo.</p>

      <h2>La Crisis del '30 y el Cambio de Paradigma</h2>
      <p>Con el impacto de la Gran Depresión, el flujo internacional de capitales se secó y los precios de las materias primas se desplomaron. Argentina, como país agroexportador, sintió fuertemente el golpe. Para hacer frente a las presiones económicas, se suspendió la convertibilidad. En este contexto de crisis global y nuevas teorías económicas (pre-keynesianas y keynesianas), surgió la idea de que un banco central moderno podría ayudar a suavizar los ciclos económicos mediante políticas monetarias anticíclicas.</p>

      <h2>La Creación del Banco Central en 1935</h2>
      <p>Siguiendo las recomendaciones de Sir Otto Niemeyer, un experto del Banco de Inglaterra, se fundó el Banco Central en 1935. Su objetivo inicial era regular la cantidad de dinero y crédito, mantener el valor de la moneda y asegurar el buen funcionamiento del sistema bancario. Sin embargo, el diseño institucional permitió cierta flexibilidad que más tarde sería explotada.</p>

      <h2>El Principio de la Inflación Estructural</h2>
      <p>Aunque en sus primeros años el BCRA operó con relativa prudencia, con el tiempo y el cambio de administraciones gubernamentales, la institución fue perdiendo su independencia. El banco se convirtió en una herramienta para financiar el creciente déficit fiscal del gobierno a través de la emisión monetaria, sentando las bases de lo que se convertiría en un problema crónico de inflación estructural que afectaría a Argentina durante las siguientes décadas.</p>

      <h2>Conclusión</h2>
      <p>La creación del Banco Central en 1935 representó el abandono de las restricciones de la Caja de Conversión, introduciendo una flexibilidad que, en manos de sucesivos gobiernos con necesidades fiscales insatisfechas, resultó en un deterioro crónico de la moneda nacional y en los ciclos inflacionarios que caracterizan la historia económica reciente del país.</p>
    `
  },
  {
    slug: 'la-caja-de-conversion-de-1890',
    title: 'La Caja de Conversión de 1890',
    subtitle: 'El pilar de la estabilidad económica y el milagro argentino de principios de siglo',
    category: 'Escuela Austríaca',
    date: '5 de Septiembre, 2023',
    readTime: "10",
    author: 'Equipo Editorial',
    summary: 'Exploración del sistema que respaldó la época dorada de la economía argentina y su posterior desmantelamiento.',
    content: `
      <h2>El Contexto de la Creación</h2>
      <p>Tras la severa crisis de 1890, conocida como la Revolución del Parque y la consecuente crisis financiera, Argentina enfrentaba una aguda inestabilidad monetaria. La solución implementada fue la Ley de la Caja de Conversión en 1899, que estableció una relación fija entre el peso papel y el peso oro.</p>

      <h2>Funcionamiento del Sistema</h2>
      <p>La Caja de Conversión era una institución sencilla pero poderosa: su única función era emitir billetes respaldados 100% por oro. Si entraba oro al país, se emitían pesos; si salía oro, se retiraban pesos de circulación. Esta regla automática eliminaba la discrecionalidad política en la política monetaria.</p>

      <h2>La Edad de Oro de Argentina</h2>
      <p>Este sistema proveyó la certidumbre necesaria para atraer masivas inversiones extranjeras y fomentar un crecimiento económico espectacular. Durante las primeras décadas del siglo XX, Argentina se convirtió en una de las diez economías más ricas del mundo en términos de PBI per cápita. La inflación era virtualmente inexistente y el peso argentino era una moneda respetada globalmente.</p>

      <h2>El Fin de una Era</h2>
      <p>La Primera Guerra Mundial forzó la primera suspensión de la convertibilidad debido a la dislocación financiera global. Aunque se intentó restaurar en los años 20, la crisis de 1929 dio el golpe de gracia al sistema. La necesidad de políticas más "flexibles" para combatir la crisis llevó al abandono definitivo de la Caja y preparó el terreno para la banca central moderna.</p>
    `
  },
  {
    slug: 'crisis-fiscales-y-emision',
    title: 'Crisis Fiscales y Emisión',
    subtitle: 'El círculo vicioso del déficit y la depreciación monetaria',
    category: 'Crisis Fiscales',
    date: '20 de Agosto, 2023',
    readTime: "12",
    author: 'Equipo Editorial',
    summary: 'Cómo los déficits fiscales recurrentes han forzado a lo largo de la historia la emisión sin respaldo y generado crisis cambiarias.',
    content: `
      <h2>El Origen Fiscal de los Problemas Monetarios</h2>
      <p>En la historia económica moderna, raras veces los problemas monetarios ocurren en el vacío. Casi invariableménte, la inflación es un fenómeno fiscal. Cuando un Estado gasta consistentemente más de lo que recauda a través de impuestos y no puede financiarse en los mercados de crédito voluntarios, recurre al impuesto inflacionario mediante la emisión de moneda.</p>

      <h2>El Mecanismo de Transmisión</h2>
      <p>El déficit fiscal sostenido presiona al Banco Central para que monetice la deuda del gobierno. Al inyectar nuevos pesos en la economía sin un aumento correspondiente en la producción de bienes y servicios, el valor de cada peso individual disminuye. Esto se refleja inicialmente en una pérdida del poder adquisitivo interno (inflación) y una depreciación en el mercado de divisas.</p>

      <h2>Impacto en el Sector Productivo</h2>
      <p>La inestabilidad generada por este ciclo destruye los incentivos para el ahorro de largo plazo y la inversión productiva. Los agentes económicos dirigen sus esfuerzos a protegerse de la inflación en lugar de innovar o expandir la producción. Las crisis cambiarias subsiguientes, causadas por intentos de mantener tipos de cambio artificialmente bajos, terminan en dolorosas devaluaciones que ajustan brutalmente los salarios reales.</p>

      <h2>Lecciones No Aprendidas</h2>
      <p>A pesar de la abundante evidencia histórica, la tentación política de gastar por encima de las posibilidades siempre regresa. Comprender esta dinámica es esencial para cualquier intento de reforma estructural profunda orientada a la estabilidad a largo plazo.</p>
    `
  },
  {
    slug: "el-fin-de-la-casa-propia-crisis-vivienda-argentina",
    title: "El fin de la casa propia: cinco variables que explican la crisis habitacional",
    subtitle: "Salarios en pesos, precios en dólares, crédito inexistente y un colapso demográfico consolidan a una generación entera en el alquiler permanente.",
    summary: "Análisis estructural sobre el descalce cambiario, la falta de crédito y el cambio demográfico que dinamitaron el acceso a la vivienda en Argentina.",
    category: "Economía Real",
    author: "Hablemos de Economía",
    date: "15 de Septiembre, 2026",
    readTime: "5",
    content: `
<p>Adquirir una vivienda en Argentina dejó de ser una cuestión de esfuerzo laboral o disciplina de ahorro para transformarse en una imposibilidad matemática. Un asalariado promedio en la Ciudad de Buenos Aires requiere más de 120 meses (10 años) de ingresos netos íntegros para costear una unidad estándar de 60 metros cuadrados. Medido bajo el Salario Mínimo, Vital y Móvil, el acceso a una vivienda tipo demanda 129 años ininterrumpidos de trabajo.</p>

<p>La parálisis del mercado habitacional responde a cinco factores estructurales:</p>

<h3>1. Descalce de monedas</h3>
<p>Los inmuebles cotizan rígidamente en dólares mientras las remuneraciones se perciben en pesos. Tras décadas de volatilidad cambiaria y pérdida de valor del signo monetario, el costo de la vivienda medido en sueldos se fue a máximos históricos. En paralelo, el alquiler medio absorbe más del 50% del ingreso de un joven profesional.</p>

<h3>2. Inexistencia de crédito hipotecario</h3>
<p>El stock hipotecario argentino ronda apenas el 1% del PBI, frente al 10% de Brasil y el 27,9% de Chile. Con solo 146.000 créditos vigentes para 47 millones de habitantes, el requisito de integrar entre un 20% y un 25% de anticipo en efectivo bloquea a la inmensa mayoría de la población joven.</p>

<h3>3. Fragmentación de los hogares</h3>
<p>Entre 2010 y 2022, el 46% del crecimiento en hogares fue explicado por personas que viven solas. Los hogares unipersonales representan ya el 24,8% en el país y el 39,1% en CABA. Más hogares con menos integrantes implican mayor presión sobre los metros cuadrados disponibles.</p>

<h3>4. Desplome demográfico</h3>
<p>En 2023 se registraron apenas 460.902 nacimientos, un derrumbe del 40% frente a 2014 y el piso en medio siglo. La tasa de fecundidad cayó a 1,33 hijos por mujer, reconfigurando la oferta constructiva hacia unidades mínimas de inversión en detrimento de viviendas familiares.</p>

<h3>5. Agotamiento previsional</h3>
<p>El ladrillo fue durante décadas el plan de retiro informal de la clase media argentina. Con un ratio de sostenimiento de 1,3 aportantes activos por cada pasivo, el sistema no garantiza cobertura digna, dejando a las futuras generaciones de jubilados sin haber suficiente y sin vivienda propia.</p>
    `
  }
];

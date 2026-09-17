import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

interface Article {
  title: string;
  slug: string;
  category?: string;
  subtitle?: string;
  author?: string;
  publishedAt?: string;
  readTime?: string;
  imageUrl?: string;
  imageCaption?: string;
  content: string;
}

// Parser editorial con jerarquía de imprenta
function ArticleBody({ content }: { content: string }) {
  // Normalizar saltos de línea para evitar textos pegados
  const cleanContent = content.replace(/\r\n/g, "\n");
  const blocks = cleanContent.split(/\n\s*\n/);

  return (
    <div className="space-y-7 font-serif text-neutral-300">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Subtítulo H2
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-neutral-100 pt-6 pb-2 border-b border-neutral-800"
            >
              {trimmed.replace(/^##\s+/, "")}
            </h2>
          );
        }

        // Subtítulo H3
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-serif font-semibold text-neutral-200 pt-4"
            >
              {trimmed.replace(/^###\s+/, "")}
            </h3>
          );
        }

        // Cita editorial destacada (Pull quote estilo Economist)
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={idx}
              className="my-8 border-l-2 border-red-600 bg-neutral-900/40 py-3 pl-6 pr-4 italic text-neutral-200 text-xl leading-relaxed"
            >
              {trimmed.replace(/^>\s+/, "")}
            </blockquote>
          );
        }

        // Primer párrafo: Párrafo de apertura (Lead)
        if (idx === 0) {
          return (
            <p
              key={idx}
              className="text-xl sm:text-[22px] leading-relaxed text-neutral-200 font-normal tracking-normal"
            >
              {trimmed}
            </p>
          );
        }

        // Párrafos regulares de lectura
        return (
          <p
            key={idx}
            className="text-lg sm:text-[19px] leading-[1.8] text-neutral-300 font-light"
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

// Fuente de datos (Ajustable a DB / CMS)
async function getArticle(slug: string): Promise<Article | null> {
  return {
    slug,
    category: "Historia Monetaria",
    title: "El Origen del Banco Central y la Transformación Monetaria de 1935",
    subtitle:
      "Cómo la Gran Depresión forzó el abandono del patrón oro y sentó las bases de la banca moderna en la República Argentina.",
    author: "Redacción Económica",
    publishedAt: "17 de Septiembre, 2026",
    readTime: "6 min de lectura",
    imageUrl: "/images/article-bcra-1935.png",
    imageCaption:
      "Edificio histórico del Banco Central de la República Argentina, Reconquista 266.",
    content: `En 1935, Argentina transformó radicalmente su arquitectura financiera tras los impactos de la Gran Depresión mundial. La fragmentación previa de las entidades de crédito impedía una respuesta coordinada ante shocks externos.

## Antecedentes de la Reforma
Bajo el modelo agroexportador, la Caja de Conversión operaba de forma pasiva ante los flujos comerciales. La crisis de los años treinta demostró la vulnerabilidad extrema del sistema financiero ante la caída de las exportaciones y la fuga de capitales hacia las plazas centrales.

> "La creación del banco central no fue un mero cambio administrativo, sino el fin del patrón oro ortodoxo en el Río de la Plata."

## Estructura y Primer Directorio
Bajo la influencia técnica de las recomendaciones de Sir Otto Niemeyer y la decisiva ejecución económica de Raúl Prebisch, la flamante institución asumió de forma integral el monopolio de la emisión y el rol clave de prestamista de última instancia.

### Mecanismos de Control de Liquidez
El nuevo esquema permitió consolidar la deuda flotante e instrumentar el primer mercado regulado de títulos públicos, otorgando al país herramientas soberanas de control macroprudencial.`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navegación sutil */}
        <nav className="mb-8">
          <Link
            href="/articulos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors font-sans"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al índice
          </Link>
        </nav>

        {/* Cabecera Editorial */}
        <header className="space-y-4 mb-8">
          {/* Rubric / Kicker estilo The Economist */}
          <div className="inline-block border-b-2 border-red-600 pb-0.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            {article.category || "Análisis"}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-neutral-50 leading-[1.15]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-serif text-lg sm:text-xl text-neutral-400 italic leading-relaxed pt-1">
              {article.subtitle}
            </p>
          )}

          {/* Metadatos */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-500 pt-4 border-t border-neutral-850">
            {article.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-neutral-400" />
                {article.author}
              </span>
            )}
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                {article.publishedAt}
              </span>
            )}
            {article.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                {article.readTime}
              </span>
            )}
          </div>
        </header>

        {/* Imagen Editorial */}
        {article.imageUrl && (
          <figure className="my-10 overflow-hidden rounded-sm border border-neutral-850 bg-neutral-900">
            <div className="relative aspect-[16/10] w-full bg-neutral-900">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 680px"
                className="object-cover"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="p-3 text-left font-sans text-xs text-neutral-400 border-t border-neutral-850 bg-neutral-900/50">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Cuerpo del Artículo */}
        <main className="mt-8">
          <ArticleBody content={article.content} />
        </main>
      </div>
    </article>
  );
}

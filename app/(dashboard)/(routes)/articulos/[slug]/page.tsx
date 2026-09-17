import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface Article {
  title: string;
  slug: string;
  author?: string;
  publishedAt?: string;
  readTime?: string;
  imageUrl?: string;
  imageCaption?: string;
  content: string;
}

// Helper: Parser de contenido plano a elementos estructurados
function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Detección de H2 (prefijo markdown '##' o títulos cortos en mayúsculas/destacados)
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={idx}
              className="text-2xl font-bold tracking-tight text-slate-100 mt-10 mb-4 border-b border-slate-800 pb-2"
            >
              {trimmed.replace(/^##\s+/, "")}
            </h2>
          );
        }

        // Detección de H3 ('### ')
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="text-xl font-semibold text-slate-200 mt-8 mb-3"
            >
              {trimmed.replace(/^###\s+/, "")}
            </h3>
          );
        }

        // Citas editoriales ('> ')
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-amber-500/80 bg-slate-900/60 pl-5 py-3 pr-4 rounded-r-lg italic text-slate-300 my-6"
            >
              {trimmed.replace(/^>\s+/, "")}
            </blockquote>
          );
        }

        // Párrafos convencionales
        return (
          <p
            key={idx}
            className="text-lg leading-relaxed text-slate-300 font-normal tracking-normal"
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

// Adaptar a la fuente de datos real (Prisma, CMS o mock DB local)
async function getArticle(slug: string): Promise<Article | null> {
  // Simulación: Reemplazar por tu consulta real db.article.findUnique({ where: { slug } })
  return {
    slug,
    title: "El Origen del Banco Central y la Transformación Monetaria de 1935",
    author: "Redacción Económica",
    publishedAt: "17 de Septiembre, 2026",
    readTime: "6 min de lectura",
    imageUrl: "", // Cadena vacía para forzar fallback
    imageCaption: "Fachada histórica del Banco Central de la República Argentina.",
    content: `## Antecedentes de la Reforma
En 1935, Argentina transformó radicalmente su arquitectura financiera tras los impactos de la Gran Depresión mundial. La fragmentación previa de las entidades de crédito impedía una respuesta coordinada ante shocks externos.

> "La creación del banco central no fue solo un cambio administrativo, sino el fin del patrón oro ortodoxo en el Río de la Plata."

## Estructura y Primer Directorio
Bajo la influencia técnica de los informes de Sir Otto Niemeyer y la ejecución de Raúl Prebisch, la institución asumió el monopolio de la emisión monetaria y el rol de prestamista de última instancia.

### Mecanismos de Control de Liquidez
El nuevo esquema permitió consolidar la deuda flotante e instrumentar el primer mercado de pagarés bancarios, regulando activamente las reservas líquidas del sistema financiero argentino.`,
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

  const editorialImage =
    article.imageUrl && article.imageUrl.trim() !== ""
      ? article.imageUrl
      : "/images/article-bcra-1935.png";

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-8">
          <Link
            href="/articulos"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Artículos
          </Link>
        </nav>

        <header className="mb-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 border-b border-slate-800 pb-6">
            {article.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-slate-500" />
                {article.author}
              </span>
            )}
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-500" />
                {article.publishedAt}
              </span>
            )}
            {article.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-500" />
                {article.readTime}
              </span>
            )}
          </div>
        </header>

        {/* Imagen Editorial */}
        <figure className="my-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="relative aspect-[16/9] w-full bg-slate-900">
            <Image
              src={editorialImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {article.imageCaption && (
            <figcaption className="p-3 text-center text-xs text-slate-400 border-t border-slate-850 bg-slate-950/70">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Cuerpo del Artículo */}
        <main className="mt-8">
          <ArticleBody content={article.content} />
        </main>
      </div>
    </article>
  );
}

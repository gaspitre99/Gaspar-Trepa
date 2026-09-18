import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { articlesData } from '@/lib/articles-data';

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

// Parser editorial con soporte para HTML y Markdown
function ArticleBody({ content }: { content: string }) {
  const preprocessed = content
    .replace(/<\/p>/gi, '</p>\n\n')
    .replace(/<\/h2>/gi, '</h2>\n\n')
    .replace(/<\/h3>/gi, '</h3>\n\n')
    .replace(/\r\n/g, '\n');

  const blocks = preprocessed.split(/\n\s*\n/);

  const explicitHeadings = [
    "El Origen Fiscal de los Problemas Monetarios",
    "El Mecanismo de Transmisión",
    "Impacto en el Sector Productivo",
    "Lecciones No Aprendidas",
    "La Caja de Conversión de 1890",
    "La Crisis del '30 y el Cambio de Paradigma",
    "La Creación del Banco Central en 1935",
    "El Principio de la Inflación Estructural",
    "Introducción",
    "Conclusión",
    "El Contexto de la Creación",
    "Funcionamiento del Sistema",
    "La Edad de Oro de Argentina",
    "El Fin de una Era",
    "1. Descalce de monedas",
    "2. Inexistencia de crédito hipotecario",
    "3. Fragmentación de los hogares",
    "4. Desplome demográfico",
    "5. Agotamiento previsional"
  ];

  return (
    <div className="space-y-7 font-serif text-neutral-300">
      {blocks.map((block, idx) => {
        let innerHTML = block.trim()
          .replace(/^<p>/i, '')
          .replace(/<\/p>$/i, '')
          .replace(/^<h2>/i, '')
          .replace(/<\/h2>$/i, '')
          .replace(/^<h3>/i, '')
          .replace(/<\/h3>$/i, '')
          .trim();

        if (!innerHTML) return null;

        // Subtítulo H2 (explicit check or markdown/HTML tag)
        const isExplicitHeading = explicitHeadings.includes(innerHTML.trim());
        if (innerHTML.startsWith('## ') || block.toLowerCase().includes('<h2') || isExplicitHeading) {
          const heading = innerHTML.replace(/^##\s+/, '');
          return (
            <h2
              key={idx}
              className="text-xl sm:text-2xl font-bold text-neutral-100 mt-10 mb-4 pt-2 tracking-tight block"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          );
        }

        // Subtítulo H3
        if (innerHTML.startsWith('### ') || block.toLowerCase().includes('<h3')) {
          const heading = innerHTML.replace(/^###\s+/, '');
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-bold text-neutral-100 mt-10 mb-4 pt-2 tracking-tight block"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          );
        }

        // Cita editorial (Pull quote)
        if (innerHTML.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="my-8 border-l-2 border-red-600 bg-neutral-900/40 py-3 pl-6 pr-4 italic text-neutral-200 text-xl leading-relaxed"
            >
              {innerHTML.replace(/^>\s+/, '')}
            </blockquote>
          );
        }

        // Párrafos regulares (y de apertura)
        return (
          <p
            key={idx}
            className="text-base sm:text-lg text-neutral-300 leading-relaxed sm:leading-8 mb-6 font-normal"
            dangerouslySetInnerHTML={{ __html: innerHTML }}
          />
        );
      })}
    </div>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await params;
  const article = articlesData.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <nav className="mb-8">
          <Link
            href="/articulos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors font-sans"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al índice
          </Link>
        </nav>

        <header className="space-y-4 mb-8">
          <div className="inline-block border-b-2 border-red-600 pb-0.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            {article.category || 'Análisis'}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-neutral-50 leading-[1.15]">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="font-serif text-lg sm:text-xl text-neutral-400 italic leading-relaxed pt-1">
              {article.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-neutral-500 pt-4 border-t border-neutral-800">
            {article.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-neutral-400" />
                {article.author}
              </span>
            )}
            {article.date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                {article.date}
              </span>
            )}
            {article.readTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                {article.readTime} min de lectura
              </span>
            )}
          </div>
        </header>

        <figure className="my-8 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
          <div className="aspect-[16/9] relative w-full">
            <Image
              src={article.imageUrl || "/images/article-bcra-1935.png"}
              alt={article.title}
              className="object-cover"
              fill
              priority
            />
          </div>
          <figcaption className="p-3 text-xs text-neutral-400 italic border-t border-neutral-800/60 bg-neutral-950/60">
            {article.imageCaption || "Documento y contexto histórico de la política monetaria argentina."}
          </figcaption>
        </figure>

        <main className="mt-8">
          <ArticleBody content={article.content} />
        </main>
      </div>
    </article>
  );
}
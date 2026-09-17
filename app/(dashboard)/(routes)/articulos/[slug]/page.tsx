import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return { title: "Artículo No Encontrado" };
  return {
    title: article.title,
    description: article.summary,
  };
}

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { articlesData } from '@/lib/articles-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articlesData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6 -ml-4 text-slate-400 hover:text-emerald-400 hover:bg-slate-900">
            <Link href="/articulos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Artículos
            </Link>
          </Button>

          <div className="space-y-6 text-center">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 border-none">
              {article.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif">
              {article.title}
            </h1>

            <p className="text-xl text-slate-400 font-serif max-w-2xl mx-auto">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Tiempo de lectura: {article.readTime} min</span>
              </div>
            </div>
          </div>
        </div>

        <figure className="my-8 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50">
          <div className="aspect-[16/9] relative w-full">
            <Image
              src={article.imageUrl || "/images/article-bcra-1935.png"}
              alt={article.title}
              className="object-cover"
              fill
              priority
            />
          </div>
          <figcaption className="p-3 text-xs text-slate-400 italic border-t border-slate-800/60 bg-slate-950/60">
            {article.imageCaption || "Documento y contexto histórico de la política monetaria argentina."}
          </figcaption>
        </figure>

        <div className="font-serif mx-auto mt-12 max-w-none">
          {(() => {
            // Convert `<p>` and `<h2>` to have newlines so we can split by double newline reliably
            let preprocessed = article.content
              .replace(/<\/p>/g, '</p>\n\n')
              .replace(/<\/h2>/g, '</h2>\n\n')
              .replace(/<\/h3>/g, '</h3>\n\n');
            preprocessed = preprocessed.replace(/\n\s*\n\s*\n/g, '\n\n');

            const blocks = preprocessed.split(/\n\s*\n/);

            return blocks.map((block, idx) => {
              // Only remove the outermost <p> or <h2> tags so we keep inline HTML like <strong> or <em>
              let innerHTML = block.trim()
                .replace(/^<p>/, '')
                .replace(/<\/p>$/, '')
                .replace(/^<h2>/, '')
                .replace(/<\/h2>$/, '')
                .replace(/^<h3>/, '')
                .replace(/<\/h3>$/, '')
                .trim();

              if (!innerHTML) return null;

              // Strip tags for heading heuristic checking, but we'll render the preserved innerHTML
              const textOnly = innerHTML.replace(/<[^>]+>/g, '').trim();

              const isHeadingMatch = block.includes('<h2') || block.includes('<h3') || innerHTML.startsWith('## ');
              const specificHeadings = [
                "El Origen Fiscal",
                "El Mecanismo de Transmisión",
                "Impacto en el Sector Productivo",
                "Lecciones No Aprendidas",
                "La Caja de Conversión de 1890",
                "La Crisis del '30",
                "El Contexto de la Creación",
                "Funcionamiento del Sistema",
                "La Edad de Oro de Argentina",
                "El Fin de una Era",
                "La Creación del Banco Central en 1935",
                "El Principio de la Inflación Estructural",
                "Conclusión",
                "Introducción"
              ];

              const isSpecificHeading = specificHeadings.some(h => textOnly.includes(h)) && textOnly.length < 100;
              const isShortNoPunctuation = !textOnly.match(/[.:]$/) && textOnly.length < 80;

              if (isHeadingMatch || isSpecificHeading || isShortNoPunctuation) {
                innerHTML = innerHTML.replace(/^## /, '');
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-100 mt-10 mb-4 pt-2 tracking-tight block" dangerouslySetInnerHTML={{ __html: innerHTML }} />
                );
              }

              return (
                <p key={idx} className="text-base sm:text-lg text-slate-300 leading-relaxed sm:leading-8 mb-6 font-normal" dangerouslySetInnerHTML={{ __html: innerHTML }} />
              );
            }).filter(Boolean);
          })()}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
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

        <div
          className="prose prose-zinc dark:prose-invert lg:prose-lg font-serif mx-auto mt-12
                     prose-h2:text-slate-200 prose-h3:text-slate-300 prose-p:text-slate-300
                     prose-strong:text-slate-200"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}

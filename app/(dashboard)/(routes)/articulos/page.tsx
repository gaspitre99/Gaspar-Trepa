'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { articlesData } from '@/lib/articles-data';
import { Input } from '@/components/ui/input';

export default function ArticulosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(articlesData.map(article => article.category));
    return Array.from(cats);
  }, []);

  const filteredArticles = useMemo(() => {
    return articlesData.filter(article => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Cabecera de Sección */}
        <header className="mb-10 space-y-3 border-b border-neutral-800 pb-8">
          <div className="inline-block border-b-2 border-red-600 pb-0.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Archivo & Análisis
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-neutral-50 leading-tight">
            Historia & Artículos
          </h1>
          <p className="font-serif text-lg sm:text-xl text-neutral-400 italic leading-relaxed">
            Ensayos curados sobre historia monetaria, escuela austríaca y crisis económicas.
          </p>
        </header>

        {/* Barra de Búsqueda y Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Buscar ensayos o conceptos..."
              className="pl-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-red-600 text-sm font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-xs font-sans uppercase tracking-wider transition-colors border ${
                selectedCategory === null
                  ? 'bg-red-600 border-red-600 text-white font-semibold'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs font-sans uppercase tracking-wider transition-colors border ${
                  selectedCategory === category
                    ? 'bg-red-600 border-red-600 text-white font-semibold'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Artículos */}
        <div className="divide-y divide-neutral-800 border-t border-b border-neutral-800">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <article key={article.slug} className="py-8 group">
                <Link href={`/articulos/${article.slug}`} className="block space-y-3">
                  {/* Kicker y Fecha */}
                  <div className="flex items-center gap-3 font-sans text-xs">
                    <span className="font-bold uppercase tracking-widest text-red-600">
                      {article.category}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-500">{article.date}</span>
                  </div>

                  {/* Título Principal */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-100 group-hover:text-red-500 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  {/* Subtítulo */}
                  {article.subtitle && (
                    <p className="font-serif text-neutral-400 italic text-base sm:text-lg leading-relaxed">
                      {article.subtitle}
                    </p>
                  )}

                  {/* Extracto */}
                  <p className="font-serif text-neutral-300 font-light text-sm sm:text-base leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>

                  {/* Firma y Lectura */}
                  <div className="flex items-center justify-between pt-2 font-sans text-xs text-neutral-500 uppercase tracking-wider">
                    <span>Por {article.author}</span>
                    <span>{article.readTime} min de lectura</span>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-16 font-serif text-neutral-500 italic text-lg">
              No se encontraron artículos que coincidan con tu búsqueda.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
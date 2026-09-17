'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { articlesData } from '@/lib/articles-data';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
    <div className="p-6 max-w-5xl mx-auto bg-slate-950 min-h-full text-slate-100">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">Historia & Artículos</h1>
        <p className="text-slate-400 text-lg">
          Explora nuestra colección curada de ensayos sobre historia monetaria, escuela austríaca y crisis económicas.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar artículos..."
            className="pl-9 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <Link key={article.slug} href={`/articulos/${article.slug}`}>
              <div className="group p-6 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-100 shadow-sm hover:shadow-md hover:border-slate-700 transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="font-medium bg-slate-800 text-slate-200 hover:bg-slate-700">{article.category}</Badge>
                  <span className="text-sm text-slate-500">•</span>
                  <span className="text-sm text-slate-500">{article.date}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h2>
                <p className="text-lg text-slate-400 mb-4 font-serif">{article.subtitle}</p>
                <p className="text-sm mb-4 line-clamp-2 text-slate-300">{article.summary}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="font-medium">Por {article.author}</span>
                  <span>{article.readTime} min de lectura</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 text-slate-500">
            No se encontraron artículos que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}

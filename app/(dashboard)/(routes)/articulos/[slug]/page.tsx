import React from "react"
import Image from "next/image"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Simulando el contenido del artículo que normalmente vendría de una base de datos
const mockArticleContent = `
<h2>El Impacto de la Inteligencia Artificial en el Sector Financiero</h2>
<p>La inteligencia artificial está transformando rápidamente el panorama financiero global. Desde la automatización de procesos hasta el análisis predictivo de mercados, las herramientas basadas en IA ofrecen una ventaja competitiva sin precedentes.</p>
<p>Una de las áreas con mayor impacto es el <strong>trading algorítmico</strong>. Los modelos de aprendizaje automático pueden analizar millones de puntos de datos en milisegundos, identificando patrones que serían invisibles para los analistas humanos.</p>
<h3>Desafíos y Consideraciones Éticas</h3>
<p>Sin embargo, la adopción de estas tecnologías no está exenta de riesgos. La "caja negra" de los algoritmos de deep learning plantea interrogantes sobre la transparencia y la rendición de cuentas, especialmente cuando las decisiones algorítmicas afectan la estabilidad del mercado.</p>
<ul>
    <li>Regulación financiera y cumplimiento normativo.</li>
    <li>Sesgos inherentes en los datos de entrenamiento.</li>
    <li>Ciberseguridad y protección de datos sensibles.</li>
</ul>
<p>En conclusión, mientras que la IA promete eficiencia y precisión, el sector debe navegar cuidadosamente por el complejo entorno ético y regulatorio para aprovechar todo su potencial.</p>
`

export default function ArticlePage({ params }: ArticlePageProps) {
  // En un entorno real, usaríamos el 'slug' para obtener los datos del artículo de Prisma/DB
  // const article = await db.article.findUnique({ where: { slug: params.slug } })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Hero Image Component */}
      <div className="w-full h-[400px] mb-8 relative rounded-md overflow-hidden shadow-sm">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract financial background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content Wrapper with @tailwindcss/typography */}
      <div className="prose prose-slate dark:prose-invert max-w-none font-serif text-lg leading-relaxed">
        <h1>Análisis: El Futuro de las Finanzas Descentralizadas</h1>
        <div dangerouslySetInnerHTML={{ __html: mockArticleContent }} />
      </div>
    </div>
  )
}

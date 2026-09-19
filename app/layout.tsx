import type { Metadata } from 'next';
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';

import ToastProvider from '@/components/providers/toaster-provider';

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
  adjustFontFallback: false,
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Hablemos de Economía',
    template: '%s | Hablemos de Economía',
  },
  description: 'Plataforma educativa sobre educación financiera, historia económica argentina y herramientas de análisis e inversión.',

  keywords: ["educación financiera", "economía argentina", "inflación", "inversiones", "billeteras virtuales", "dólar mep", "historia monetaria"],
  openGraph: {
    title: 'Hablemos de Economía',
    description: 'Plataforma educativa sobre educación financiera, historia económica argentina y herramientas de análisis e inversión.',

    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_dummy_key_for_build_prerender_1234567890abcdef";

  return (
    <ClerkProvider localization={esES as any} publishableKey={publishableKey}>
      <html lang='es' className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <body className="font-sans bg-neutral-950 text-neutral-100 min-h-screen antialiased selection:bg-neutral-800 selection:text-white">
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

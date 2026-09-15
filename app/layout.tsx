import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';

import ToastProvider from '@/components/providers/toaster-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hablemos de Economía',
  description: 'Plataforma educativa de Hablemos de Economía',
  openGraph: {
    title: 'Hablemos de Economía',
    description: 'Plataforma educativa de Hablemos de Economía',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const LayoutContent = (
    <html lang='es'>
      <body className={inter.className}>
        <ToastProvider/>
        {children}
      </body>
    </html>
  );

  if (!publishableKey) {
    return LayoutContent;
  }

  return (
    <ClerkProvider localization={esES as any} publishableKey={publishableKey}>
      {LayoutContent}
    </ClerkProvider>
  );
}

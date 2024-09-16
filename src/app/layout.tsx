import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cola Chat',
  description: 'Chat app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/images/favicon/manifest.json" />
        <link
          rel="browserconfig"
          href="/assets/images/favicon/browserconfig.xml"
        />
        <meta name="apple-mobile-web-app-title" content="Cola Chat" />
        <meta name="application-name" content="Cola Chat" />
        <meta name="msapplication-TileColor" content="#F0EFDB" />
        <meta
          name="msapplication-TileImage"
          content="/assets/images/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#F0EFDB" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={`${inter.className}, bg-b flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

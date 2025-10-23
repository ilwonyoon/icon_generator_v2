import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Icon Builder',
  description: 'A deterministic, parametric icon generation system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-950">{children}</body>
    </html>
  );
}

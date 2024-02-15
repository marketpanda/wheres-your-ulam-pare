import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//material ui
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Where's Your Ulam Pare",
  description: "Your Cravings Served",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>    
      </body>
    </html>
  );
}

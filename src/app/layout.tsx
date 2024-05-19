import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Advertisement from "@/components/advertisement/Advertisement";
import Navigation from "@/components/navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashScore",
  description: "Scores for football",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Advertisement />
          <Header />
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}

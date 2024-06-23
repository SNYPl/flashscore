import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Advertisement from "@/components/advertisement/Advertisement";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import { QueryClientProviderHelper } from "@/components/helper/queryClient";
import { ReduxToolkitProvider } from "@/components/helper/reduxProvider";

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
        <ReduxToolkitProvider>
          <QueryClientProviderHelper>
            <header>
              <Advertisement />
              <Header />
              <Navigation />
            </header>
            {children}
          </QueryClientProviderHelper>
        </ReduxToolkitProvider>
        <footer className="w-full bg-white mt-5">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

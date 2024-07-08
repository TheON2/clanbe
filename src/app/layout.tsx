import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { Providers } from "./provider";
import TapNav from "@/components/TapNav/TabNav";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Clan be",
    template: "Clan be | %s",
  },
  description: "스타크래프트 Korea서버 Be 클랜 홈페이지",
  icons: {
    icon: "/icon.ico",
  },
  visualViewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <SpeedInsights />
          <Analytics />
          <div className="flex flex-col w-full max-w-7xl mx-auto">
            <Header />
            <div className="flex flex-col-reverse md:flex-row items-start w-full">
              <TapNav />
              <main className="flex-1 w-full">{children}</main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

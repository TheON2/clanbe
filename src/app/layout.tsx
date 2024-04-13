import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { Providers } from "./provider";
import TapNav from "@/components/TabNav";
import Head from "next/head";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Clan be",
    template: "Clan be | %s",
  },
  description: "스타크래프트 Korea서버 Be 클랜 홈페이지",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <Head>
        <title>CLANBE</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 user-scalable=yes"
        />
      </Head>
      <body className="flex flex-col w-full">
        <Providers>
          <div className="mx-auto max-w-7xl">
            <Header />
            <div className="flex flex-col-reverse sm:flex-row items-start">
              <TapNav />
              <main className="flex flex-col sm:flex-row items-center w-full">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

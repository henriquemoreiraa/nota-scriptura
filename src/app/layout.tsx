import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";
import ReactQueryProvider from "@/provider/react-query";

export const metadata: Metadata = {
  title: "Nota Scriptura",
  description:
    "Nota Scriptura é uma Bíblia online integrada com o Notion. Criada para facilitar suas anotações bíblicas.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`w-full flex flex-col justify-center items-center xl:h-screen ${inter.className}`}
    >
      <body className="flex flex-col max-w-screen-xl xl:h-full w-full items-center">
        <ReactQueryProvider>
          <NavBar />
          <main className="flex-1 p-3">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

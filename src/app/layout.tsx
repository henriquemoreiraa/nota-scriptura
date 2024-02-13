import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/provider/react-query";
import { Toaster } from "@/components/ui/toaster";

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
          <div className="flex-1 p-3 w-full">{children}</div>
          <Toaster />
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

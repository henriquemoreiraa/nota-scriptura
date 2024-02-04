import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Nota Scriptura",
  description: "",
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
      className={`w-full flex flex-col justify-center items-center h-screen ${inter.className}`}
    >
      <body className="flex flex-col max-w-screen-xl w-full h-full justify-center items-center">
        <NavBar />
        <main className="flex-1 p-3">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nota Scriptura",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="w-full flex flex-col justify-center items-center h-screen"
    >
      <body className="flex flex-col max-w-screen-xl w-full h-full justify-center items-center">
        <main className="flex-1 p-3">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

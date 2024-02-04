import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="flex justify-center h-screen">
        <main className="w-full max-w-screen-xl p-3 flex justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

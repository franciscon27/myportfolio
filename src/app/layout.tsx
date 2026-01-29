// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Follow the White Rabbit | Interactive Experience",
  description: "An immersive journey down the rabbit hole. Click the white rabbit to begin your adventure.",
  keywords: ["white rabbit", "alice in wonderland", "3d portfolio", "interactive experience"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
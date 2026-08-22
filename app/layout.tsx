import type { Metadata } from "next";
import { Alfa_Slab_One, Courier_Prime } from "next/font/google";
import "./globals.css";

const display = Alfa_Slab_One({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const mono = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "American Bear — The Biggest Show on Earth",
  description: "Part history museum, part blockbuster, part neon roadside attraction: a satirical American cultural universe hosted by one extremely confident bear.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${mono.variable}`}>{children}</body></html>;
}

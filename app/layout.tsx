import Provider, { ProviderProps } from "@ui/atoms/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comics",
  description: "Simple Comics Reading Page",
};

export default function RootLayout({ children, session }: ProviderProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}

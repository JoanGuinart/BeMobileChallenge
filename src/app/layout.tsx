import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@components/Header";
import { FavoritesProvider } from "@context/FavoritesContext";

const geistRoboto = Roboto_Condensed({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeMobile - Marvel",
  description:
    "Explore the Marvel universe: search for your favorite characters, add them to favorites, and navigate their information in an interactive, responsive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistRoboto.variable}`}>
        <FavoritesProvider>
          <Header />
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}

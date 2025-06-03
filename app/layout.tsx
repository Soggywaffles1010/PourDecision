// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import PageTransitionProvider from "./components/loaderprovider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const nickySans = localFont({
  src: [
    { path: "../fonts/NickySans/OpenType-TT/NickySans-Black.ttf", weight: "900", style: "normal" },
    { path: "../fonts/NickySans/OpenType-TT/NickySans-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-nickysans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pour Decision",
  description: "A coffeeshop in Digos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nickySans.variable}`}>
      <body className="font-nickySans">
        <PageTransitionProvider>
          <Header />
          {children}
          <Footer />
        </PageTransitionProvider>
      </body>
    </html>
  );
}

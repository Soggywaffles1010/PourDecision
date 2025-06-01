import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nickySans = localFont({
  src: [
    {
      path: '../fonts/NickySans/OpenType-TT/NickySans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/NickySans/OpenType-TT/NickySans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    // add other weights/styles if needed
  ],
  variable: '--font-nickysans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pour Decision",
  description: "A coffeeshop in Digos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={`${nickySans.variable}`}>
      <body
        className="font-nickySans "
      >
        {children}
      </body>
    </html>
  );
}

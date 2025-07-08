
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Error mulu dah ngapa si 😭😭",
  description: "Males ah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-foreground antialiased`}>
        <main className="flex">
          <Sidebar />
          <div className="flex-5">
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}

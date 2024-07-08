import type { Metadata } from "next";
import { Sanchez } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/nav-bar";
import Head from "next/head";
import Footer from "@/components/footer";
import SideBar from "@/components/side-bar";
import { Toaster } from 'react-hot-toast';

const sanchez = Sanchez({subsets: ['latin'], weight: ['400']})


export const metadata: Metadata = {
  title: "InMemory",
  description: "Crear biografias para nuestros difuntos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`bg-background ${sanchez.className}`}>
        <NavBar/>
        <SideBar/>
        {children}
        <Footer/>
        <Toaster/>
      </body>
    </html>
  );
}

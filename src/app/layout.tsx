import type { Metadata } from "next";
import { Sanchez } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Head from "next/head";
import Footer from "@/components/footer";
import SideBar from "@/components/side-bar";
import { Toaster } from 'react-hot-toast';
import { createClient } from "@/lib/supabase/server";

const sanchez = Sanchez({subsets: ['latin'], weight: ['400']})


export const metadata: Metadata = {
  title: "InMemory",
  description: "Crear biografias para nuestros difuntos",
  icons: "/favicon.ico"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const {data: {user}} = await supabase.auth.getUser()
  
  return (
    <html lang="en">
      <body className={`bg-background ${sanchez.className}`}>
        <NavBar user={user}/>
        <SideBar/>
        {children}
        <Footer/>
        <Toaster/>
      </body>
    </html>
  );
}

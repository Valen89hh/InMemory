import { Sanchez } from "next/font/google";
import { Toaster } from 'react-hot-toast';

import "../globals.css";

const sanchez = Sanchez({subsets: ['latin'], weight: ['400']})

export const metadata = {
  title: 'InMemory - Admin',
  description: 'Admin of InMemory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-background ${sanchez.className}`}>
        {children}
        <Toaster/>
      </body>
    </html>
  )
}

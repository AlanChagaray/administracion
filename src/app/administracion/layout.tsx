import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Administracion"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="lg:grid grid-cols-[auto_1fr] lg:h-screen lg:overflow-hidden">
        <Sidebar />
        <div className='p-3 bg-gray-50 overflow-auto h-screen'>
          <Header/>
          {children}
        </div>
      </div>
    </>
  );
}

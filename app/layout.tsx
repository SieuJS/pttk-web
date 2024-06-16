import type { Metadata } from "next";
import { Raleway } from "next/font/google";

// import component 
import Navbar from "@/components/shared/Navbar";

import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";

import AuthProvider from "@/components/shared/AppProvider";

const raleway = Raleway({ subsets: ["latin"],
  weight : ["200", "300" , "400", "500", "600", "700", "900"]
 });

export const metadata: Metadata = {
  title: "Workify",
  description: "Job Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <AuthProvider>
        <EdgeStoreProvider>
          <Navbar/>
          {children}
        </EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

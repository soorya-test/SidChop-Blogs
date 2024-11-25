import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import TokenContextProvider from "@/context/AccessToken";
import ServerStatus from "@/components/server-status";

export const metadata: Metadata = {
  title: "Madeline Blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen relative">
        <TokenContextProvider>
          <Header />
          {children}
          <Toaster />
          <ServerStatus />
        </TokenContextProvider>
      </body>
    </html>
  );
}

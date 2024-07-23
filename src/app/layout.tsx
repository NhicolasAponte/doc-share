import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "doc-share",
  description: "create shareable documents with custom tags for organization",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header>
          <h1 className="text-2xl font-bold">doc-share</h1>
        </Header>
        {children}
      </body>
    </html>
  );
}

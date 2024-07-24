import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
    <ClerkProvider 
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#FFD700", //#3371ff
          fontSize: "16px",
        }
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Header>
            <div className="">
              <p className="document-title">Temp doc title</p>
            </div>
            <SignedOut>
              <SignInButton/>
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </Header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

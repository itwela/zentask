import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    // signOutUrl="/sign-out"
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
    <html lang="en" className="text-xs">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}

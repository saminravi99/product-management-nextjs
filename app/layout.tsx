import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/lib/store/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ProductHub - Product Management System",
  description:
    "A modern, efficient product management application built with Next.js and Tailwind CSS. Browse, create, edit, and manage products seamlessly.",
  keywords: [
    "product management",
    "e-commerce",
    "inventory",
    "nextjs",
    "react",
  ],
  authors: [{ name: "ProductHub Team" }],
  creator: "ProductHub",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://producthub.com",
    title: "ProductHub - Product Management System",
    description: "Modern product management made simple",
    siteName: "ProductHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductHub - Product Management System",
    description: "Modern product management made simple",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

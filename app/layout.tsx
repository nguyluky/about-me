import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://about.nguyluky.site"),
  title: {
    default: "NguyLuky | Software Developer Portfolio",
    template: "%s | NguyLuky",
  },
  description:
    "Portfolio of NguyLuky, a software developer focused on backend systems, APIs, reverse engineering, and embedded development.",
  keywords: [
    "NguyLuky",
    "software developer",
    "backend developer",
    "fullstack developer",
    "embedded development",
    "reverse engineering",
    "portfolio",
  ],
  authors: [{ name: "NguyLuky", url: "https://about.nguyluky.site" }],
  creator: "NguyLuky",
  publisher: "NguyLuky",
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "NguyLuky | Software Developer Portfolio",
    description:
      "Backend systems, APIs, reverse engineering, and embedded projects built by NguyLuky.",
    url: "https://about.nguyluky.site",
    siteName: "NguyLuky Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "NguyLuky Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NguyLuky | Software Developer Portfolio",
    description:
      "Backend systems, APIs, reverse engineering, and embedded projects built by NguyLuky.",
    creator: "@nguyluky",
    images: ["/thumbnail.png"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: "#27272a",
            color: "#f4f4f5",
            border: "1px solid #3f3f46",
            borderRadius: "0.75rem",
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

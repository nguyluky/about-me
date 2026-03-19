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
  title: "NguyLuky Portfolio",
  description: "fullstack dev Portfolio",
  openGraph: {
    title: "NguyLuky Portfolio",
    description: "fullstack dev Portfolio",
    url: "https://about.nguyluky.site",
    siteName: "NguyLuky Portfolio",
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
    title: "NguyLuky Portfolio",
    description: "fullstack dev Portfolio",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

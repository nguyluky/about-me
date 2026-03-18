import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NguyLuky Portfolio",
  description: "fullstack dev Portfolio",
  openGraph: {
    title: "NguyLuky Portfolio",
    description: "fullstack dev Portfolio",
    siteName: "NguyLuky",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

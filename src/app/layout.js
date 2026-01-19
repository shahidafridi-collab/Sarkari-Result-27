export const runtime = "nodejs";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sarkari Result 2026: Latest Govt Jobs, Results, Admit Card, Answer Key",
  description:
    "Check Sarkari Result 2026 for latest government jobs, exam results, admit card, syllabus, answer key and online forms. Fast & accurate updates daily.",
  keywords: [
    "sarkari result 2026",
    "sarkari result",
    "latest sarkari result",
    "government jobs",
    "govt jobs 2026",
    "sarkari naukri",
    "admit card",
    "answer key",
  ],

  // ✅ Google Search Console Verification
  verification: {
    google: "FyIRxz0y2DKciP-70YQkWGpACS50wmtgHg14_LIoLtg",
  },

  metadataBase: new URL("https://sarkariresult27.com"),

  alternates: {
    canonical: "https://www.sarkariresult27.com",
  },
  icons: {
    icon: "/sarkariresult.jpg",
    shortcut: "/sarkariresult.jpg",
    apple: "/sarkariresult.jpg"
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Sarkari Result 2026: Govt Jobs, Results, Admit Card",
    description:
      "Latest Sarkari Result 2026 updates for govt jobs, exam results, admit card, syllabus and answer key.",
    url: "https://sarkariresult27.com",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E3W03KMTP2"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E3W03KMTP2');
          `}
        </Script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

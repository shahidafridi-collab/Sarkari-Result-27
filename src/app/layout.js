import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


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
    "answer key"

  ],
  metadataBase: new URL("https://sarkariresult27.com"),
  alternates: {
    canonical: "https://www.sarkariresult27.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    openGraph: {
      title: "Sarkari Result 2026: Govt Jobs, Results, Admit Card",
      description:
        "Latest Sarkari Result 2026 updates for govt jobs, exam results, admit card, syllabus and answer key.",
      url: "https://sarkariresult27.com",
      type: "website",
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        {/* <Disclaimer/> */}
        <Footer />
      </body>
    </html>
  );
}

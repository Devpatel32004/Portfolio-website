import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Dev Patel | Premium Developer Portfolio",
  description:
    "Modern full-stack developer portfolio featuring projects, experience, and complete recruiter archive.",
  keywords: [
    "Developer Portfolio",
    "Next.js",
    "Full Stack Developer",
    "Frontend Developer",
    "React Portfolio",
  ],
  openGraph: {
    title: "Dev Patel | Premium Developer Portfolio",
    description:
      "Production-ready portfolio built with Next.js, Tailwind CSS, Framer Motion, and polished UI.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08080b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FramerProvider from "@/components/FramerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowMind AI - Automate Your Workflow With Intelligent AI",
  description:
    "Streamline tasks, manage projects, generate content, and boost team productivity with FlowMind AI's next-generation AI automation tools.",
  keywords: [
    "AI productivity",
    "workflow automation",
    "intelligent task management",
    "team collaboration tools",
    "AI agent productivity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FramerProvider>{children}</FramerProvider>
      </body>
    </html>
  );
}

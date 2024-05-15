"use client";

import { RootStyleRegistry } from "@/components/global/RootStyleRegistry";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const metadata: Metadata = {
  title: "LeafyGreen Documentation Site",
  description:
    "MongoDB's open-source, accessible design system for designing and building web applications with React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
        <GoogleAnalytics gaId="G-X7J8VSCE69" />
      </body>
    </html>
  );
}

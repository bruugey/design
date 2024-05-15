"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

import { RootStyleRegistry } from "@/components/global/RootStyleRegistry";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>
          {children}
        </RootStyleRegistry>
        <GoogleAnalytics gaId="G-X7J8VSCE69" />
      </body>
    </html>
  );
}

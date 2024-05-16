"use client";
import LeafyGreenProvider, {
  useDarkMode,
} from "@leafygreen-ui/leafygreen-provider";
import { useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

// import { RootStyleRegistry } from "@/components/global/RootStyleRegistry";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode } = useDarkMode(true);

  return (
    <html lang="en">
      <body>
        <LeafyGreenProvider darkMode={darkMode}>{children}</LeafyGreenProvider>
        <GoogleAnalytics gaId="G-X7J8VSCE69" />
      </body>
    </html>
  );
}

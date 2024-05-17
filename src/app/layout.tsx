"use client";

import { RootStyleRegistry } from "@/components/global";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import LeafyGreenProvider, {
  useDarkMode,
} from "@leafygreen-ui/leafygreen-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [prefersDarkMode] = useMediaQuery(["(prefers-color-scheme: dark)"], {
    fallback: [true],
  });

  const { darkMode } = useDarkMode(prefersDarkMode);

  return (
    <html lang="en">
      <RootStyleRegistry>
        <body>
          <LeafyGreenProvider darkMode={darkMode}>
            {children}
          </LeafyGreenProvider>
          <GoogleAnalytics gaId="G-X7J8VSCE69" />
        </body>
      </RootStyleRegistry>
    </html>
  );
}

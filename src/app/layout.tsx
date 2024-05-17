"use client";
import { RootStyleRegistry } from "@/components/global";
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
  const { darkMode } = useDarkMode(true);

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

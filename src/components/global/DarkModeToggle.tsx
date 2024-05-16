import React, { Dispatch, SetStateAction } from "react";
import IconButton from "@leafygreen-ui/icon-button/";
import { useDarkMode } from "@leafygreen-ui/leafygreen-provider";

export function DarkModeToggle({}: {}) {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <IconButton
      aria-label="dark mode toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      <span>{darkMode ? "🌙" : "🌞"}</span>
    </IconButton>
  );
}

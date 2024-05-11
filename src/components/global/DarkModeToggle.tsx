import { Dispatch, SetStateAction } from "react";
import IconButton from "@leafygreen-ui/icon-button/";

export function DarkModeToggle({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <IconButton
      aria-label="dark mode toggle"
      onClick={() => setDarkMode((curr) => !curr)}
    >
      <span>{darkMode ? "🌙" : "🌞"}</span>
    </IconButton>
  );
}

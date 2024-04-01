import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <Button onClick={() => setTheme("light")}>Light Mode</Button>
      ) : (
        <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
      )}
    </div>
  );
};

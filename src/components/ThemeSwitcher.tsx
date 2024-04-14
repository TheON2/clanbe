import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div className="px-2">
        {theme === "dark" ? (
          <Button onClick={() => setTheme("light")}>Light</Button>
        ) : (
          <Button onClick={() => setTheme("dark")}>Dark</Button>
        )}
      </div>
    </div>
  );
};

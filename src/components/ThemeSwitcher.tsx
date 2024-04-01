import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && (
        <div>
          {theme === "dark" ? (
            <Button onClick={() => setTheme("light")}>Light Mode</Button>
          ) : (
            <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
          )}
        </div>
      )}
    </div>
  );
};

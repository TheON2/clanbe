import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "../../public/SunIcon";
import { MoonIcon } from "../../public/MoonIcon";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 스위치의 상태를 관리하기 위해 테마를 boolean 값으로 변환
  const isDark = theme === "dark";

  if (!mounted) return null;

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="mx-2">
      <Switch
        checked={isDark}
        size="lg"
        color="primary"
        onChange={handleToggleTheme}
        thumbIcon={({ isSelected, className }) =>
          !isSelected ? (
            <MoonIcon className={className} />
          ) : (
            <SunIcon className={className} />
          )
        }
      ></Switch>
    </div>
  );
};

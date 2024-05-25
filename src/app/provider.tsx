"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthContext from "./context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext>
      <NextUIProvider className="w-full">
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </AuthContext>
  );
}

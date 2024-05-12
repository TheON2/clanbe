"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../../redux/config/configStore";
import AuthContext from "./context/AuthContext";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

export function Providers({ children }: { children: React.ReactNode }) {
  injectSpeedInsights();
  return (
    <Provider store={store}>
      <AuthContext>
        <NextUIProvider className="w-full">
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </AuthContext>
    </Provider>
  );
}

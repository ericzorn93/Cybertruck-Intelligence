"use client";

import { type FC, type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  themeProps?: ThemeProviderProps;
}

export const Providers: FC<PropsWithChildren<ProvidersProps>> = ({
  themeProps,
  children,
}) => {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
};

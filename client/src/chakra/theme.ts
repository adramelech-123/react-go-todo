/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        backgroundColor: mode("white", "")(props),
      },
    }),
  },
});

export default theme;

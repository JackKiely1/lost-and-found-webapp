import { Platform } from "react-native";

const tintColourLight = "#0b5884";
const tintColourDark = "#FFFFFF";

export const Colours = {
  light: {
    text: "#1f2a44",
    background: "#FFFFFF",
    tint: tintColourLight,
    icon: "#435465",
    tabIconDefault: "#435465",
    tabIconSelected: tintColourLight,

    primary: "#0b5884",
    secondary: "#378b84",
    accent: "#fcca3a",
    surface: "#435465",
    border: "#DDD",
    lightGray: "#F4F4F4",
  },
  dark: {
    text: "#FFFFFF",
    background: "#1f2a44",
    tint: tintColourDark,
    icon: "#fcca3a",
    tabIconDefault: "#CCCCCC",
    tabIconSelected: tintColourDark,

    primary: "#FFFFFF",
    secondary: "#378b84",
    accent: "#fcca3a",
    surface: "#435465",
    border: "#666",
    lightGray: "#2A344A",
  },
};

export const Colors = Colours;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
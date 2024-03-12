import { useSignal } from "@preact/signals";
import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { ideColorSchemeAtom } from "../atoms/atoms";

interface UsePreferredOrForcedColorScheme {
  colorScheme: "dark" | "light";
  setColorScheme: (c: "auto" | "dark" | "light") => void;
  colorSchemeOrAuto: "auto" | "dark" | "light";
}

export const usePreferredOrForcedColorScheme = (): UsePreferredOrForcedColorScheme => {
  const colorScheme = usePrefersColorScheme();

  const sanitizeColorScheme: (
    c: "dark" | "light" | "no-preference",
  ) => "dark" | "light" = (c) => (c === "no-preference" ? "light" : c);

  const [ideColorScheme, setIdeColorScheme] = useAtom(ideColorSchemeAtom);
  const finalTheme = useSignal<"dark" | "light">(sanitizeColorScheme(colorScheme));

  useEffect(() => {
    const sanitizedColorScheme = sanitizeColorScheme(colorScheme);
    finalTheme.value = ideColorScheme === "auto" ? sanitizedColorScheme : ideColorScheme;
  }, [colorScheme, ideColorScheme]);

  return {
    colorScheme: finalTheme.value,
    setColorScheme: setIdeColorScheme,
    colorSchemeOrAuto: ideColorScheme,
  };
};

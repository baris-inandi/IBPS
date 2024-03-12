import { useSignal } from "@preact/signals";
import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import { ideThemeAtom } from "../atoms/atoms";

export const useIdeThemeCSSClasses = () => {
  const [ideTheme] = useAtom(ideThemeAtom);
  const ideThemeClasses = useSignal("theme-dark-root theme-light-root");

  useEffect(() => {
    ideThemeClasses.value = `${ideTheme.dark ?? "theme-dark-root"} ${ideTheme.light ?? "theme-light-root"}`;
  }, [ideTheme]);

  return ideThemeClasses.value;
};

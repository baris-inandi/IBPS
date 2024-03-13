import { useAtom } from "jotai";
import { ideThemeAtom } from "../atoms/atoms";

export const useIdeThemeCSSClasses = () => {
  const [ideTheme] = useAtom(ideThemeAtom);
  return `${ideTheme.dark ?? "theme-dark-root"} ${ideTheme.light ?? "theme-light-root"}`;
};

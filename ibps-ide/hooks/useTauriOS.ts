import { os } from "@tauri-apps/api";
import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import { tauriTestAtom } from "../atoms/atoms";

export interface UseTauriOS {
  isUnknown: boolean;
  isWeb: boolean;
  isLinux: boolean;
  isMacOS: boolean;
  isWindows: boolean;
}

export const useTauriOS = () => {
  const [is, setIs] = useAtom(tauriTestAtom);

  useEffect(() => {
    const f = async () => {
      if (window.__TAURI__) {
        setIs(await os.type());
        return;
      }
      setIs("web");
    };
    f();
  }, [setIs]);

  return {
    isUnknown: is === "",
    isWeb: is === "web",
    isLinux: is === "Linux",
    isMacOS: is === "Darwin",
    isWindows: is === "Windows_NT",
  } as UseTauriOS;
};

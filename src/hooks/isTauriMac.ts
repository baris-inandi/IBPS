import { os } from "@tauri-apps/api";
import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";
import { isMacOSAtom } from "../atoms/atoms";

export const useIsTauriMacOS = () => {
    const [is, setIs] = useAtom(isMacOSAtom);

    useEffect(() => {
        const f = async () => {
            // TODO: Fix this
            setIs(window.__TAURI__ && (await os.type()) === "Darwin");
        };
        f();
    }, [setIs]);

    return is;
};

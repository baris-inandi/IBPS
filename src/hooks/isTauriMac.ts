import { os } from "@tauri-apps/api";
import { useEffect, useState } from "preact/hooks";

export const useIsTauriMacOS = () => {
    const [is, setIs] = useState(false);

    useEffect(() => {
        const f = async () => {
            setIs(window.__TAURI__ && (await os.type()) === "Darwin");
        };
        f();
    }, [setIs]);

    return is;
};

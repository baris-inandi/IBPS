import { invoke } from "@tauri-apps/api";
import init, { ibps_to_py, ibpscomp_rs_version } from "ibpscomp-rs";

const ibpsToPy = async (code: string): Promise<string> => {
    const output = (msg: string) => {
        console.groupCollapsed("Intermediate Representation");
        console.log(msg);
        console.groupEnd();
    };
    if (window.__TAURI__) {
        console.log("Calling *native* IBPS compiler...");
        const out: string = await invoke("ibps_to_py_tauri", { code });
        output(out);
        return out;
    }
    await init();
    const out = ibps_to_py(code);
    output(out);
    return out;
};

export const getCompilerVersion = async () => {
    if (window.__TAURI__) {
        const out: string = await invoke("ibpscomp_rs_version_tauri");
        return out;
    }
    await init();
    return ibpscomp_rs_version();
};

export default ibpsToPy;

import { invoke } from "@tauri-apps/api";
import init, { compiler_version, ibps_to_py } from "ibps-comp";

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
    const out: string = await invoke("compiler_version_tauri");
    return out;
  }
  await init();
  return compiler_version();
};

export default ibpsToPy;

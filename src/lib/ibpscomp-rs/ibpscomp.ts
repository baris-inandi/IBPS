import init, { ibps_to_py, ibpscomp_rs_version } from "ibpscomp-rs";

const ibpsToPy = async (code: string): Promise<string> => {
    await init();
    const out = ibps_to_py(code);
    console.groupCollapsed("Intermediate Representation");
    console.log(out);
    console.groupEnd();
    return out;
};

export const getCompilerVersion = async () => {
    await init();
    return ibpscomp_rs_version();
};

export default ibpsToPy;


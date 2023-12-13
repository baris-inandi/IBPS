import init, { ibps_to_py, ibpscomp_rs_version } from "ibpscomp-rs";

const ibpsToPy = async (code: string): Promise<string> => {
    await init();
    const out = ibps_to_py(code);
    const split = out.split("####");
    console.log(split[split.length - 1]);
    return out;
};

export const getCompilerVersion = async () => {
    await init();
    return ibpscomp_rs_version();
};

export default ibpsToPy;


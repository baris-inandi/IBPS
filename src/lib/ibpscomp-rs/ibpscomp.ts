import init, { ibps_to_py } from "ibpscomp-rs";

const ibpsToPy = async (code: string): Promise<string> => {
  await init();
  return ibps_to_py(code);
};

export default ibpsToPy;


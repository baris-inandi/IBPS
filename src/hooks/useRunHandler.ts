import { useAtom } from "jotai";
import { ibpsCodeAtom } from "../atoms/atoms";
import ibpsToPy from "../lib/ibpscomp-rs/ibpscomp";

export const useRunHandler = () => {
  const [ibpsCode] = useAtom(ibpsCodeAtom);

  const run = () => {
    ibpsToPy(ibpsCode).then((x) => {
      console.log(x);
    });
  };
  return run;
};

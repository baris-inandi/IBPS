import { useAtom } from "jotai";
import { useEffect } from "react";
import { usePython } from "react-py";
import { ibpsCodeAtom } from "../atoms/atoms";
import ibpsToPy from "../lib/ibpscomp-rs/ibpscomp";
import { WELCOME } from "../lib/welcome";
import useFiles from "./useFiles";

export const useRunHandler = () => {
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  const { isWelcomePage } = useFiles();

  useEffect(() => {
    console.table({ stdout, stderr, isLoading, isRunning });
  }, [stdout, stderr, isLoading, isRunning]);

  const run = async () => {
    const code = isWelcomePage() ? WELCOME : ibpsCode;
    const pycode = await ibpsToPy(code);
    if (!isLoading && !isRunning) {
      console.log("Running Python Code");
      runPython(pycode);
    }
  };
  return run;
};

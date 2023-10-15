import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { usePython } from "react-py";
import { ibpsCodeAtom, outputAtom } from "../atoms/atoms";
import ibpsToPy from "../lib/ibpscomp-rs/ibpscomp";
import { WELCOME } from "../lib/welcome";
import useFiles from "./useFiles";

export const useIbpscomp = () => {
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [, setOutput] = useAtom(outputAtom);
  const [isCompiling, setIsCompiling] = useState(false);

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    isReady,
  } = usePython({
    packages: {
      official: [],
      micropip: ["pyodide-http"],
    },
  });

  useEffect(() => {
    setOutput(stdout);
  }, [stdout, setOutput]);

  const { isWelcomePage } = useFiles();

  const run = async () => {
    const code = isWelcomePage() ? WELCOME : ibpsCode;
    console.log("Running ibpscomp-rs");
    setIsCompiling(true);
    const pycode = await ibpsToPy(code);
    setIsCompiling(false);
    console.log("Compilation finished.");
    if (!isLoading && !isRunning) {
      console.log("Running Python Code");
      runPython(pycode);
    }
  };

  return {
    run,
    isLoading,
    isRunning,
    isCompiling,
    stop: interruptExecution,
    isReady,
    stdout,
    stderr,
  };
};

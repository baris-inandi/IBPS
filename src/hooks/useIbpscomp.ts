import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { usePython } from "react-py";
import { ibpsCodeAtom, outputAtom } from "../atoms/atoms";
import ibpsToPy from "../lib/ibpscomp-rs/ibpscomp";
import { WELCOME } from "../lib/welcome";
import useFiles from "./useFiles";

export const useIbpscomp = () => {
  const [ibpsCode] = useAtom(ibpsCodeAtom);
  const [output, setOutput] = useAtom(outputAtom);
  const [isCompiling, setIsCompiling] = useState(false);
  const [runId, setRunId] = useState(-1);
  const { isWelcomePage } = useFiles();
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
    if (runId !== -1) {
      setOutput((output) => ({ ...output, [runId]: stdout }));
    }
  }, [output, runId, stdout, setOutput]);

  useEffect(() => {
    if (runId !== -1 && stderr.length > 0) {
      const err = `IBPS script exited with an error:\n${stderr}`;
      setOutput((output) => ({
        ...output,
        [runId]: (output[runId] ?? "") + err,
      }));
    }
  }, [output, stderr, setOutput, runId]);

  const run = async () => {
    const r = Date.now();
    setRunId(r);
    const code = isWelcomePage() ? WELCOME : ibpsCode;
    setIsCompiling(true);
    const pycode = await ibpsToPy(code);
    setIsCompiling(false);
    if (!isLoading && !isRunning) {
      await runPython(pycode);
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

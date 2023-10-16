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
  const { activeFile, isWelcomePage } = useFiles();

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
  }, [runId, stdout, setOutput]);

  useEffect(() => {
    if (runId !== -1 && stderr.length > 0) {
      const err = `IBPS script exited with an error:\n${stderr}`;
      setOutput((output) => ({
        ...output,
        [runId]: (output[runId] ?? "") + err,
      }));
    }
  }, [stderr, setOutput, runId]);

  const logToConsole = (msg: string, newline: boolean = false) => {
    setOutput((output) => ({
      ...output,
      [Date.now()]: `[${msg}]${newline ? "\n" : ""}`,
    }));
  };

  const run = async () => {
    const code = isWelcomePage() ? WELCOME : ibpsCode;
    const a = activeFile;
    logToConsole(`Compiling '${a}'`);
    setIsCompiling(true);
    const pycode = await ibpsToPy(code);
    setIsCompiling(false);
    if (!isLoading && !isRunning) {
      logToConsole("Running Script...");
      const start = Date.now() + 1;
      setRunId(start);
      await runPython(pycode);
      const finish = Date.now();
      const elapsed = finish - start;
      logToConsole(`'${a}' finished in ${elapsed}ms`, true);
    }
  };

  return {
    run,
    isLoading,
    isRunning,
    isCompiling,
    stop: () => {
      logToConsole("Script Interrupted", true);
      setRunId(-1);
      interruptExecution();
    },
    isReady,
    stdout,
    stderr,
    output,
  };
};

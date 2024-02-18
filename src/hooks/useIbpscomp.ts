import { useAtom } from "jotai";
import { useEffect, useState } from "preact/hooks";
import { usePython } from "react-py";
import { ibpsCodeAtom, outputAtom } from "../atoms/atoms";
import ibpsToPy from "../lib/ibpscomp-rs/ibpscomp";
import { resolveIbpsIncludes } from "../lib/resolveIbpsIncludes";
import { WELCOME_CODE } from "../lib/welcome";
import useFiles from "./useFiles";

export const useIbpscomp = () => {
    const [ibpsCode] = useAtom(ibpsCodeAtom);
    const [output, setOutput] = useAtom(outputAtom);
    const [isCompiling, setIsCompiling] = useState(false);
    const [runId, setRunId] = useState(-1);
    const { activeFile, isWelcomePage, filesRaw } = useFiles();

    const {
        runPython,
        stdout,
        stderr,
        isLoading,
        isRunning,
        interruptExecution,
        isReady,
        isAwaitingInput,
        sendInput,
    } = usePython({
        packages: {
            official: ["pyodide-http"],
            micropip: [],
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

    const logToConsole = (
        msg: string,
        newline: boolean = false,
        shift: number = 0,
    ) => {
        setOutput((output) => ({
            ...output,
            [Date.now() + shift]: `[${msg}]${newline ? "\n" : ""}`,
        }));
    };

    const run = async () => {
        const code = isWelcomePage() ? WELCOME_CODE : ibpsCode;
        const a = activeFile;
        logToConsole(`Compiling '${a}'`);
        setIsCompiling(true);
        const startCompiling = Date.now();
        const codewithIncludes = resolveIbpsIncludes(
            code,
            [a],
            filesRaw.allFiles,
        );
        const pycode = await ibpsToPy(codewithIncludes);
        const endCompiling = Date.now();
        setIsCompiling(false);
        const elapsedCompiling = endCompiling - startCompiling;
        logToConsole(`Compiled in ${elapsedCompiling}ms`, false, -1);
        if (!isLoading && !isRunning) {
            logToConsole("Running Script...");
            const startRun = Date.now() + 1;
            setRunId(startRun);
            await runPython(pycode);
            const finishRun = Date.now() + 1;
            const elapsedRun = finishRun - startRun;
            logToConsole(`Finished in ${elapsedRun}ms`, true);
        }
    };

    return {
        run,
        isLoading: isLoading || !isReady,
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
        isAwaitingInput,
        sendInput,
    };
};

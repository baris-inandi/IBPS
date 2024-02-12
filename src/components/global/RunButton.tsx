import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { IoPlay, IoSquare } from "react-icons/io5";
import { rightPanelVisibleAtom } from "../../atoms/atoms";
import useFiles from "../../hooks/useFiles";
import { useIbpscomp } from "../../hooks/useIbpscomp";

const RunButton = () => {
    const {
        run,
        isLoading,
        isRunning,
        isCompiling,
        stop,
        isAwaitingInput,
        sendInput,
    } = useIbpscomp();
    const [, setRightPanelVisible] = useAtom(rightPanelVisibleAtom);
    const { activeFile } = useFiles();

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.altKey && event.key === "Enter") {
            document.getElementById("runbutton")?.click();
        }
    }, []);

    useEffect(() => {
        if (isAwaitingInput) {
            const input = prompt("IBPS is requesting an input.") ?? "";
            sendInput(input);
        }
    }, [isAwaitingInput, sendInput]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    // Printing pdf docs is disabled for now

    if (activeFile === "Documentation") {
        return null;
        /* return (
            <button
                onClick={() => {
                    printExternal("/docs");
                }}
                className="flex-shrink-0 text-sm flex items-center gap-2 px-4 h-full rounded-md mr-2 dark:text-idedark-200 dark:bg-idedark-700 bg-blue-500 text-white"
            >
                <IoDownloadOutline className="inline" />
                Download as PDF
            </button>
        ); */
    }

    return (
        <button
            id="runbutton"
            className={`mr-2 flex h-full flex-shrink-0 items-center gap-1 rounded-md px-3 text-sm
            ${
                isLoading || isCompiling
                    ? "cursor-default opacity-60"
                    : "cursor-pointer"
            }
            ${
                isRunning
                    ? "bg-orange-600 text-white dark:bg-orange-400 dark:bg-opacity-60"
                    : "bg-blue-500 text-white dark:bg-idedark-700 dark:text-idedark-200"
            }
            `}
            onClick={() => {
                // force the panel visible
                if (!(isLoading || isCompiling)) {
                    setRightPanelVisible(true);
                }
                // call the required function
                (isLoading || isCompiling
                    ? () => {}
                    : isRunning
                      ? stop
                      : run)();
            }}
        >
            {isLoading ? (
                <span>Please Wait</span>
            ) : isCompiling ? (
                <span>Compiling...</span>
            ) : isRunning ? (
                <>
                    <IoSquare className="inline" />
                    <span>Stop</span>
                </>
            ) : (
                <>
                    <IoPlay className="inline" />
                    <span>Run</span>
                </>
            )}
        </button>
    );
};

export default RunButton;

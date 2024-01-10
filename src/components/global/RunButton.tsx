import { jsPDF } from "jspdf";
import { useCallback, useEffect } from "react";
import { IoPlaySharp, IoSquareSharp } from "react-icons/io5";
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

    if (activeFile === "Documentation") {
        return (
            <button
                onClick={() => {
                    const doc = new jsPDF();
                    doc.html(
                        document.getElementById("ibpsdocs") as HTMLElement,
                        {
                            callback: function (doc) {
                                doc.save();
                            },
                            filename: "IBPS Documentation",
                        },
                    );
                }}
                className="flex-shrink-0 text-sm flex items-center gap-1 px-3 py-[3px] rounded-md mr-2 dark:text-white dark:bg-onedark-800 bg-blue-500 text-white"
            >
                Download as PDF
            </button>
        );
    }

    return (
        <button
            id="runbutton"
            className={`flex-shrink-0 text-sm flex items-center gap-1 px-3 py-[3px] rounded-md mr-2
            ${
                isLoading || isCompiling
                    ? "opacity-50 cursor-default"
                    : "cursor-pointer"
            }
            ${
                isRunning
                    ? "dark:bg-orange-400 dark:bg-opacity-50 bg-orange-600 text-white"
                    : "dark:text-white dark:bg-onedark-800 bg-blue-500 text-white"
            }
            `}
            onClick={
                isLoading || isCompiling ? () => {} : isRunning ? stop : run
            }
        >
            {isLoading ? (
                <span>Please Wait</span>
            ) : isCompiling ? (
                <span>Compiling...</span>
            ) : isRunning ? (
                <>
                    <IoSquareSharp className="inline" />
                    <span>Stop</span>
                </>
            ) : (
                <>
                    <IoPlaySharp className="inline" />
                    <span>Run</span>
                </>
            )}
        </button>
    );
};

export default RunButton;


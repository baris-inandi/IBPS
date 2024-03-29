import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "preact/hooks";
import { IoPlay, IoSquare } from "react-icons/io5";
import { rightPanelVisibleAtom } from "../../../atoms/atoms";
import useFiles from "../../../hooks/useFiles";
import { useIbpscomp } from "../../../hooks/useIbpscomp";
import Modal from "../interact/Modal";

const RunButton = () => {
  const { run, isLoading, isRunning, isCompiling, stop, isAwaitingInput, sendInput } =
    useIbpscomp();
  const [, setRightPanelVisible] = useAtom(rightPanelVisibleAtom);
  const { activeFile } = useFiles();
  const [inputModalVisible, setInputModalVisible] = useState(false);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.altKey && event.key === "Enter") {
      document.getElementById("runbutton")?.click();
    }
  }, []);

  useEffect(() => {
    if (isAwaitingInput) {
      setInputModalVisible(true);
    }
  }, [isAwaitingInput, sendInput]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (activeFile === "Documentation") {
    return null;
  }

  return (
    <>
      <Modal
        key={new Date().valueOf()}
        onSubmit={(stdin) => {
          sendInput(stdin);
        }}
        onCancel={() => {
          sendInput("");
        }}
        requestStringInput="Enter input"
        visible={inputModalVisible}
        setVisible={setInputModalVisible}
      >
        <b>Input requested</b>
        <br />'{activeFile}' is requesting input.
      </Modal>
      <button
        type="button"
        id="runbutton"
        className={`highlight mr-2 flex h-full flex-shrink-0 items-center gap-1 rounded-md px-3 text-sm
            ${isLoading || isCompiling ? "cursor-default opacity-60" : "cursor-pointer"}
            ${
              isRunning
                ? "bg-orange-600 text-white dark:bg-orange-400 dark:bg-opacity-60"
                : "bg-idelight-accent text-white dark:bg-idedark-700 dark:text-idedark-200"
            }
            `}
        onClick={() => {
          // force the panel visible
          if (!(isLoading || isCompiling)) {
            setRightPanelVisible(true);
          }
          // call the required function
          (isLoading || isCompiling ? () => {} : isRunning ? stop : run)();
        }}
      >
        {isLoading ? (
          <span>Please Wait</span>
        ) : isCompiling ? (
          <span>Compiling...</span>
        ) : isRunning ? (
          <>
            <IoSquare />
            <span>Stop</span>
          </>
        ) : (
          <>
            <IoPlay />
            <span>Run</span>
          </>
        )}
      </button>
    </>
  );
};

export default RunButton;

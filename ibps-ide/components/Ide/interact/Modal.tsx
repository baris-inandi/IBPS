import { useSignal } from "@preact/signals";
import { FunctionalComponent } from "preact";
import { ReactNode, useEffect, useRef } from "preact/compat";
import { StateUpdater, useCallback } from "preact/hooks";
import { useDidClickInside } from "../../../hooks/useDidClickInside";

interface ModalProps {
  visible: boolean;
  setVisible: StateUpdater<boolean>;
  onSubmit: (inputValue: string) => void;
  onCancel?: (inputValue: string) => void;
  children?: ReactNode;
  requestStringInput?: string;
  dangerous?: boolean;
}

const Modal: FunctionalComponent<ModalProps> = (props) => {
  if (!props.visible) {
    return null;
  }

  const cancelHandler = () => {
    if (props.onCancel) props.onCancel(text.value);
    props.setVisible(false);
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") cancelHandler();
    else if (event.key === "Enter") {
      props.onSubmit(text.value);
      props.setVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const { ref, didClickInside } = useDidClickInside();
  const text = useSignal("");
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      (inputElement.current as HTMLInputElement).focus();
    }
  }, []);

  return (
    <div
      onClick={(e) => {
        if (!didClickInside(e)) cancelHandler();
      }}
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-neutral-400 bg-opacity-40 dark:bg-black dark:bg-opacity-30"
    >
      <div className="min-w-72 max-w-96 p-4" ref={ref}>
        <div className="w-full rounded-md border border-neutral-400 bg-neutral-100 p-4 shadow-lg dark:border-idedark-700 dark:bg-idedark-900">
          <div className="w-full pb-3 pt-1">{props.children}</div>
          <form
            className="flex h-full w-full flex-grow flex-col items-stretch gap-2"
            onSubmit={() => {
              props.onSubmit(text.value);
              props.setVisible(false);
            }}
          >
            <input
              ref={inputElement}
              className={`${props.requestStringInput ? "" : "hidden"} rounded-md border border-neutral-300 px-3 py-1 dark:border-idedark-700`}
              type="text"
              placeholder={props.requestStringInput}
              onInput={(input) => {
                text.value = input.currentTarget.value;
              }}
              value={text.value}
            />
            <div className="flex gap-2 pt-5">
              <button
                type="button"
                onClick={cancelHandler}
                className="highlight w-full rounded-md bg-neutral-300 px-8 py-2 text-neutral-700 dark:bg-neutral-500 dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`highlight w-full rounded-md px-8 py-2 text-white ${props.dangerous ? "bg-red-600" : "bg-blue-500"}`}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

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
  cancelText?: string;
  submitText?: string;
  hideDefaultButtons?: boolean;
  initialInputValue?: string;
  wide?: boolean;
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
  const text = useSignal(props.initialInputValue ?? "");
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
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-neutral-600 bg-opacity-40 dark:bg-neutral-950 dark:bg-opacity-40"
    >
      <div className={`${props.wide ? "w-[450px]" : "w-96"} p-4`} ref={ref}>
        <div className="w-full rounded-md border border-idelight-400 bg-idelight-100 p-4 shadow-lg dark:border-idedark-700 dark:bg-idedark-900">
          <div className={`w-full ${props.hideDefaultButtons ? "" : "pb-3"} pt-1`}>
            {props.children}
          </div>
          <form
            className="flex h-full w-full flex-grow flex-col items-stretch gap-2"
            onSubmit={() => {
              props.onSubmit(text.value);
              props.setVisible(false);
            }}
          >
            <input
              ref={inputElement}
              className={`${props.requestStringInput ? "" : "hidden"} rounded-md border border-idelight-200 bg-idelight-whitish px-3 py-1 focus:outline-idelight-accent dark:border-idedark-700 dark:bg-idedark-800 dark:focus:outline-idedark-accent`}
              type="text"
              placeholder={props.requestStringInput}
              onInput={(input) => {
                text.value = input.currentTarget.value;
              }}
              value={text.value}
            />
            {props.hideDefaultButtons ? null : (
              <div className="flex gap-2 pt-5">
                <button
                  type="button"
                  onClick={cancelHandler}
                  className="highlight w-full flex-1 rounded-md bg-idelight-300 py-2 text-idelight-800 dark:bg-idedark-700 dark:text-white"
                >
                  {props.cancelText ?? "Cancel"}
                </button>
                <button
                  type="submit"
                  className={`highlight w-full flex-1 text-nowrap rounded-md py-2 text-white ${props.dangerous ? "bg-red-600" : "bg-idelight-accent dark:bg-idedark-accent"}`}
                >
                  {props.submitText ?? "Confirm"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

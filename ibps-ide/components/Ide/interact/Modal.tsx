import { FunctionalComponent, VNode } from "preact";
import { IoClose } from "react-icons/io5";

export interface ModalAtom {
  title: string;
  content: VNode;
}

interface ModalProps {}

const Modal: FunctionalComponent<ModalProps> = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-neutral-900 bg-opacity-70">
      <div className="min-w-80 p-4">
        <div className="min-h-60 w-full rounded-md border border-neutral-500 bg-neutral-100 shadow-lg dark:border-idedark-700 dark:bg-idedark-900">
          <div className="flex w-full items-center justify-between rounded-t-md py-1 text-neutral-700 dark:text-white">
            <div className="px-2 font-medium"></div>
            <button
              type="button"
              className="cursor-pointer pr-2 text-xl font-bold"
              onClick={() => {}}
            >
              <IoClose></IoClose>
            </button>
          </div>
          <div className="flex w-full justify-center px-3 py-2 text-neutral-600 dark:text-idedark-100">
            <img src="/favicon.png" className="h-20" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

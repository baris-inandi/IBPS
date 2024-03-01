import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { IoTrashOutline } from "react-icons/io5";
import { LiaPencilAltSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import useFiles from "../../../../hooks/useFiles";
import FileIcon from "../../global/FileIcon";
import Modal from "../../interact/Modal";

interface FilesPanelFileButtonProps {
  text: string;
  onClick?: () => void;
  cannotRenameOrDelete?: boolean;
  forceIcon?: IconType;
}

const FilesPanelFileButton: FunctionalComponent<FilesPanelFileButtonProps> = (props) => {
  const { activeFile, deleteFile, renameFile, setActiveFile } = useFiles();
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <div className="px-2 py-[1px]">
      <Modal
        key={new Date().valueOf()}
        visible={renameModalVisible}
        setVisible={setRenameModalVisible}
        onSubmit={(newName) => {
          renameFile(props.text, newName);
        }}
        requestStringInput="Enter new file name"
      >
        <b>Rename file:</b>
        <br />'{props.text}'
      </Modal>
      <Modal
        key={new Date().valueOf()}
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onSubmit={() => {
          deleteFile(props.text);
        }}
        dangerous
      >
        Are you sure you want to delete file:
        <br />'{props.text}'? <br />
        <b>This action is cannot be undone.</b>
      </Modal>
      <button
        type="button"
        key={props.text}
        onClick={
          props.onClick ??
          (() => {
            setActiveFile(props.text);
          })
        }
        className={`group flex w-full items-center justify-between rounded-md border-y border-transparent py-[2px] pl-1 pr-2
              ${
                activeFile === props.text
                  ? "border-neutral-300 bg-black bg-opacity-10 text-neutral-900 dark:bg-idedark-400 dark:bg-opacity-30 dark:text-white"
                  : "text-neutral-700 hover:bg-black  hover:bg-opacity-5 dark:text-idedark-200 dark:hover:bg-idedark-400 dark:hover:bg-opacity-20"
              }
              `}
      >
        <div className="flex w-full items-center gap-2 pl-2">
          <div className="shrink-0">
            {props.forceIcon ? <props.forceIcon /> : <FileIcon fileName={props.text} />}
          </div>
          <p className="grow overflow-hidden truncate text-left">{props.text}</p>
          {props.cannotRenameOrDelete === true ? null : (
            <div className="shrink-0">
              <div className="relative hidden items-center gap-2 group-hover:flex">
                <button
                  type="button"
                  onClick={() => {
                    setRenameModalVisible(true);
                  }}
                >
                  <LiaPencilAltSolid></LiaPencilAltSolid>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteModalVisible(true);
                  }}
                >
                  <IoTrashOutline></IoTrashOutline>
                </button>
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default FilesPanelFileButton;

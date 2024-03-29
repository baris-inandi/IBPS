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
  hideIcon?: boolean;
  noPaddingX?: boolean;
  neverActive?: boolean;
}

const FilesPanelFileButton: FunctionalComponent<FilesPanelFileButtonProps> = (props) => {
  const { activeFile, deleteFile, renameFile, setActiveFile } = useFiles();
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <div className={`${props.noPaddingX ? "" : "px-2"} py-[1px]`}>
      <Modal
        key={new Date().valueOf()}
        visible={renameModalVisible}
        setVisible={setRenameModalVisible}
        onSubmit={(newName) => {
          renameFile(props.text, newName);
        }}
        initialInputValue={props.text}
        requestStringInput="Enter new file name"
      >
        Renaming file <b>'{props.text}'</b>
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
        <b>Delete file</b>
        <br />
        Are you sure you want to delete:
        <br />'{props.text}'? <br />
        <br />
        This action is cannot be undone.
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
                !props.neverActive && activeFile === props.text
                  ? "border-idelight-300 bg-idelight-500 bg-opacity-15 text-idelight-800 dark:bg-idedark-400 dark:bg-opacity-30 dark:text-white"
                  : "text-idelight-700 hover:bg-idelight-900 hover:bg-opacity-5 dark:text-idedark-200 dark:hover:bg-idedark-400 dark:hover:bg-opacity-20"
              }
              `}
      >
        <div className="flex w-full items-center gap-2 pl-2">
          <div className="shrink-0">
            <div className={props.hideIcon ? "opacity-0" : ""}>
              {props.forceIcon ? <props.forceIcon /> : <FileIcon fileName={props.text} />}
            </div>
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

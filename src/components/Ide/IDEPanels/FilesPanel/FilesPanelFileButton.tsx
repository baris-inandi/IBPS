import { MouseEventHandler } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { LiaPencilAltSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import useFiles from "../../../../hooks/useFiles";
import FileIcon from "../../../global/FileIcon";

interface FilesPanelFileButtonProps {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isControlled?: boolean;
    forceIcon?: IconType;
}

const FilesPanelFileButton: React.FC<FilesPanelFileButtonProps> = (props) => {
    const { activeFile, deleteFile, renameFile, setActiveFile } = useFiles();

    return (
        <button
            key={props.text}
            onClick={
                props.onClick ??
                (() => {
                    setActiveFile(props.text);
                })
            }
            className={`group flex items-center justify-between w-full px-2 py-[2px] border-y border-transparent
              ${
                  activeFile === props.text
                      ? "bg-black bg-opacity-5 dark:bg-idedark-400 dark:bg-opacity-30 border-neutral-300 text-neutral-800 dark:text-white"
                      : "hover:bg-black hover:bg-opacity-10  dark:hover:bg-idedark-400 dark:hover:bg-opacity-20 text-neutral-700 dark:text-idedark-200"
              }
              `}
        >
            <div className="flex w-full items-center gap-2 pl-2">
                <div className="shrink-0">
                    {props.forceIcon ? (
                        <props.forceIcon />
                    ) : (
                        <FileIcon fileName={props.text} />
                    )}
                </div>
                <p className="text-left grow overflow-hidden truncate">
                    {props.text}
                </p>
                <div className="shrink-0">
                    {props.isControlled ? null : (
                        <div className="items-center gap-2 relative group-hover:flex hidden">
                            <LiaPencilAltSolid
                                onClick={() => {
                                    const n =
                                        prompt(
                                            `Rename ${props.text}`,
                                            props.text,
                                        ) ?? "";
                                    renameFile(props.text, n);
                                }}
                            ></LiaPencilAltSolid>
                            <IoTrashOutline
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete ${props.text}?`,
                                        )
                                    ) {
                                        deleteFile(props.text);
                                    }
                                }}
                            ></IoTrashOutline>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};

export default FilesPanelFileButton;

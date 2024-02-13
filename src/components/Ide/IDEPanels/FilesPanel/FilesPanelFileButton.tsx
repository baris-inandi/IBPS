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
            type="button"
            key={props.text}
            onClick={
                props.onClick ??
                (() => {
                    setActiveFile(props.text);
                })
            }
            className={`group flex w-full items-center justify-between border-y border-transparent px-2 py-[2px]
              ${
                  activeFile === props.text
                      ? "border-neutral-300 bg-black bg-opacity-5 text-neutral-800 dark:bg-idedark-400 dark:bg-opacity-30 dark:text-white"
                      : "text-neutral-700 hover:bg-black  hover:bg-opacity-10 dark:text-idedark-200 dark:hover:bg-idedark-400 dark:hover:bg-opacity-20"
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
                <p className="grow overflow-hidden truncate text-left">
                    {props.text}
                </p>
                <div className="shrink-0">
                    {props.isControlled ? null : (
                        <div className="relative hidden items-center gap-2 group-hover:flex">
                            <button
                                type="button"
                                onClick={() => {
                                    const n =
                                        prompt(
                                            `Rename ${props.text}`,
                                            props.text,
                                        ) ?? "";
                                    renameFile(props.text, n);
                                }}
                            >
                                <LiaPencilAltSolid></LiaPencilAltSolid>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete ${props.text}?`,
                                        )
                                    ) {
                                        deleteFile(props.text);
                                    }
                                }}
                            >
                                <IoTrashOutline></IoTrashOutline>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};

export default FilesPanelFileButton;

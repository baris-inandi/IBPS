import { MouseEventHandler } from "react";
import {
    AiOutlineBook,
    AiOutlineCoffee,
    AiOutlineFileText,
    AiOutlineStar,
} from "react-icons/ai";
import { LiaPencilAltSolid } from "react-icons/lia";
import { SlTrash } from "react-icons/sl";
import useFiles from "../../../../hooks/useFiles";

interface FilesPanelFileButtonProps {
    file: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const FilesPanelFileButton: React.FC<FilesPanelFileButtonProps> = (props) => {
    const { activeFile, deleteFile, renameFile, setActiveFile } = useFiles();

    return (
        <button
            key={props.file}
            onClick={
                props.onClick ??
                (() => {
                    setActiveFile(props.file);
                })
            }
            className={`group flex items-center justify-between w-full px-2 py-[2px] border-y border-transparent text-neutral-800 dark:text-idedark-200
              ${
                  activeFile === props.file
                      ? "bg-neutral-200 dark:bg-idedark-800 border-neutral-300"
                      : "hover:bg-neutral-300 dark:hover:dark:bg-idedark-900"
              }
              `}
        >
            <div className="flex w-full items-center gap-2 pl-2">
                <div className="shrink-0 self-start">
                    {props.file === "Welcome" ? (
                        <AiOutlineCoffee className="inline"></AiOutlineCoffee>
                    ) : props.file === "Documentation" ? (
                        <AiOutlineBook className="inline"></AiOutlineBook>
                    ) : props.file === "Examples" ? (
                        <AiOutlineStar className="inline"></AiOutlineStar>
                    ) : (
                        <AiOutlineFileText className="inline" />
                    )}
                </div>
                <p className="text-left shrink overflow-hidden">{props.file}</p>
                <div className="shrink-0">
                    {props.file === "Welcome" ||
                    props.file === "Documentation" ||
                    props.file === "Examples" ? null : (
                        <div className="items-center gap-2 relative group-hover:opacity-100 opacity-0 flex">
                            <LiaPencilAltSolid
                                onClick={() => {
                                    const n =
                                        prompt(
                                            `Rename ${props.file}`,
                                            props.file,
                                        ) ?? "";
                                    renameFile(props.file, n);
                                }}
                            ></LiaPencilAltSolid>
                            <SlTrash
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            `Are you sure you want to delete ${props.file}?`,
                                        )
                                    ) {
                                        deleteFile(props.file);
                                    }
                                }}
                            ></SlTrash>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};

export default FilesPanelFileButton;

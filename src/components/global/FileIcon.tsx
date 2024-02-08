import {
    IoBookOutline,
    IoCafeOutline,
    IoDocumentOutline,
    IoFileTrayFullOutline,
} from "react-icons/io5";

interface FileIconProps {
    fileName?: string;
}

const FileIcon: React.FC<FileIconProps> = (props) => {
    return props.fileName === "Welcome" ? (
        <IoCafeOutline className="inline"></IoCafeOutline>
    ) : props.fileName === "Documentation" ? (
        <IoFileTrayFullOutline className="inline"></IoFileTrayFullOutline>
    ) : props.fileName === "Examples" ? (
        <IoBookOutline className="inline"></IoBookOutline>
    ) : (
        <IoDocumentOutline className="inline" />
    );
};

export default FileIcon;

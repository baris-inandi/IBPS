import { FunctionalComponent } from "preact";
import {
  IoBookOutline,
  IoCafeOutline,
  IoDocumentOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";

interface FileIconProps {
  fileName?: string;
}

const FileIcon: FunctionalComponent<FileIconProps> = (props) => {
  return props.fileName === "Welcome" ? (
    <IoCafeOutline />
  ) : props.fileName === "Documentation" ? (
    <IoFileTrayFullOutline />
  ) : props.fileName === "Examples" ? (
    <IoBookOutline />
  ) : (
    <IoDocumentOutline />
  );
};

export default FileIcon;

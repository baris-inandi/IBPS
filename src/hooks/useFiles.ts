import { useAtom } from "jotai";
import { compress } from "lz-string";
import { INITIAL_FILES, filesAtom, ibpsCodeAtom } from "../atoms/atoms";
import {
  MAX_FILE_LENGTH_CHARS,
  jsonExceedsDiskUsageCap,
  jsonSizeInBytes,
} from "../lib/jsonDiskUsageUtils";
import toValidFilename from "../lib/toValidFilename";

const useFiles = () => {
  const [files, setFiles] = useAtom(filesAtom);
  const [ibpsCode] = useAtom(ibpsCodeAtom);

  const allFilenames = () => {
    return Object.keys(files.allFiles);
  };

  const newFile = (name: string) => {
    if (name.trim().length === 0) return;
    const n = toValidFilename(allFilenames(), name);
    setFiles({
      active: n,
      allFiles: { ...files.allFiles, [n]: compress("") },
    });
  };

  const deleteFile = (name: string) => {
    delete files.allFiles[name];
    setFiles(files);
    if (files.active === name) {
      const lastFilename = allFilenames().pop() ?? files.active;
      setFiles({ active: lastFilename, allFiles: files.allFiles });
    } else {
      setFiles({ active: files.active, allFiles: files.allFiles });
    }
    if (Object.keys(files.allFiles).length === 0) {
      setFiles(INITIAL_FILES);
    }
  };

  const writeToFile = (name: string, content: string) => {
    // IA: Algorithm here
    const compressed = compress(content);
    const oldFiles = { active: files.active, allFiles: files.allFiles };
    const newFiles = {
      ...files,
      allFiles: { ...files.allFiles, [name]: compressed },
    };
    const oldFilesSize = jsonSizeInBytes(oldFiles);
    const newFilesSize = jsonSizeInBytes(newFiles);
    const oldActiveFileLength = ibpsCode.length;
    const newActiveFileLength = content.length;
    if (
      (jsonExceedsDiskUsageCap(newFiles) && newFilesSize > oldFilesSize) ||
      (newActiveFileLength >= MAX_FILE_LENGTH_CHARS &&
        newActiveFileLength > oldActiveFileLength)
    ) {
      setFiles({ active: files.active, allFiles: files.allFiles });
      return;
    }
    setFiles(newFiles);
  };

  const renameFile = (name: string, newName: string) => {
    const allDifferentFilenames = allFilenames().filter((n) => n !== name);
    if (newName.trim().length === 0) return;
    newName = toValidFilename(allDifferentFilenames, newName);
    if (newName === name) return;
    const fileContent = files.allFiles[name] ?? compress("");
    deleteFile(name);
    newFile(newName);
    setFiles({
      active: files.active,
      allFiles: { ...files.allFiles, [newName]: fileContent },
    });
  };

  const setActiveFile = (name: string) => {
    if (allFilenames().includes(name) || name === "Welcome") {
      setFiles({ ...files, active: name });
    }
  };

  const isWelcomePage = () => {
    return files.active === "Welcome";
  };

  return {
    activeFile: files.active,
    allFilenames,
    newFile,
    deleteFile,
    setFileContent: writeToFile,
    renameFile,
    setActiveFile,
    isWelcomePage,
    filesRaw: files,
  };
};

export default useFiles;

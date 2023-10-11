import { useAtom } from "jotai";
import { INITIAL_FILES, filesAtom } from "../atoms/atoms";
import toValidFilename from "../lib/toValidFilename";
import { INITIAL_FILENAME } from "../lib/welcome";

const useFiles = () => {
  const [files, setFiles] = useAtom(filesAtom);

  const allFilenames = () => {
    return Object.keys(files.allFiles);
  };

  const newFile = (name: string) => {
    const n = toValidFilename(allFilenames(), name);
    if (n.trim().length === 0) return;
    setFiles({ active: n, allFiles: { ...files.allFiles, [n]: "" } });
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

  const setFileContent = (name: string, content: string) => {
    setFiles({
      ...files,
      allFiles: { ...files.allFiles, [name]: content },
    });
  };

  const renameFile = (name: string, newName: string) => {
    const { [name]: _, ...rest } = files.allFiles;
    const n = toValidFilename(allFilenames(), newName);
    setFiles({
      active: n,
      allFiles: {
        ...rest,
        [n]: files.allFiles[name] ?? "Error: Content Lost",
      },
    });
  };

  const setActiveFile = (name: string) => {
    if (allFilenames().includes(name) === false) return;
    setFiles({ ...files, active: name });
  };

  const isWelcomePage = () => {
    return files.active === INITIAL_FILENAME;
  };

  return {
    activeFile: files.active,
    allFilenames,
    newFile,
    deleteFile,
    setFileContent,
    renameFile,
    setActiveFile,
    isWelcomePage,
  };
};

export default useFiles;

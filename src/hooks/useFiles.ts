import { useAtom } from "jotai";
import { compress } from "lz-string";
import { useEffect } from "react";
import { INITIAL_FILES, filesAtom } from "../atoms/atoms";
import {
  FILE_DISK_USAGE_CAP,
  jsonExceedsDiskUsageCap,
  jsonSizeInBytes,
} from "../lib/jsonDiskUsageUtils";
import toValidFilename from "../lib/toValidFilename";

const useFiles = () => {
  const [files, setFiles] = useAtom(filesAtom);

  useEffect(() => {
    console.log(files);
  }, [files]);

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

  const setFileContent = (name: string, content: string) => {
    // IA: Algorithm here
    const compressedContent = compress(content);
    const oldFiles = { active: files.active, allFiles: files.allFiles };
    const newFiles = {
      ...files,
      allFiles: { ...files.allFiles, [name]: compressedContent },
    };
    const oldFilesSize = jsonSizeInBytes(oldFiles);
    const newFilesSize = jsonSizeInBytes(newFiles);
    const oldActiveFileSize = jsonSizeInBytes(
      oldFiles.allFiles[files.active] ?? "",
    );
    const newActiveFileSize = jsonSizeInBytes(
      newFiles.allFiles[files.active] ?? "",
    );
    if (
      (jsonExceedsDiskUsageCap(newFiles) &&
        newFilesSize > oldFilesSize) ||
      (newActiveFileSize >= FILE_DISK_USAGE_CAP &&
        newActiveFileSize > oldActiveFileSize)
    ) {
      setFiles({ active: files.active, allFiles: files.allFiles });
      return;
    }
    setFiles(newFiles);
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
    setFileContent,
    renameFile,
    setActiveFile,
    isWelcomePage,
  };
};

export default useFiles;

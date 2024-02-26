import { useAtom } from "jotai";
import { decompress } from "lz-string";
import { INITIAL_FILES, filesAtom, ibpsCodeAtom } from "../atoms/atoms";
import {
    MAX_FILE_LENGTH_BITS,
    fileExceedsFileDiskUsageCap,
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

    const newFile = (name: string, dontChangeActive = false) => {
        if (name.trim().length === 0) return;
        const n = toValidFilename(allFilenames(), name);
        setFiles({
            active: dontChangeActive ? files.active : n,
            allFiles: { ...files.allFiles, [n]: "" },
        });
        return n;
    };

    const importIBPSorIBWS = (filename: string, content: string) => {
        // indicates whether the file is a valid IBPS workspace file.
        let isIBWS = false;

        // utility function to check if the file size is safe to import
        const isFileSizeSafe = (filename: string, content: string): boolean => {
            if (!fileExceedsFileDiskUsageCap(content)) return true;
            else
                alert(
                    `Cannot import '${filename}': File exceeds the maximum file size of 100kb.`,
                );
            return false;
        };

        try {
            // will raise an exception if the file is not a valid IBWS file.

            // IBWS files must be valid JSON files.
            let c = JSON.parse(content);

            // IBWS files must have a special property __ibps_filetype__.
            if (c.__ibps_filetype__ === "ibws") {
                // All checks passed.
                isIBWS = true;
            }
        } catch (_) {}

        if (isIBWS) {
            // is a workspace (IBWS)
            // this is the parser for IBWS files.

            // parse and decompress the workspace contents
            let c = JSON.parse(decompress(JSON.parse(content).content));

            // This object stores all files inside the workspace.
            let IBWSRecord: Record<string, string> = {};

            for (const key of Object.keys(c)) {
                // Avoid overwriting existing files.
                const n = toValidFilename(allFilenames(), key);
                const currentFileContent = String(c[key]);

                // Add current file to the workspace record if the file size does not exceed the limit.
                if (isFileSizeSafe(key, currentFileContent)) {
                    IBWSRecord[n] = currentFileContent;
                }
            }
            setFiles({
                active: files.active,
                allFiles: { ...IBWSRecord, ...files.allFiles },
            });
        } else {
            // This is a singular IBPS file, not a workspace

            let f = filename;
            if (filename.endsWith(".ibps")) {
                f = filename.slice(0, -5);
            }

            // Avoid overwriting existing files.
            const n = toValidFilename(allFilenames(), f);

            // Write current file if the file size does not exceed the limit.
            if (isFileSizeSafe(n, content)) {
                setFiles({
                    active: n,
                    allFiles: { ...files.allFiles, [n]: content },
                });
            }
        }
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
        const oldFiles = { active: files.active, allFiles: files.allFiles };
        const newFiles = {
            ...files,
            allFiles: { ...files.allFiles, [name]: content },
        };

        // calculate the file sizes of both objects
        const oldFilesSize = jsonSizeInBytes(oldFiles);
        const newFilesSize = jsonSizeInBytes(newFiles);
        const oldActiveFileLength = ibpsCode.length;
        const newActiveFileLength = content.length;

        // Cancel the transaction and roll back if:
        //   - new file storage object exceeds the disk usage cap
        //   - or the new file content exceeds max file length
        if (
            (jsonExceedsDiskUsageCap(newFiles) && newFilesSize > oldFilesSize) ||
            (newActiveFileLength >= MAX_FILE_LENGTH_BITS &&
                newActiveFileLength > oldActiveFileLength)
        ) {
            setFiles({ active: files.active, allFiles: files.allFiles });
            return;
        }

        // if all checks pass, continue the transaction and auto-save the file.
        setFiles(newFiles);
    };

    const renameFile = (name: string, newName: string) => {
        const allDifferentFilenames = allFilenames().filter((n) => n !== name);
        if (newName.trim().length === 0) return;
        newName = toValidFilename(allDifferentFilenames, newName);
        if (newName === name) return;
        const fileContent = files.allFiles[name] ?? "";
        deleteFile(name);
        newFile(newName);
        setFiles({
            active: files.active === name ? newName : files.active,
            allFiles: { ...files.allFiles, [newName]: fileContent },
        });
    };

    const setActiveFile = (name: string) => {
        if (files.allFiles[name] || name === "Welcome" || name === "Documentation") {
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
        setFilesRaw: setFiles,
        importIBPSorIBWS,
    };
};

export default useFiles;

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
        let isIBWS = false;
        const isFileSizeSafe = (filename: string, content: string): boolean => {
            // IA: Error handling to avoid exceeding localStorage quota.
            if (!fileExceedsFileDiskUsageCap(content)) return true;
            else
                alert(
                    `Cannot import '${filename}': File exceeds the maximum file size of 100kb.`,
                );
            return false;
        };
        try {
            let c = JSON.parse(content);
            if (c.__ibps_filetype__ === "ibws") {
                isIBWS = true;
            }
        } catch (_) {}
        if (isIBWS) {
            // is a workspace
            let c = JSON.parse(decompress(JSON.parse(content).content));
            let IBWSRecord: Record<string, string> = {};
            for (const [key, value] of Object.entries(c)) {
                const n = toValidFilename(allFilenames(), key);
                const content = String(value);
                if (isFileSizeSafe(key, content)) IBWSRecord[n] = content;
            }
            setFiles({
                active: files.active,
                allFiles: { ...IBWSRecord, ...files.allFiles },
            });
        } else {
            // is a file, not a workspace
            let f = filename;
            if (filename.endsWith(".ibps")) {
                f = filename.slice(0, -5);
            }
            const n = toValidFilename(allFilenames(), f);
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
        // IA: Algorithm here
        const oldFiles = { active: files.active, allFiles: files.allFiles };
        const newFiles = {
            ...files,
            allFiles: { ...files.allFiles, [name]: content },
        };
        const oldFilesSize = jsonSizeInBytes(oldFiles);
        const newFilesSize = jsonSizeInBytes(newFiles);
        const oldActiveFileLength = ibpsCode.length;
        const newActiveFileLength = content.length;
        if (
            (jsonExceedsDiskUsageCap(newFiles) &&
                newFilesSize > oldFilesSize) ||
            (newActiveFileLength >= MAX_FILE_LENGTH_BITS &&
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
        const fileContent = files.allFiles[name] ?? "";
        deleteFile(name);
        newFile(newName);
        setFiles({
            active: files.active === name ? newName : files.active,
            allFiles: { ...files.allFiles, [newName]: fileContent },
        });
    };

    const setActiveFile = (name: string) => {
        if (
            allFilenames().includes(name) ||
            name === "Welcome" ||
            name === "Documentation"
        ) {
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

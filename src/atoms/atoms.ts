import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import prettyBytes from "pretty-bytes";
import IFiles from "../lib/IFiles";
import {
    DISK_USAGE_CAP_BYTES,
    jsonSizeInBytes,
} from "../lib/jsonDiskUsageUtils";
import { CONSOLE_WELCOME_MSG, WELCOME_CODE } from "../lib/welcome";

export const INITIAL_FILES = {
    active: "Welcome",
    allFiles: {},
};

export const usedDiskSpaceAtom = atom((get) => {
    const files = get(filesAtom);
    const usedSpace = jsonSizeInBytes(files);
    const usedBytesRatio = usedSpace / DISK_USAGE_CAP_BYTES;
    const usedBytesPercentage = usedBytesRatio * 100;
    return {
        usedBytes: usedSpace,
        usedBytesRepr: prettyBytes(
            usedSpace >= DISK_USAGE_CAP_BYTES
                ? DISK_USAGE_CAP_BYTES
                : usedSpace,
        ),
        availableBytes: DISK_USAGE_CAP_BYTES,
        availableBytesRepr: prettyBytes(DISK_USAGE_CAP_BYTES),
        usedBytesPercentage,
        usedBytesRatio,
    };
});

export const ibpsCodeAtom = atom((get) => {
    const files = get(filesAtom);
    const fileName = files.active;
    if (fileName === "Welcome") return WELCOME_CODE;
    const code = files.allFiles[fileName];
    return code ?? "";
});

export const filesAtom = atomWithStorage<IFiles>(
    "jotai__filesAtom",
    INITIAL_FILES,
);

export const outputAtom = atom<Record<number, string>>({
    "0": CONSOLE_WELCOME_MSG,
});


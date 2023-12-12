import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { decompress } from "lz-string";
import prettyBytes from "pretty-bytes";
import IFiles from "../lib/IFiles";
import { DISK_USAGE_CAP, jsonSizeInBytes } from "../lib/jsonDiskUsageUtils";
import { CONSOLE_WELCOME_MSG } from "../lib/welcome";

export const INITIAL_FILES = {
    active: "Welcome",
    allFiles: {},
};

export const usedDiskSpaceAtom = atom((get) => {
    const files = get(filesAtom);
    const usedSpace = jsonSizeInBytes(files);
    const usedBytesRatio = usedSpace / DISK_USAGE_CAP;
    const usedBytesPercentage = usedBytesRatio * 100;
    return {
        usedBytes: usedSpace,
        usedBytesRepr: prettyBytes(
            usedSpace >= DISK_USAGE_CAP ? DISK_USAGE_CAP : usedSpace,
        ),
        availableBytes: DISK_USAGE_CAP,
        availableBytesRepr: prettyBytes(DISK_USAGE_CAP),
        usedBytesPercentage,
        usedBytesRatio,
    };
});

export const activeRightPanelAtom = atomWithStorage(
    "jotai__activeRightPanelAtom",
    0,
);

export const ibpsCodeAtom = atom((get) => {
    const files = get(filesAtom);
    const fileName = files.active;
    const code = files.allFiles[fileName];
    return decompress(code ?? "");
});

export const filesAtom = atomWithStorage<IFiles>(
    "jotai__filesAtom",
    INITIAL_FILES,
);

export const outputAtom = atom<Record<number, string>>({
    "0": CONSOLE_WELCOME_MSG,
});

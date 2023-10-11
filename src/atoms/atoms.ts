import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import prettyBytes from "pretty-bytes";
import { INITIAL_FILENAME } from "../lib/welcome";

export const INITIAL_FILES = {
  active: INITIAL_FILENAME,
  allFiles: { Welcome: "<welcome page>" },
};

export const TOTAL_SPACE = 2000000; // 2 MB

export const usedDiskSpaceAtom = atom((get) => {
  const files = get(filesAtom);
  const size = new TextEncoder().encode(JSON.stringify(files)).length;
  const usedBytesPercentage = (size / TOTAL_SPACE) * 100;
  return {
    usedBytes: size,
    usedBytesRepr: prettyBytes(size),
    availableBytes: TOTAL_SPACE,
    availableBytesRepr: prettyBytes(TOTAL_SPACE),
    usedBytesPercentage,
  };
});

export const activeRightPanelAtom = atomWithStorage<number>(
  "jotai__activeRightPanelAtom",
  0,
);

export const ibpsCodeAtom = atom((get) => {
  const files = get(filesAtom);
  const fileName = files.active;
  const code = files.allFiles[fileName];
  return code ?? "";
});

export const filesAtom = atomWithStorage<{
  active: string;
  allFiles: Record<string, string>;
}>("jotai__filesAtom", INITIAL_FILES);

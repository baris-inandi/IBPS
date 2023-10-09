import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { INITIAL_FILENAME } from "../lib/welcome";

export const INITIAL_FILES = {
  active: INITIAL_FILENAME,
  allFiles: { Welcome: "<welcome page>" },
};

export const ibpsCodeAtom = atom((get) => {
  const files = get(filesAtom);
  const fileName = files.active;
  const code = files.allFiles[fileName];
  return code ?? "<active file is unknown error>";
});

export const filesAtom = atomWithStorage<{
  active: string;
  allFiles: Record<string, string>;
}>("jotai__filesAtom", INITIAL_FILES);


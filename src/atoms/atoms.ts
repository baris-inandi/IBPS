import { atomWithStorage } from "jotai/utils";
import DEFAULT_CODE from "../lib/defaultIbpsCode";

export const ibpsCodeAtom = atomWithStorage(
  "jotai__ibpsCodeAtom",
  DEFAULT_CODE,
);

export const currentFileAtom = atomWithStorage(
  "jotai__currentFileAtom",
  "<unknown>.ibps",
);

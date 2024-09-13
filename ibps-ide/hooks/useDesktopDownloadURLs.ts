import { useEffect, useState } from "preact/hooks";
import { getVersion } from "@tauri-apps/api/app";

export type UseDesktopDownloadURLs = {
  version: string;
  macos: string;
  windows: string;
  genericDownloadPage: string;
  updateAvailable?: boolean;
};

export const useDesktopDownloadURLs = (): UseDesktopDownloadURLs | undefined => {
  const [out, setOut] = useState<UseDesktopDownloadURLs | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const USER = "baris-inandi";
      const REPO = "ibps";
      const apiEndpoint = `https://api.github.com/repos/${USER}/${REPO}/releases/latest`;
      const response = await (await fetch(apiEndpoint)).json();
      const assets = response.assets;
      const macos: string = assets.find((asset: any) =>
        asset.name.includes(".dmg"),
      )?.browser_download_url;
      const windows: string = assets.find(
        (asset: any) => asset.name.includes("x64") && asset.name.includes(".exe"),
      )?.browser_download_url;
      setOut({
        version: response.tag_name,
        macos,
        windows,
        genericDownloadPage: `https://github.com/${USER}/${REPO}/releases/latest`,
        updateAvailable: window.__TAURI__ && (await getVersion()) !== response.tag_name,
      });
    })();
  }, [setOut]);

  return out;
};

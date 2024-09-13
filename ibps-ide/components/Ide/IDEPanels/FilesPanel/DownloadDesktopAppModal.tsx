import { useDesktopDownloadURLs } from "../../../../hooks/useDesktopDownloadURLs";

const DownloadDesktopAppModal: React.FC = () => {
  const secondaryButton =
    "cursor-pointer highlight w-full flex-1 rounded-md bg-idelight-300 py-2 px-3 text-idelight-800 dark:bg-idedark-700 dark:text-white";
  const primaryButton =
    "cursor-pointer highlight w-full flex-1 text-nowrap rounded-md bg-idelight-accent py-2 px-3 text-white dark:bg-idedark-accent";
  const downloadURLs = useDesktopDownloadURLs();

  const os = undefined; // TODO: Implement this later

  return (
    <div className="flex h-full w-full flex-col items-center gap-2">
      <img
        alt="IBPS IDE Icon"
        src="/favicon.png"
        className="mb-2 h-20 w-20 mix-blend-luminosity"
      ></img>
      <div className="text-lg font-medium">IBPS IDE for Desktop</div>
      <div className="pb-4">Download and install the new desktop app</div>
      <a
        href={downloadURLs?.macos}
        className={os === "macOS" ? primaryButton : secondaryButton}
      >
        Download for macOS
      </a>
      <a
        href={downloadURLs?.windows}
        className={os === "Windows" ? primaryButton : secondaryButton}
      >
        Download for Windows
      </a>
    </div>
  );
};

export default DownloadDesktopAppModal;

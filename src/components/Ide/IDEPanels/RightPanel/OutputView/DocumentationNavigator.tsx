import { useAtom } from "jotai";
import { docsIdAtom } from "../../../../../atoms/atoms";

const DocumentationNavigator: React.FC = () => {
    const [docsId] = useAtom(docsIdAtom);

    return (
        <div className="flex h-full w-full flex-col gap-1 overflow-y-scroll pb-20 pl-2 pt-3">
            {docsId.map
                ? docsId.map((docsHeading) => {
                      return (
                          <button
                              data-points-to={docsHeading.id}
                              onClick={() => {
                                  Array.from(
                                      document.getElementsByTagName("details"),
                                  ).forEach((x) => (x.open = true));
                                  document.getElementById("ibpsdocs")?.scroll({
                                      top:
                                          (document.getElementById(
                                              docsHeading.id,
                                          )?.offsetTop ?? 0) - 40,
                                  });
                              }}
                              style={{
                                  paddingLeft: (docsHeading.level - 2) * 16,
                              }}
                              key={docsHeading.id}
                              className={`text-left
                              ${
                                  docsHeading.level <= 2
                                      ? "pt-3 text-lg font-bold" // h2
                                      : docsHeading.level === 3
                                        ? "font-medium text-neutral-800 dark:text-neutral-300" // h3
                                        : "text-neutral-500 dark:text-neutral-400" // h4-6
                              }`}
                          >
                              {docsHeading.text}
                          </button>
                      );
                  })
                : ""}
        </div>
    );
};

export default DocumentationNavigator;

import { useAtom } from "jotai";
import { docsIdAtom } from "../../../../../atoms/atoms";

const DocumentationNavigator: React.FC = () => {
    const [docsId] = useAtom(docsIdAtom);

    return (
        <div className="flex flex-col gap-1 pt-3 pb-20 h-full w-full overflow-y-scroll">
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
                                  paddingLeft: (docsHeading.level - 2) * 12,
                              }}
                              key={docsHeading.id}
                              className={`text-left
                              ${
                                  docsHeading.level <= 2
                                      ? "text-lg font-bold pt-3" // h2
                                      : docsHeading.level === 3
                                      ? "font-medium text-stone-800 dark:text-stone-300" // h3
                                      : "text-stone-500 dark:text-stone-400" // h4-6
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

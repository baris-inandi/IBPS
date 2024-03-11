import { FunctionalComponent } from "preact";

interface DocsCodeProps {
  children?: React.ReactNode;
  block?: boolean;
}

const DocsCode: FunctionalComponent<DocsCodeProps> = (props) => {
  const code = (props.children?.toString() ?? "").trim();

  if (props.block)
    return (
      <pre className="my-1 w-full shrink-0 overflow-x-auto whitespace-pre-line rounded-md bg-idelight-100 py-2 pl-4 pr-4 font-mono text-idelight-600 dark:bg-idedark-900 dark:text-idedark-300">
        <pre className="fit-content pr-4">{code}</pre>
      </pre>
    );
  return (
    <div className="inline shrink-0 rounded-md bg-idelight-100 px-1 font-mono text-idelight-600 dark:bg-idedark-900 dark:text-idedark-300">
      {code}
    </div>
  );
};

export default DocsCode;

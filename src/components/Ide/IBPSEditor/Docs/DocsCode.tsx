interface DocsCodeProps {
    children?: React.ReactNode;
    block?: boolean;
}

const DocsCode: React.FC<DocsCodeProps> = (props) => {
    const code = (props.children?.toString() ?? "").trim();

    if (props.block)
        return (
            <pre className="my-1 w-full overflow-x-scroll whitespace-pre-line rounded-sm bg-neutral-100 py-2 pl-4 pr-4 font-mono text-neutral-600 dark:bg-idedark-900 dark:text-idedark-300">
                <pre className="fit-content pr-4">{code}</pre>
            </pre>
        );
    return (
        <div className="inline rounded-sm bg-neutral-100 px-1 font-mono text-neutral-600 dark:bg-idedark-900 dark:text-idedark-300">
            {code}
        </div>
    );
};

export default DocsCode;

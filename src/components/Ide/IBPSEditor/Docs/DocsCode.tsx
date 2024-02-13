interface DocsCodeProps {
    children?: React.ReactNode;
    block?: boolean;
}

const DocsCode: React.FC<DocsCodeProps> = (props) => {
    const code = (props.children?.toString() ?? "").trim();
    // TODO: this makes the code SCROLL ON Y AXIS WHEN WINDOW TOO WIDE

    if (props.block)
        return (
            <pre className="my-1 w-full overflow-x-auto whitespace-pre-line rounded-md bg-neutral-100 py-2 pl-4 pr-4 font-mono text-neutral-600 dark:bg-idedark-900 dark:text-idedark-300">
                <pre className="fit-content pr-4">{code}</pre>
            </pre>
        );
    return (
        <div className="inline rounded-md bg-neutral-100 px-1 font-mono text-neutral-600 dark:bg-idedark-900 dark:text-idedark-300">
            {code}
        </div>
    );
};

export default DocsCode;

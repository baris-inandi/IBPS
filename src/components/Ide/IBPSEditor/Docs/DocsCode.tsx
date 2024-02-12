import { Code, CodeBlock, codepen, monoBlue } from "react-code-blocks";
import usePrefersColorScheme from "use-prefers-color-scheme";

interface DocsCodeProps {
    children?: React.ReactNode;
    block?: boolean;
}

const DocsCode: React.FC<DocsCodeProps> = (props) => {
    const colorScheme = usePrefersColorScheme();
    const code = (props.children?.toString() ?? "").trim();

    if (props.block)
        return (
            <div className="docscode">
                <CodeBlock
                    language="text"
                    text={code}
                    showLineNumbers={true}
                    theme={colorScheme === "dark" ? codepen : monoBlue}
                />
            </div>
        );
    return (
        <div className="docscode inline">
            <Code
                language="text"
                text={code}
                theme={colorScheme === "dark" ? codepen : monoBlue}
            />
        </div>
    );
};

export default DocsCode;

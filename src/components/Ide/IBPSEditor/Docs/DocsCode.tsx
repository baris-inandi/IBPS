import { Code, CodeBlock, paraisoLight, vs2015 } from "react-code-blocks";
import usePrefersColorScheme from "use-prefers-color-scheme";

interface DocsCodeProps {
    children?: React.ReactNode;
    block?: boolean;
}

const DocsCode: React.FC<DocsCodeProps> = (props) => {
    const colorScheme = usePrefersColorScheme();

    const normalizeIndentation = (inputString: string): string => {
        const i = inputString.trim();
        const lines = i.split("\n");

        // Find the minimum indentation
        let minIndentation = Infinity;
        for (const line of lines) {
            const match = line.match(/^\s*/);
            if (match && match[0].length > 0) {
                minIndentation = Math.min(minIndentation, match[0].length);
            }
        }

        // Replace each line with normalized indentation
        const normalizedLines = lines.map((line) => {
            const leadingSpaces = line.match(/^\s*/)?.[0].length || 0;
            const normalizedIndentation = " ".repeat(
                Math.max(0, leadingSpaces - minIndentation),
            );
            return normalizedIndentation + line.trim();
        });

        return normalizedLines.join("\n");
    };

    const code = normalizeIndentation(props.children?.toString() ?? "");

    if (props.block)
        return (
            <div className="docscode">
                <CodeBlock
                    language="text"
                    text={code}
                    showLineNumbers={true}
                    theme={colorScheme === "dark" ? vs2015 : paraisoLight}
                />
            </div>
        );
    return (
        <div className="docscode">
            <Code language="text" text={code} />
        </div>
    );
};

export default DocsCode;


import { useAtom } from "jotai";
import { useEffect } from "react";
import { docsIdAtom } from "../../../../atoms/atoms";

interface DocsSecProps {
    text: string;
    level: number;
    children?: React.ReactNode;
}

const DocsSec: React.FC<DocsSecProps> = (props) => {
    const Header = `h${props.level}` as keyof JSX.IntrinsicElements;
    const _id = `docs-${props.text.toLowerCase().replace(/ /g, "-")}-${
        props.level
    }`;

    const [, setDocsId] = useAtom(docsIdAtom);

    useEffect(() => {
        setDocsId((prevDocsId) => ({ ...prevDocsId, [_id]: props.level }));
    }, [_id, setDocsId, props.level]);

    return (
        <details open={true} id={_id + "-details"}>
            <summary className="pt-5 select-none cursor-pointer">
                <Header id={_id} className="inline">
                    {props.text}
                </Header>
            </summary>
            {props.children}
        </details>
    );
};

export default DocsSec;


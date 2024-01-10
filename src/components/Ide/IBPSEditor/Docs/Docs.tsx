import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { docsIdAtom } from "../../../../atoms/atoms";
import DocsCode from "./DocsCode";
import DocsSec from "./DocsSec";

export interface DocsTitle {
    level: number;
    text: string;
    id: string;
}

const Docs: React.FC = () => {
    const docsRef = useRef<HTMLDivElement>(null);
    const [, setDocsId] = useAtom(docsIdAtom);

    useEffect(() => {
        const outline = () => {
            const headers = docsRef.current?.querySelectorAll(
                "h1, h2, h3, h4, h5, h6",
            );
            if (!headers) return;
            const newDocsId: Array<DocsTitle> = [];
            headers.forEach((header) => {
                const level = parseInt(header.tagName[1] ?? "1");
                const text = header.textContent ?? "";
                const _id = header.id ?? "";
                newDocsId.push({
                    level,
                    text,
                    id: _id,
                });
            });
            setDocsId(newDocsId);
        };
        outline();
    }, [setDocsId]);

    return (
        <div
            id="ibpsdocs"
            ref={docsRef}
            className="scroll-smooth markdown select-text flex gap-5 flex-col px-9 pt-3 bg-white dark:bg-onedark-900 h-full w-full overflow-y-scroll pb-40"
        >
            <div className="h1">The IBPS Programming Language</div>
            <p>
                The International Baccalaureate (IB) Diploma Program Computer
                Science course has a very specific Pseudocode specification. The
                IBPS Programming Language is a high-level programming language
                that is designed to be similar to the IB Pseudocode and fully
                compliant with the IB's rules for writing pseudocode:
            </p>
            <ul>
                <li>
                    <a href="https://ib.compscihub.net/wp-content/uploads/2015/04/IB-Pseudocode-rules-more.pdf">
                        Approved notation for devleoping pseudocode
                    </a>
                </li>
                <li>
                    <a href="https://ib.compscihub.net/wp-content/uploads/2015/04/IB-Pseudocode-rules.pdf">
                        Pseudocode in Examinations
                    </a>
                </li>
            </ul>
            <DocsSec level={2} text="General Syntax">
                <p>
                    IBPS is a superset of Python and is compliant to the IB
                    Pseudocode standards. Therefore IBPS is an indented,
                    strongly and dynamically typed programming language.
                </p>
                <DocsSec level={3} text="Indentation">
                    <p>
                        IBPS requires scripts to be indented. It is
                        indentation-sensitive, so code should be properly
                        indented to run.
                    </p>
                    <DocsCode block>
                        {`
                    if true
                        output "Hello World"
                        // The line above should be properly indented
                    end if
                    `}
                    </DocsCode>
                    <p>
                        When indenting, prefer using 4 spaces or a tab
                        character.
                    </p>
                </DocsSec>
                <DocsSec level={3} text="Comments">
                    <p>IBPS Accepts both C-like and Python-like comments.</p>
                    <p>For inline comments, use:</p>
                    <DocsCode block>
                        {`
                    output "hello" // This is a comment
                    output "hello" # This is also a comment
                    `}
                    </DocsCode>
                    <p>For multiline comments, use:</p>
                    <DocsCode block>
                        {`
                    /* This is a multiline comment
                    This is still a comment */

                    output "This is code"

                    """
                    And these are also
                    multiline comments!
                    """
                    `}
                    </DocsCode>
                    <p>
                        All text inside comments will be ignored by the
                        compiler.
                    </p>
                </DocsSec>
            </DocsSec>
            <DocsSec level={2} text="Basics">
                <DocsSec level={3} text="Variables" />
                <DocsSec level={3} text="Functions" />
                <DocsSec level={3} text="Classes" />
                <DocsSec level={3} text="Control Flow">
                    <DocsSec level={4} text="If/Else" />
                    <DocsSec level={4} text="For-loops" />
                    <DocsSec level={4} text="While-loops" />
                    <DocsSec level={4} text="Until-loops" />
                </DocsSec>
            </DocsSec>
            <DocsSec level={2} text="Builtins and the Standard Library">
                <DocsSec level={3} text="Primitives">
                    <DocsSec level={4} text="Boolean"></DocsSec>
                    <DocsSec level={4} text="Integer"></DocsSec>
                    <DocsSec level={4} text="Float and Double"></DocsSec>
                    <DocsSec level={4} text="HashMap"></DocsSec>
                </DocsSec>
                <DocsSec level={3} text="Data Structures">
                    <DocsSec level={4} text="String"></DocsSec>
                    <DocsSec level={4} text="Array"></DocsSec>
                    <DocsSec level={4} text="Collection"></DocsSec>
                    <DocsSec level={4} text="Stack"></DocsSec>
                    <DocsSec level={4} text="Queue"></DocsSec>
                    <DocsSec level={4} text="HashMap"></DocsSec>
                </DocsSec>
            </DocsSec>
            <DocsSec level={2} text="Best Practices">
                <DocsSec level={3} text="Naming Conventions">
                    <p>In short, IBPS naming conventions </p>
                    IBPS variables should be CAPITALIZED.
                </DocsSec>
            </DocsSec>
        </div>
    );
};

export default Docs;


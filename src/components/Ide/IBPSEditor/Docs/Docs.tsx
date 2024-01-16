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

const Docs: React.FC<{
    className?: string;
    print?: boolean;
}> = (props) => {
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
            style={{
                zoom: props.print ? 0.8 : "unset",
            }}
            className={`scroll-smooth markdown select-text flex gap-5 flex-col px-9 pt-3 bg-white dark:bg-onedark-900 ${
                props.print ? "leading-snug" : "h-full w-full overflow-y-scroll"
            } pb-40 ${props.className}`}
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
if true then
    output "Hello World"
    // The line above should be properly indented
end if
`}
                    </DocsCode>
                    <p>
                        When indenting, prefer using <b>4 spaces</b> or one{" "}
                        <b>tab</b>.
                    </p>
                </DocsSec>
                <DocsSec level={3} text="Comments">
                    <p>IBPS accepts both C-like and Python-like comments.</p>
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
lines inside
a multiline comment!
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
                <DocsSec level={3} text="Variables">
                    <p>
                        IBPS variables are defined using the{" "}
                        <DocsCode>NAME = VALUE</DocsCode> syntax:
                    </p>
                    <DocsCode block>
                        {`
NAME = "John Doe"
AGE = 21
`}
                    </DocsCode>
                </DocsSec>
                <DocsSec level={3} text="Input/Output">
                    <DocsSec level={4} text="Output">
                        <p>
                            Use the <DocsCode>output</DocsCode> keyword to write
                            a value to the console.
                        </p>
                        <DocsCode block>
                            {`
output "Hello World!"
X = "hello"
output X
`}
                        </DocsCode>
                        <p>
                            Alternatively, <DocsCode>output</DocsCode> can be
                            called as a function:
                        </p>
                        <DocsCode block>
                            {`
output("Hello World!")
`}
                        </DocsCode>
                    </DocsSec>
                    <DocsSec level={4} text="Input">
                        <p>
                            Use the <DocsCode>input</DocsCode> keyword to read a
                            value from the console. The value will be stored in
                            the variable proceeding the keyword.{" "}
                            <DocsCode>input</DocsCode> will always return a{" "}
                            <DocsCode>String</DocsCode>.
                        </p>
                        <DocsCode block>
                            {`
output "What is your name?"
input NAME
output "Hello " + NAME + "!"
`}
                        </DocsCode>
                        <p>
                            Similarly, <DocsCode>input</DocsCode> can be called
                            as a funciton:{" "}
                        </p>
                        <DocsCode block>
                            {`
NAME = input("What is your name?")
output "Hello " + NAME + "!"
`}
                        </DocsCode>
                        <DocsSec level={4} text="Input Casting">
                            <p>
                                As of compiler version 0.2.3, inputs can have a
                                specified type. For example:
                            </p>
                            <DocsCode block>
                                {`
Integer input AGE // AGE is an Integer
                                `}
                            </DocsCode>
                            <p>is a shortand for:</p>
                            <DocsCode block>
                                {`
input AGE
AGE = Integer(AGE)
                                `}
                            </DocsCode>
                            <p>
                                Input casting can be used to cast an input to
                                any type:
                            </p>
                            <DocsCode block>{`
Double input FOO
Boolean input BAR
Integer input BAZ
                            `}</DocsCode>
                            <p>
                                Note that if the given input cannot be converted
                                to the specified type, for example, if the user
                                inputs "Hello" to an integer-cast input, a{" "}
                                <DocsCode>ValueError</DocsCode> will be raised.
                            </p>
                        </DocsSec>
                    </DocsSec>
                </DocsSec>
                <DocsSec level={3} text="Functions (Submethods)">
                    <p>
                        IBPS functions are defined using the{" "}
                        <DocsCode>sub</DocsCode> keyword. The body of a function
                        should be indented and the function should be ended
                        using the <DocsCode>end</DocsCode> keyword.
                    </p>
                    <p>Function calls are made using the paranthesis syntax</p>
                    <DocsCode block>
                        {`
sub greet()
    output "Hello World!"
end sub

greet() // prints "Hello World!"
`}
                    </DocsCode>
                    <p>
                        Function parameters can be defined inside the
                        parantheses:
                    </p>
                    <DocsCode block>
                        {`
sub greet(NAME, LAST_NAME)
    output "Hello " + NAME + " " + LAST_NAME + "!"
end sub

greet("John", "Doe") // prints "Hello John Doe!"
`}
                    </DocsCode>
                    <p>
                        Functions can return any value using the{" "}
                        <DocsCode>return</DocsCode> keyword:
                    </p>
                    <DocsCode block>
                        {`
sub isOver18(AGE)
    return AGE > 18
end sub

X = isOver18(21)
output X // prints "True"
`}
                    </DocsCode>
                </DocsSec>
                <DocsSec level={3} text="Control Flow">
                    <DocsSec level={4} text="If/Else">
                        <p>If/Else statements are formatted like so:</p>
                        <DocsCode block>
                            {`
// Get user input
Integer input AGE

// Check the user's age
if AGE > 21 then
    output "You are over 21!"
else if AGE > 18 then
    output "You are over 18!"
else
    output "You are under 18!"
end if
                            `}
                        </DocsCode>
                    </DocsSec>
                    <DocsSec level={4} text="For Loops">
                        <p>For loops are formatted like so:</p>
                        <DocsCode block>
                            {`
loop I from 0 to 3
    output I
end loop
// 0, 1, 2, 3
                            `}
                        </DocsCode>
                        <p>
                            Note that ranges in IBPS for-loops are inclusive.
                            Therefore, iterating over an{" "}
                            <DocsCode>Array</DocsCode> using the index can be
                            done like so:
                        </p>
                        <DocsCode block>
                            {`
X = Array()
X.push("First")
X.push("Second")
X.push("Third")

loop I from 0 to X.length - 1
    output I, X[I]
end loop

/*
0 First
1 Second
2 Third
*/
`}
                        </DocsCode>
                        <p>
                            Even though the IB Pseudocode specification does not
                            implement this feature, to directly iterate over
                            elements of an iterable (instead of its indices),
                            Python notation for-loops can be used:
                        </p>
                        <DocsCode block>
                            {`
for I in X:
    output I
end loop

/*
First
Second
Third
*/
`}
                        </DocsCode>
                    </DocsSec>
                    <DocsSec level={4} text="While Loops">
                        <p>While loops are formatted like so:</p>
                        <DocsCode block>
                            {`
X = 0
loop while X < 3
    output X
    X = X + 1 // or X +=1
end loop
// 0, 1, 2
`}
                        </DocsCode>
                        <p>
                            The code block will be repeated until the condition
                            is no longer met. Note that the condition is checked
                            before execution, so the code block will never run
                            if the condition is not met initially.
                        </p>
                    </DocsSec>
                    <DocsSec level={4} text="Until Loops (do...while)">
                        <p>
                            Until loops (called <DocsCode>do...while</DocsCode>{" "}
                            in some languages) are formatted like so:
                        </p>
                        <DocsCode block>
                            {`
X = ""
loop until X == ""
    input X
end loop

// will repeatedly ask for input until the user inputs something
`}
                        </DocsCode>
                        <p>
                            The only difference between a while loop and an
                            until loop is that the condition is checked after
                            the code block is executed. This guarantees that the
                            code block will run at least once.
                        </p>
                    </DocsSec>
                </DocsSec>
                <DocsSec level={3} text="Classes">
                    <p>
                        Classes can be defined using Python syntax. Submethods
                        can be defined using IBPS notation:
                    </p>
                    <DocsCode block>
                        {`
class Person:
    sub __init__(THIS, NAME, AGE)
        THIS.NAME = NAME
        THIS.AGE = AGE
    end sub
end class
`}
                    </DocsCode>
                    <p>
                        To use object oriented patterns, refer to{" "}
                        <a href="https://docs.python.org/3/tutorial/classes.html">
                            Python documentation
                        </a>
                        .
                    </p>
                </DocsSec>
                <DocsSec level={3} text="The 'end' Keyword">
                    <p>
                        IBPS uses the <DocsCode>end</DocsCode> keyword to end a
                        scope.
                    </p>
                    <p>
                        <b>Pro Tip: </b>While the IB Pseudocode specification
                        requires the usage of the <DocsCode>end</DocsCode>{" "}
                        keyword, IBPS tolerates the omission of{" "}
                        <DocsCode>end</DocsCode> statements. Hence, the
                        following example should compile as long as indentation
                        is correct:
                    </p>
                    <DocsCode block>
                        {`
if true then
    output "Hello World"
`}
                    </DocsCode>
                </DocsSec>
            </DocsSec>
            <DocsSec level={2} text="Builtins and the Standard Library">
                <DocsSec level={3} text="Primitives">
                    <DocsSec level={4} text="Boolean">
                        <p>
                            Booleans literals are represented using the{" "}
                            <DocsCode>true</DocsCode> and{" "}
                            <DocsCode>false</DocsCode> singletons.
                        </p>
                    </DocsSec>
                    <DocsSec level={4} text="Integer">
                        <p>
                            The <DocsCode>Integer</DocsCode> class is used to
                            represent integers. To convert any compatible type
                            to an integer, call the constructor and pass the
                            value:
                        </p>
                        <DocsCode block>
                            {`
FOO = 42 // Just an integer
BAR = Integer("10") // Converts the string "10" to an integer, returns 10
BAZ = Integer(3.14) // Removes all decimal places, returns 3
                            `}
                        </DocsCode>
                    </DocsSec>
                    <DocsSec level={4} text="Float and Double">
                        <p>
                            Floating-point values are represented using the{" "}
                            <DocsCode>Double</DocsCode> class. In IBPS,{" "}
                            <DocsCode>Float</DocsCode> is an alias for{" "}
                            <DocsCode>Double</DocsCode>. All floating-point
                            values are double-precision. To convert any
                            compatible type to a double, call the constructor
                            and pass the value:
                        </p>
                        <DocsCode block>
                            {`
FOO = 3.1415 // Just a floating-point number
BAR = Double(10) // returns 10.0
BAZ = Float(42) // returns 42.0
QUX = Float("3.14") // returns 3.14
                            `}
                        </DocsCode>
                    </DocsSec>
                    <DocsSec level={4} text="NoneType">
                        <p>
                            In IBPS, the <DocsCode>null</DocsCode> singleton
                            represents a value that does not exist.{" "}
                            <DocsCode>NoneType</DocsCode> is the type of{" "}
                            <DocsCode>null</DocsCode>.
                        </p>
                        <p>
                            Note that <DocsCode>null</DocsCode>,{" "}
                            <DocsCode>none</DocsCode>, and{" "}
                            <DocsCode>None</DocsCode> can be used
                            interchangeably.
                        </p>
                        <p>
                            For example, a function is equivalent to{" "}
                            <DocsCode>null</DocsCode> if it does not return.
                        </p>
                        <DocsCode block>
                            {`
sub doesNotReturn()
    output "Called function!"
end sub

X = doesNotReturn() // X is null.
`}
                        </DocsCode>
                        <p>
                            <DocsCode>null</DocsCode> also can be used to
                            initialize an object:
                        </p>
                        <DocsCode block>
                            {`
// null can be used to initialize an object
input X
FOO = null
if X == CORRECT_PASSWORD then
    FOO = X
end if
`}
                        </DocsCode>
                    </DocsSec>
                </DocsSec>
                <DocsSec level={3} text="Data Structures">
                    <DocsSec level={4} text="String"></DocsSec>
                    <DocsSec level={4} text="list"></DocsSec>
                    <DocsSec level={4} text="Array"></DocsSec>
                    <DocsSec level={4} text="Collection"></DocsSec>
                    <DocsSec level={4} text="Stack"></DocsSec>
                    <DocsSec level={4} text="Queue"></DocsSec>
                    <DocsSec level={4} text="HashMap"></DocsSec>
                </DocsSec>
            </DocsSec>
            <DocsSec level={2} text="Best Practices">
                <DocsSec level={3} text="Naming Conventions">
                    <p>Below are IBPS naming conventions</p>
                    <ul>
                        <li>
                            Variable names should be <b>CAPITALIZED</b>.
                        </li>
                        <li>
                            Function names should be <b>camelCase</b>.
                        </li>
                        <li>
                            Class names should be <b>PascalCase</b>.
                        </li>
                        <li>
                            Method names should be <b>camelCase</b>.
                        </li>
                    </ul>
                </DocsSec>
            </DocsSec>
            <DocsSec level={2} text="Further Help">
                <p>
                    <b>Pro Tip: </b>To get help on a specific class or function,
                    call the <DocsCode>help</DocsCode> function. Try{" "}
                    <DocsCode>help(Stack)</DocsCode>!
                </p>
            </DocsSec>
        </div>
    );
};

export default Docs;
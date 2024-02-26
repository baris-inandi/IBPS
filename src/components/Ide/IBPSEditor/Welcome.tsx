import Ahref from "../global/Ahref";
import DocsCode from "./Docs/DocsCode";

const Welcome = () => {
    return (
        <div className="flex h-full w-full select-text flex-col gap-5 overflow-y-auto bg-white p-10 pb-20 dark:bg-idedark-1000">
            <p className="pb-1 text-2xl font-bold">Welcome to the IBPS IDE!</p>
            <p>
                This integrated development environment lets you create, edit,
                run, and share your IBPS scripts right on your browser.
            </p>
            <p>
                IBPS is a scripting language based on the pseudocode
                specification of the International Baccalaureate Diploma Program
                Computer Science course.
            </p>
            <p>
                Use the <b>files pane</b> on the left-hand side to create,
                rename, delete, import, or export any IBPS files. Use this pane
                to edit the selected file. All progress is automatically saved
                on your computer.
            </p>
            <p>
                Finally, click the "Run" button above to run the code in the
                active file. The <b>output</b> will be shown on the{" "}
                <b>output pane</b> to the right.
            </p>
            <p>
                Here's an example of a simple IBPS program that prints "Hello,
                World!":
            </p>
            <DocsCode block>{'output "Hello World!"'}</DocsCode>
            <p>
                Now click the <b>Run</b> button to see the output!
            </p>
            <div className="pt-5 text-neutral-400">
                <p>
                    <span>Created by </span>
                    <Ahref
                        target="blank"
                        className="underline underline-offset-2"
                        href="https://inandioglu.com"
                    >
                        baris-inandi
                    </Ahref>
                </p>
                <p>
                    <Ahref
                        target="blank"
                        className="underline underline-offset-2"
                        href="https://github.com/baris-inandi/IBPS"
                    >
                        See GitHub Repo
                    </Ahref>
                </p>
            </div>
        </div>
    );
};

export default Welcome;

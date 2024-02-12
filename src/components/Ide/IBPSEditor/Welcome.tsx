const Welcome: React.FC = () => {
    return (
        <div className="flex h-full w-full select-text flex-col gap-5 overflow-y-scroll bg-white p-9 pb-20 dark:bg-idedark-1000">
            <p className="pb-1 text-xl font-bold">
                Welcome to the IBPS IDE for IB Pseudocode!
            </p>
            <p>
                The International Baccalaureate Diploma Program Computer Science
                course has a very specific Pseudocode specification.
            </p>
            <p>
                This IDE integrates the IBPS Interpreter and REPL{" "}
                <b>
                    that can run IB-compliant pseudocode scripts on the browser.
                </b>
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
            <div className="rounded-md bg-neutral-200 px-5 py-2 font-mono text-neutral-600 dark:bg-idedark-900 dark:text-idedark-300">
                {'output "Hello World!"'}
            </div>
            <p>
                Now click the <b>Run</b> button to see the output!
            </p>
            <div className="pt-5 text-neutral-400">
                <p>
                    <span>Created by </span>
                    <a
                        target="blank"
                        className="underline underline-offset-2"
                        href="https://inandioglu.com"
                    >
                        baris-inandi
                    </a>
                </p>
                <p>
                    <a
                        target="blank"
                        className="underline underline-offset-2"
                        href="https://github.com/baris-inandi/IBPS"
                    >
                        See GitHub Repo
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Welcome;

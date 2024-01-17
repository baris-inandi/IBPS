const Welcome: React.FC = () => {
    return (
        <div className="select-text flex gap-5 flex-col p-9 bg-white dark:bg-idedark-900 h-full w-full overflow-y-scroll pb-20">
            <p className="text-xl font-bold pb-1">
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
            <pre className="bg-stone-200 text-stone-600 dark:bg-idedark-700 dark:text-idedark-50 px-4 py-2 rounded-sm">
                output "Hello, World!"
            </pre>
            <p>
                Now click the <b>Run</b> button to see the output!
            </p>
            <p className="opacity-50 pt-6">
                Created by{" "}
                <a
                    className="underline underline-offset-2"
                    href="https://inandioglu.com"
                >
                    Baris Inandioglu
                </a>
            </p>
        </div>
    );
};

export default Welcome;

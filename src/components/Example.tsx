import { useEffect, useState } from "react";
import { usePythonConsole } from "react-py";
import { ConsoleState } from "react-py/dist/types/Console";

const App = () => {
    const [input, setInput] = useState<any>(() => ["", ""]);
    const [output, setOutput] = useState<any>(() => ["", ""]);

    const {
        runPython,
        stdout,
        stderr,
        isLoading,
        isRunning,
        banner,
        consoleState,
    } = usePythonConsole();

    useEffect(() => {
        setOutput((prev: any) => [...prev, stdout]);
    }, [stdout]);

    useEffect(() => {
        setOutput((prev: any) => [...prev, stderr]);
    }, [stderr]);

    function getPrompt() {
        return consoleState === ConsoleState.incomplete ? "... " : ">>> ";
    }

    function run() {
        setOutput((prev: any) => [...prev, getPrompt() + input + "\n"]);
        runPython(input as unknown as string);
    }

    return (
        <>
            {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
            <p>
                <b>Output</b>
            </p>
            <pre>
                {banner}
                <br />
                {output}
            </pre>
            <pre>
                {getPrompt()}
                <form>
                    <textarea
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your code here"
                    />
                    <input
                        type="submit"
                        value={!isRunning ? "Run" : "Running..."}
                        disabled={isLoading || isRunning}
                        onClick={(e) => {
                            e.preventDefault();
                            run();
                        }}
                    />
                </form>
            </pre>
        </>
    );
};

export default App;

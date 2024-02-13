import { useLocation } from "wouter-preact";

const NotFound: React.FC = () => {
    const [, setLocation] = useLocation();

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-white text-center text-black dark:bg-idedark-1000 dark:text-white">
            <p className="pt-5 font-logo text-sm font-bold">
                IBPS <span className="font-normal">IDE</span>
            </p>
            <h1 className="text-2xl font-medium">Not Found</h1>
            <p className="max-w-sm pb-6 text-neutral-500 dark:text-neutral-400">
                That's an error.
            </p>
            <button
                type="button"
                onClick={() => setLocation("/")}
                className="w-fit rounded-md bg-blue-500 px-6 py-2 text-white"
            >
                Back to IBPS IDE
            </button>
        </div>
    );
};

export default NotFound;

import { useLocation } from "wouter-preact";

const NotFound = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-idelight-whitish text-center text-idelight-700 dark:bg-idedark-1000 dark:text-white">
      <img
        draggable={false}
        src="/favicon.png"
        alt="IBPS IDE Icon"
        className="h-24 w-24"
      />
      <p className="pt-10 text-sm font-bold">
        IBPS <span className="font-normal">IDE</span>
      </p>
      <h1 className="text-2xl font-medium">Not Found</h1>
      <p className="max-w-sm pb-6 text-idelight-500 dark:text-idedark-400">
        That's an error.
      </p>
      <button
        type="button"
        onClick={() => setLocation("/")}
        className="highlight rounded-md bg-idelight-accent px-6 py-2 text-white dark:bg-idedark-700"
      >
        Back to IBPS IDE
      </button>
    </div>
  );
};

export default NotFound;

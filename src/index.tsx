import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IBPSProvider from "./IBPSProvider";
import DocsPdf from "./components/Ide/IBPSEditor/Docs/DocsPdf";
import Ide from "./components/Ide/Ide";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/markdown.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Ide />,
    },
    {
        path: "docs",
        element: <DocsPdf />,
    },
]);

root.render(
    <IBPSProvider>
        <RouterProvider router={router} />
    </IBPSProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

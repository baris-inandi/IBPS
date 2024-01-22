// Copyright (C) 2024 baris-inandi
//
// ibps-ide is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// ibps-ide is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with ibps-ide. If not, see <http://www.gnu.org/licenses/>.

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


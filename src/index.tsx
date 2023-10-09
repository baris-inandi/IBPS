import React from "react";
import ReactDOM from "react-dom/client";
import { PythonProvider } from "react-py";
import IDE from "./components/IDE/IDE";
import ThemeColorChangeProvider from "./components/global/ThemeColorChangeProvider";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <PythonProvider>
      <ThemeColorChangeProvider>
        <div className="h-screen w-screen">
          <IDE />
        </div>
      </ThemeColorChangeProvider>
    </PythonProvider>
  </React.StrictMode>,
);

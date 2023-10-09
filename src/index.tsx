import React from "react";
import ReactDOM from "react-dom/client";
import { PythonProvider } from "react-py";
import IDE from "./components/IDE/IDE";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PythonProvider>
      <div className="h-screen w-screen">
        <IDE />
      </div>
    </PythonProvider>
  </React.StrictMode>,
);

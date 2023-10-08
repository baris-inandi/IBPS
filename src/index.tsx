import React from 'react';
import ReactDOM from 'react-dom/client';
import { PythonProvider } from 'react-py';
import App from './App';
import './styles/tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PythonProvider>
      <App />
    </PythonProvider>
  </React.StrictMode>,
);

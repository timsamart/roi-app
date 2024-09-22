// Datei: src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client'; // Importieren Sie 'react-dom/client'
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

// Erstellen Sie ein Root-Element
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = ReactDOM.createRoot(container);

// Rendern der Anwendung innerhalb der ErrorBoundary-Komponente
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

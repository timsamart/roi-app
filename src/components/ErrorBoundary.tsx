// Datei: src/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

// Props für die ErrorBoundary-Komponente
interface Props {
  children: ReactNode;
}

// State für die ErrorBoundary-Komponente
interface State {
  hasError: boolean;
}

// ErrorBoundary-Komponente zur Fehlerabfangung
export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  // Aktualisiert den Zustand, wenn ein Fehler auftritt
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Loggt den Fehler
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Funktion zum Neuladen der Seite
  handleReload = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Ein Fehler ist aufgetreten."
          subTitle="Bitte versuchen Sie es später erneut."
          extra={[
            <Button type="primary" onClick={this.handleReload} key="reload">
              Seite neu laden
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

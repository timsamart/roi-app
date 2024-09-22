// Datei: src/App.tsx

import React, { useState, useEffect } from 'react';
import { ParametersForm } from './components/ParametersForm';
import { InvestmentChart } from './components/InvestmentChart';
import { GameTheoryAnalysis } from './components/GameTheoryAnalysis';
import { ScenarioManager } from './components/ScenarioManager';
import { calculateData } from './utils/calculations';
import { Parameters } from './utils/dataModels';
import { Layout, Typography } from 'antd';
import { ErrorBoundary } from './components/ErrorBoundary';

const { Header, Content } = Layout;
const { Title } = Typography;

// Hauptkomponente der Anwendung
const App: React.FC = () => {
  // Zustand für die Parameter
  const [parameters, setParameters] = useState<Parameters>({
    timeHorizon: 10, // Betrachtungszeitraum in Jahren
    discountRate: 5, // Abzinsungssatz in Prozent
    initialInvestmentFunction: '100000 * exp(-0.1 * t)', // Funktion für initiale Investitionen I(t)
    annualCostFunction: '50000 + 1000 * t', // Funktion für jährliche Kosten C(t)
    annualBenefitFunction: '80000 * (1 - exp(-0.2 * t))', // Funktion für jährlichen Nutzen N(t)
    riskFunction: '10000 * exp(-0.3 * t)', // Funktion für Risiken R(t)
  });

  // Zustand für die berechneten Daten
  const [data, setData] = useState<any[]>([]);

  // Effekt, der die Daten berechnet, wenn sich die Parameter ändern
  useEffect(() => {
    try {
      const calculatedData = calculateData(parameters);
      setData(calculatedData);
    } catch (error) {
      console.error('Fehler bei der Berechnung:', error);
      // Optional: Implementieren Sie eine Benutzermeldung hier
    }
  }, [parameters]);

  return (
    <Layout>
      {/* Header der Anwendung */}
      <Header style={{ backgroundColor: '#001529' }}>
        <Title style={{ color: '#fff', margin: '14px 0' }} level={3}>
          Strategische Investitionsplanung
        </Title>
      </Header>

      {/* Content der Anwendung */}
      <Content style={{ padding: '20px' }}>
        {/* Fehlerabfangende Komponente */}
        <ErrorBoundary>
          {/* Szenarienverwaltung */}
          <ScenarioManager parameters={parameters} setParameters={setParameters} />

          {/* Parameterformular */}
          <ParametersForm parameters={parameters} setParameters={setParameters} />

          {/* Investitionsdiagramm */}
          <InvestmentChart data={data} />

          {/* Spieltheoretische Analyse */}
          <GameTheoryAnalysis />
        </ErrorBoundary>
      </Content>
    </Layout>
  );
};

export default App;

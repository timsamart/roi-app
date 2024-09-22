// Datei: src/App.tsx

import React, { useState, useEffect } from 'react';
import { ParametersForm } from './components/ParameterForm';
import { InvestmentChart } from './components/InvestmentChart';
import { GameTheoryAnalysis } from './components/GameTheoryAnalysis';
import { ScenarioManager } from './components/ScenarioManager';
import { calculateData } from './utils/calculations';
import { Parameters } from './utils/dataModels';
//import 'antd/dist/antd.css';

const App: React.FC = () => {
  const [parameters, setParameters] = useState<Parameters>({
    timeHorizon: 10,
    discountRate: 5,
    initialInvestmentFunction: '100000 * exp(-0.1 * t)',
    annualCostFunction: '50000 + 1000 * t',
    annualBenefitFunction: '80000 * (1 - exp(-0.2 * t))',
    riskFunction: '10000 * exp(-0.3 * t)',
  });

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const calculatedData = calculateData(parameters);
      setData(calculatedData);
    } catch (error) {
      console.error('Fehler bei der Berechnung:', error);
    }
  }, [parameters]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Strategische Investitionsplanung</h1>
      <ScenarioManager parameters={parameters} setParameters={setParameters} />
      <ParametersForm parameters={parameters} setParameters={setParameters} />
      <InvestmentChart data={data} />
      <GameTheoryAnalysis />
    </div>
  );
};

export default App;

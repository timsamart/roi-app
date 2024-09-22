// Datei: src/components/ScenarioManager.tsx

import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { Parameters } from '../utils/dataModels';

interface ScenarioManagerProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

export const ScenarioManager: React.FC<ScenarioManagerProps> = ({ parameters, setParameters }) => {
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; parameters: Parameters }[]>([]);

  const saveScenario = () => {
    const name = prompt('Bitte einen Namen für das Szenario eingeben:');
    if (name) {
      setSavedScenarios([...savedScenarios, { name, parameters }]);
    }
  };

  const loadScenario = (name: string) => {
    const scenario = savedScenarios.find((s) => s.name === name);
    if (scenario) {
      setParameters(scenario.parameters);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Button onClick={saveScenario} style={{ marginRight: '10px' }}>Szenario speichern</Button>
      <Select
        placeholder="Szenario laden"
        style={{ width: 200 }}
        onChange={loadScenario}
      >
        {savedScenarios.map((scenario) => (
          <Select.Option key={scenario.name} value={scenario.name}>
            {scenario.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

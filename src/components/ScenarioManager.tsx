// Datei: src/components/ScenarioManager.tsx

import React, { useState } from 'react';
import { Button, Select, Card, message } from 'antd';
import { Parameters } from '../utils/dataModels';

interface ScenarioManagerProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

// Komponente zur Verwaltung von Szenarien
export const ScenarioManager: React.FC<ScenarioManagerProps> = ({ parameters, setParameters }) => {
  // Zustand für gespeicherte Szenarien
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; parameters: Parameters }[]>([]);

  // Funktion zum Speichern eines Szenarios
  const saveScenario = () => {
    const name = prompt('Bitte einen Namen für das Szenario eingeben:');
    if (name) {
      // Überprüfen, ob der Szenarioname bereits existiert
      const exists = savedScenarios.some((s) => s.name === name);
      if (exists) {
        message.error(`Ein Szenario mit dem Namen "${name}" existiert bereits.`);
        return;
      }
      setSavedScenarios([...savedScenarios, { name, parameters }]);
      message.success(`Szenario "${name}" wurde gespeichert.`);
    }
  };

  // Funktion zum Laden eines gespeicherten Szenarios
  const loadScenario = (name: string) => {
    const scenario = savedScenarios.find((s) => s.name === name);
    if (scenario) {
      setParameters(scenario.parameters);
      message.success(`Szenario "${name}" wurde geladen.`);
    }
  };

  return (
    <Card title="Szenarienverwaltung" style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        {/* Button zum Speichern eines Szenarios */}
        <Button onClick={saveScenario} style={{ marginRight: '10px' }}>
          Szenario speichern
        </Button>

        {/* Dropdown zum Laden eines gespeicherten Szenarios */}
        <Select
          placeholder="Szenario laden"
          style={{ width: 200 }}
          onChange={loadScenario}
          allowClear
        >
          {savedScenarios.map((scenario) => (
            <Select.Option key={scenario.name} value={scenario.name}>
              {scenario.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Card>
  );
};

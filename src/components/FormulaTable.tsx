// Datei: src/components/FormulaTable.tsx

import React from 'react';
import { Table, Button, Tooltip } from 'antd';
import { Formula, formulas } from '../utils/formulas';
import { Parameters } from '../utils/dataModels';

interface FormulaTableProps {
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

export const FormulaTable: React.FC<FormulaTableProps> = ({ setParameters }) => {
  // Definieren der Spalten für die Tabelle
  const columns = [
    {
      title: 'Formelname',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Beschreibung',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <Tooltip title={text}><span>{text}</span></Tooltip>,
    },
    {
      title: 'Aktion',
      key: 'action',
      render: (_: any, record: Formula) => (
        <Button type="primary" onClick={() => handleSelect(record)}>
          Formel auswählen
        </Button>
      ),
    },
  ];

  // Funktion zum Handhaben der Formel-Auswahl
  const handleSelect = (formula: Formula) => {
    // Basierend auf der ausgewählten Formel, die entsprechenden Parameter setzen
    const newParameters: Parameters = {
      ...defaultParameters(), // Funktion zum Setzen der Standardwerte
      initialInvestmentFunction: formula.formula, // Beispiel: Übernahme der Formel
      // Weitere Anpassungen können hier vorgenommen werden
    };

    // Setzen der Parameter basierend auf den Formulardefinitionen
    Object.keys(formula.parameters).forEach((param) => {
      switch (param) {
        case 'timeHorizon':
          newParameters.timeHorizon = formula.parameters[param].defaultValue as number;
          break;
        case 'discountRate':
          newParameters.discountRate = formula.parameters[param].defaultValue as number;
          break;
        case 'initialInvestmentFunction':
          newParameters.initialInvestmentFunction = formula.formula;
          break;
        case 'annualCostFunction':
          newParameters.annualCostFunction = formula.formula;
          break;
        case 'annualBenefitFunction':
          newParameters.annualBenefitFunction = formula.formula;
          break;
        case 'riskFunction':
          newParameters.riskFunction = formula.formula;
          break;
        default:
          break;
      }
    });

    // Aktualisieren der Parameter im globalen Zustand
    setParameters(newParameters);
  };

  // Funktion zum Setzen von Standardparametern
  const defaultParameters = (): Parameters => ({
    timeHorizon: 10,
    discountRate: 5,
    initialInvestmentFunction: '100000 * exp(-0.1 * t)',
    annualCostFunction: '50000 + 1000 * t',
    annualBenefitFunction: '80000 * (1 - exp(-0.2 * t))',
    riskFunction: '10000 * exp(-0.3 * t)',
  });

  return (
    <Table
      dataSource={formulas}
      columns={columns}
      rowKey="name"
      pagination={false}
      style={{ marginBottom: '20px' }}
    />
  );
};

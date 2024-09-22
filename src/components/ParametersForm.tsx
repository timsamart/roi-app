// Datei: src/components/ParametersForm.tsx

import React from 'react';
import { Form, InputNumber, Input, Card } from 'antd';
import { Parameters } from '../utils/dataModels';

interface ParametersFormProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

// Komponente für das Parameterformular
export const ParametersForm: React.FC<ParametersFormProps> = ({ parameters, setParameters }) => {
  // Funktion zum Handhaben von Änderungen im Formular
  const handleChange = (changedValues: any) => {
    setParameters({ ...parameters, ...changedValues });
  };

  return (
    <Card title="Parameter einstellen" style={{ marginBottom: '20px' }}>
      <Form
        layout="vertical"
        initialValues={parameters}
        onValuesChange={(_, allValues) => handleChange(allValues)}
      >
        {/* Zeithorizont (Jahre) */}
        <Form.Item label="Zeithorizont (Jahre)" name="timeHorizon">
          <InputNumber min={1} max={50} />
        </Form.Item>

        {/* Abzinsungssatz (%) */}
        <Form.Item label="Abzinsungssatz (%)" name="discountRate">
          <InputNumber min={0} max={100} />
        </Form.Item>

        {/* Initiale Investitionsfunktion I(t) */}
        <Form.Item label="Initiale Investitionsfunktion I(t)" name="initialInvestmentFunction">
          <Input placeholder="z.B. 100000 * exp(-0.1 * t)" />
        </Form.Item>

        {/* Jährliche Kostenfunktion C(t) */}
        <Form.Item label="Jährliche Kostenfunktion C(t)" name="annualCostFunction">
          <Input placeholder="z.B. 50000 + 1000 * t" />
        </Form.Item>

        {/* Jährliche Nutzenfunktion N(t) */}
        <Form.Item label="Jährliche Nutzenfunktion N(t)" name="annualBenefitFunction">
          <Input placeholder="z.B. 80000 * (1 - exp(-0.2 * t))" />
        </Form.Item>

        {/* Risikofunktion R(t) */}
        <Form.Item label="Risikofunktion R(t)" name="riskFunction">
          <Input placeholder="z.B. 10000 * exp(-0.3 * t)" />
        </Form.Item>
      </Form>
    </Card>
  );
};

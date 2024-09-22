// Datei: src/components/ParameterForm.tsx

import React from 'react';
import { Form, InputNumber, Input } from 'antd';
import { Parameters } from '../utils/dataModels';

interface ParametersFormProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

export const ParametersForm: React.FC<ParametersFormProps> = ({ parameters, setParameters }) => {
  const handleChange = (changedValues: any) => {
    setParameters({ ...parameters, ...changedValues });
  };

  return (
    <Form
      layout="vertical"
      initialValues={parameters}
      onValuesChange={(_, allValues) => handleChange(allValues)}
    >
      <Form.Item label="Zeithorizont (Jahre)" name="timeHorizon">
        <InputNumber min={1} max={50} />
      </Form.Item>
      <Form.Item label="Abzinsungssatz (%)" name="discountRate">
        <InputNumber min={0} max={100} />
      </Form.Item>
      <Form.Item label="Initiale Investitionsfunktion I(t)" name="initialInvestmentFunction">
        <Input placeholder="z.B. 100000 * exp(-0.1 * t)" />
      </Form.Item>
      <Form.Item label="Jährliche Kostenfunktion C(t)" name="annualCostFunction">
        <Input placeholder="z.B. 50000 + 1000 * t" />
      </Form.Item>
      <Form.Item label="Jährliche Nutzenfunktion N(t)" name="annualBenefitFunction">
        <Input placeholder="z.B. 80000 * (1 - exp(-0.2 * t))" />
      </Form.Item>
      <Form.Item label="Risikofunktion R(t)" name="riskFunction">
        <Input placeholder="z.B. 10000 * exp(-0.3 * t)" />
      </Form.Item>
    </Form>
  );
};

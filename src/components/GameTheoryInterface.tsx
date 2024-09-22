// Datei: src/components/GameTheoryInterface.tsx

import React, { useState } from 'react';
import { Table, Card, Input, Button, Form, message, InputNumber } from 'antd';
import { calculateNashEquilibrium, Strategy } from '../utils/gameTheory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Column } = Table;

// Komponente für das Spieltheorie-Interface
export const GameTheoryInterface: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { name: 'Strategie A', payoff: 100 },
    { name: 'Strategie B', payoff: 150 },
    { name: 'Strategie C', payoff: 120 },
  ]);

  const [form] = Form.useForm();

  const addStrategy = (values: any) => {
    const { name, payoff } = values;
    if (name && payoff !== undefined) {
      const exists = strategies.some((s) => s.name.toLowerCase() === name.toLowerCase());
      if (exists) {
        message.error(`Eine Strategie mit dem Namen "${name}" existiert bereits.`);
        return;
      }
      setStrategies([...strategies, { name, payoff: Number(payoff) }]);
      form.resetFields();
      message.success(`Strategie "${name}" wurde hinzugefügt.`);
    } else {
      message.error("Bitte geben Sie einen gültigen Namen und eine Auszahlung ein.");
    }
  };

  const nashEquilibrium = calculateNashEquilibrium(strategies);

  return (
    <Card title="Spieltheorie-Interface" style={{ marginTop: '20px' }}>
      <Table dataSource={strategies} pagination={false} rowKey="name" size="small">
        <Column title="Strategie" dataIndex="name" key="name" />
        <Column title="Auszahlung" dataIndex="payoff" key="payoff" />
      </Table>

      {nashEquilibrium && (
        <p style={{ marginTop: '10px' }}>
          Das Nash-Gleichgewicht ist erreicht bei: <strong>{nashEquilibrium.name}</strong> mit einer Auszahlung von {nashEquilibrium.payoff}.
        </p>
      )}

      {/* LineChart zur Visualisierung der Strategien */}
      <LineChart
        width={600}
        height={300}
        data={strategies}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="payoff" stroke="#8884d8" name="Auszahlung" />
      </LineChart>

      {/* Formular zum Hinzufügen neuer Strategien */}
      <Form form={form} layout="inline" onFinish={addStrategy} style={{ marginTop: '20px' }}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Bitte geben Sie einen Strategienamen ein.' }]}
        >
          <Input placeholder="Strategie Name" />
        </Form.Item>
        <Form.Item
          name="payoff"
          rules={[{ required: true, message: 'Bitte geben Sie eine Auszahlung ein.' }]}
        >
          <InputNumber placeholder="Auszahlung" min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Strategie hinzufügen
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

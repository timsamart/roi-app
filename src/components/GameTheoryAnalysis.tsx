// Datei: src/components/GameTheoryAnalysis.tsx

import React, { useState } from 'react';
import { Table, Card, Input, Button, Form, message, InputNumber } from 'antd'; // Fügen Sie InputNumber hier hinzu
import { calculateNashEquilibrium, Strategy } from '../utils/gameTheory';

const { Column } = Table;

// Komponente für die spieltheoretische Analyse
export const GameTheoryAnalysis: React.FC = () => {
  // Zustand für die Strategien
  const [strategies, setStrategies] = useState<Strategy[]>([
    { name: 'Strategie A', payoff: 100 },
    { name: 'Strategie B', payoff: 150 },
    { name: 'Strategie C', payoff: 120 },
  ]);

  // Formularelemente für das Hinzufügen neuer Strategien
  const [form] = Form.useForm();

  // Funktion zum Hinzufügen einer neuen Strategie
  const addStrategy = (values: any) => {
    const { name, payoff } = values;
    if (name && payoff !== undefined) {
      // Überprüfen, ob der Strategiename bereits existiert
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

  // Berechnung des Nash-Gleichgewichts
  const nashEquilibrium = calculateNashEquilibrium(strategies);

  return (
    <Card title="Spieltheoretische Analyse" style={{ marginTop: '20px' }}>
      {/* Tabelle der Strategien */}
      <Table dataSource={strategies} pagination={false} rowKey="name" size="small">
        <Column title="Strategie" dataIndex="name" key="name" />
        <Column title="Auszahlung" dataIndex="payoff" key="payoff" />
      </Table>

      {/* Anzeige des Nash-Gleichgewichts */}
      {nashEquilibrium && (
        <p style={{ marginTop: '10px' }}>
          Das Nash-Gleichgewicht ist erreicht bei: <strong>{nashEquilibrium.name}</strong> mit einer Auszahlung von {nashEquilibrium.payoff}.
        </p>
      )}

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

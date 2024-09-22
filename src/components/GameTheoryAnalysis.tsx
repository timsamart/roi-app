// Datei: src/components/GameTheoryAnalysis.tsx

import React, { useState } from 'react';
import { Table } from 'antd';
import { calculateNashEquilibrium, Strategy } from '../utils/gameTheory';

export const GameTheoryAnalysis: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { name: 'Strategie A', payoff: 100 },
    { name: 'Strategie B', payoff: 150 },
    { name: 'Strategie C', payoff: 120 },
  ]);

  const nashEquilibrium = calculateNashEquilibrium(strategies);

  const columns = [
    {
      title: 'Strategie',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Auszahlung',
      dataIndex: 'payoff',
      key: 'payoff',
    },
  ];

  return (
    <div>
      <h2>Spieltheoretische Analyse</h2>
      <Table dataSource={strategies} columns={columns} pagination={false} rowKey="name" />
      {nashEquilibrium && (
        <p>
          Das Nash-Gleichgewicht ist erreicht bei: <strong>{nashEquilibrium.name}</strong> mit einer Auszahlung von {nashEquilibrium.payoff}.
        </p>
      )}
    </div>
  );
};

// Datei: src/components/GameTheoryInterface.tsx

import React, { useState } from 'react';
import { Table, Card, Input, Button, Form, message, InputNumber, Divider } from 'antd';
import { calculateNashEquilibrium, Player, PayoffMatrix, Strategy } from '../utils/gameTheory';
import {
  VictoryScatter,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
  VictoryLegend,
} from 'victory';

const { Column } = Table;

interface NashEquilibrium {
  player1: string;
  player2: string;
}

export const GameTheoryInterface: React.FC = () => {
  // Zustand für die Spieler und ihre Strategien
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Spieler 1', strategies: [{ name: 'Strategie A' }, { name: 'Strategie B' }] },
    { name: 'Spieler 2', strategies: [{ name: 'Strategie X' }, { name: 'Strategie Y' }] },
  ]);

  // Zustand für die Payoff-Matrix
  const [payoffMatrix, setPayoffMatrix] = useState<PayoffMatrix | null>(null);

  // Formulare für das Hinzufügen von Strategien und Spielern
  const [strategyForm] = Form.useForm();
  const [playerForm] = Form.useForm();

  // Funktion zum Hinzufügen einer Strategie zu einem Spieler
  const addStrategy = (playerIndex: number, strategy: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].strategies.push({ name: strategy });
    setPlayers(updatedPlayers);
    strategyForm.resetFields();
    message.success(`Strategie "${strategy}" zu ${updatedPlayers[playerIndex].name} hinzugefügt.`);
  };

  // Funktion zum Hinzufügen eines neuen Spielers
  const addPlayer = (playerName: string) => {
    setPlayers([...players, { name: playerName, strategies: [] }]);
    playerForm.resetFields();
    message.success(`Spieler "${playerName}" hinzugefügt.`);
  };

  // Funktion zum Aktualisieren der Payoffs
  const updatePayoff = (
    playerIndex: number,
    strategyName: string,
    payoff: number
  ) => {
    if (!payoffMatrix) return;

    const updatedMatrix: PayoffMatrix = { ...payoffMatrix };
    updatedMatrix.payoffs[playerIndex][strategyName] = payoff;
    setPayoffMatrix(updatedMatrix);
  };

  // Funktion zum Erstellen der Payoff-Matrix basierend auf den Spielern und ihren Strategien
  const createPayoffMatrix = () => {
    const matrix: PayoffMatrix = {
      players: players.map(player => player.name),
      payoffs: {},
    };

    players.forEach((player, index) => {
      matrix.payoffs[index] = {};
      player.strategies.forEach(strategy => {
        matrix.payoffs[index][strategy.name] = 0; // Initialisieren der Payoffs
      });
    });

    setPayoffMatrix(matrix);
    message.success('Payoff-Matrix erstellt.');
  };

  // Funktion zur Berechnung des Nash-Gleichgewichts
  const computeNashEquilibrium = () => {
    if (!payoffMatrix) {
      message.error('Bitte erstellen Sie zuerst die Payoff-Matrix.');
      return;
    }

    const equilibria: NashEquilibrium[] = calculateNashEquilibrium(payoffMatrix);
    if (equilibria.length > 0) {
      const equilibriumDescriptions = equilibria.map(eq => {
        return players
          .map((player, index) => `${player.name}: ${eq[`player${index + 1}` as keyof NashEquilibrium]}`)
          .join(', ');
      }).join('; ');
      message.success(`Nash-Gleichgewicht gefunden: ${equilibriumDescriptions}`);
    } else {
      message.info('Kein Nash-Gleichgewicht gefunden.');
    }
  };

  // Tabelle zur Eingabe der Payoffs
  const payoffTable = () => {
    if (!payoffMatrix) return null;

    const data: any[] = [];
    players.forEach((player1, index1) => {
      players.forEach((player2, index2) => {
        player1.strategies.forEach(strategy1 => {
          player2.strategies.forEach(strategy2 => {
            data.push({
              key: `${player1.name}-${strategy1.name}-${player2.name}-${strategy2.name}`,
              player1Strategy: strategy1.name,
              player2Strategy: strategy2.name,
              player1Payoff: payoffMatrix.payoffs[index1][strategy1.name],
              player2Payoff: payoffMatrix.payoffs[index2][strategy2.name],
            });
          });
        });
      });
    });

    return (
      <Table
        dataSource={data}
        columns={[
          { title: 'Strategie Spieler 1', dataIndex: 'player1Strategy', key: 'player1Strategy' },
          { title: 'Strategie Spieler 2', dataIndex: 'player2Strategy', key: 'player2Strategy' },
          {
            title: `${players[0].name} Auszahlung`,
            dataIndex: 'player1Payoff',
            key: 'player1Payoff',
            render: (text: number, record: any) => (
              <InputNumber
                min={-10000}
                max={10000}
                value={record.player1Payoff}
                onChange={(value) => {
                  const playerIndex = 0; // Spieler 1
                  updatePayoff(playerIndex, record.player1Strategy, value || 0);
                }}
              />
            ),
          },
          {
            title: `${players[1].name} Auszahlung`,
            dataIndex: 'player2Payoff',
            key: 'player2Payoff',
            render: (text: number, record: any) => (
              <InputNumber
                min={-10000}
                max={10000}
                value={record.player2Payoff}
                onChange={(value) => {
                  const playerIndex = 1; // Spieler 2
                  updatePayoff(playerIndex, record.player2Strategy, value || 0);
                }}
              />
            ),
          },
        ]}
        pagination={false}
        bordered
      />
    );
  };

  // Funktion zur Erstellung der Heatmap-Daten
  const createHeatmapData = (): { x: string; y: string; z: number }[] => {
    if (!payoffMatrix) return [];

    const data: { x: string; y: string; z: number }[] = [];
    players.forEach((player1, index1) => {
      players.forEach((player2, index2) => {
        player1.strategies.forEach(strategy1 => {
          player2.strategies.forEach(strategy2 => {
            const totalPayoff = payoffMatrix.payoffs[index1][strategy1.name] + payoffMatrix.payoffs[index2][strategy2.name];
            data.push({
              x: strategy1.name,
              y: strategy2.name,
              z: totalPayoff, // Wert zur Farbskala
            });
          });
        });
      });
    });
    return data;
  };

  return (
    <Card title="Interaktive Spieltheoretische Analyse" style={{ marginTop: '20px' }}>
      {/* Spieler-Management */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Spieler</h3>
        {players.map((player, index) => (
          <div key={player.name} style={{ marginBottom: '10px' }}>
            <strong>{player.name}</strong>
            <Form
              form={strategyForm}
              layout="inline"
              onFinish={({ strategy }) => addStrategy(index, strategy)}
              style={{ marginTop: '10px' }}
            >
              <Form.Item name="strategy" rules={[{ required: true, message: 'Bitte Strategie eingeben.' }]}>
                <Input placeholder="Neue Strategie" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Strategie hinzufügen
                </Button>
              </Form.Item>
            </Form>
          </div>
        ))}
        {/* Formular zum Hinzufügen eines neuen Spielers */}
        <Divider />
        <h3>Neuen Spieler hinzufügen</h3>
        <Form
          form={playerForm}
          layout="inline"
          onFinish={({ playerName }) => addPlayer(playerName)}
        >
          <Form.Item name="playerName" rules={[{ required: true, message: 'Bitte Spielernamen eingeben.' }]}>
            <Input placeholder="Spieler Name" />
          </Form.Item>
          <Form.Item>
            <Button type="dashed" htmlType="submit">
              Spieler hinzufügen
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Payoff-Matrix erstellen */}
      <Button type="primary" onClick={createPayoffMatrix} style={{ marginBottom: '20px' }}>
        Payoff-Matrix erstellen
      </Button>

      {/* Payoff-Tabelle */}
      {payoffMatrix && (
        <div>
          <h3>Payoff-Matrix</h3>
          {payoffTable()}
          <Button type="primary" onClick={computeNashEquilibrium} style={{ marginTop: '20px' }}>
            Nash-Gleichgewicht berechnen
          </Button>
        </div>
      )}

      {/* Heatmap zur Visualisierung der Payoffs */}
      {payoffMatrix && (
        <div style={{ marginTop: '40px' }}>
          <h3>Payoff-Matrix Heatmap</h3>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            height={400}
            width={600}
          >
            <VictoryAxis
              tickFormat={(t) => `${t}`}
              label={payoffMatrix.players[0]}
              style={{
                axisLabel: { padding: 30 },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(t) => `${t}`}
              label={payoffMatrix.players[1]}
              style={{
                axisLabel: { padding: 40 },
              }}
            />
            <VictoryScatter
              data={createHeatmapData()}
              x="x"
              y="y"
              size={({ datum }) => 20}
              style={{
                data: {
                  fill: ({ datum }) => {
                    const ratio = (datum.z - Math.min(...createHeatmapData().map(d => d.z))) / (Math.max(...createHeatmapData().map(d => d.z)) - Math.min(...createHeatmapData().map(d => d.z)));
                    const r = Math.floor(255 * (1 - ratio));
                    const g = Math.floor(255 * ratio);
                    return `rgb(${r}, ${g}, 150)`; // Grün bis Rot
                  },
                },
              }}
              labels={({ datum }) => `${datum.x} vs ${datum.y}: ${datum.z}`}
              labelComponent={<VictoryTooltip />}
            />
            <VictoryLegend
              x={120}
              y={10}
              orientation="horizontal"
              gutter={20}
              data={[
                { name: 'Payoff', symbol: { fill: '#8884d8' } },
              ]}
            />
          </VictoryChart>
        </div>
      )}
    </Card>
  );
};

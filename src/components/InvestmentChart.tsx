// Datei: src/components/InvestmentChart.tsx

import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLegend, VictoryScatter } from 'victory';
import { DataPoint } from '../utils/dataModels';

interface InvestmentChartProps {
  data: DataPoint[];
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  // Suche nach dem Break-Even-Punkt (wo netto Nutzen >= 0 ist)
  const breakEvenPoint = data.find((d) => d.netBenefit >= 0);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
      height={400}
      width={800}
    >
      {/* X-Achse */}
      <VictoryAxis
        label="Jahr"
        tickFormat={(t) => `${t}`}
        style={{
          axisLabel: { padding: 30 },
        }}
      />
      
      {/* Y-Achse für Euro (€) */}
      <VictoryAxis
        dependentAxis
        label="Euro (€)"
        style={{
          axisLabel: { padding: 40 },
        }}
      />

      {/* Linie für kumulierte Investition */}
      <VictoryLine
        data={data}
        x="year"
        y="cumulativeInvestment"
        style={{
          data: { stroke: "#8884d8" },
        }}
        name="Kumulierte Investition"
      />

      {/* Linie für kumulierten Nutzen */}
      <VictoryLine
        data={data}
        x="year"
        y="cumulativeBenefit"
        style={{
          data: { stroke: "#82ca9d" },
        }}
        name="Kumulativer Nutzen"
      />

      {/* Linie für Netto-Nutzen */}
      <VictoryLine
        data={data}
        x="year"
        y="netBenefit"
        style={{
          data: { stroke: "#ff7300" },
        }}
        name="Netto-Nutzen"
      />

      {/* Linie für ROI (%) */}
      <VictoryLine
        data={data}
        x="year"
        y="roi"
        style={{
          data: { stroke: "#ff0000" },
        }}
        name="ROI (%)"
      />

      {/* Legend */}
      <VictoryLegend
        x={120}
        y={10}
        orientation="horizontal"
        gutter={20}
        data={[
          { name: "Kumulierte Investition", symbol: { fill: "#8884d8" } },
          { name: "Kumulativer Nutzen", symbol: { fill: "#82ca9d" } },
          { name: "Netto-Nutzen", symbol: { fill: "#ff7300" } },
          { name: "ROI (%)", symbol: { fill: "#ff0000" } },
        ]}
      />

      {/* Scatter für Break-Even-Punkt */}
      {breakEvenPoint && (
        <VictoryScatter
          data={[breakEvenPoint]}
          x="year"
          y="netBenefit"
          size={5}
          style={{ data: { fill: "red" } }}
          labels={({ datum }) => `Break-Even: Jahr ${datum.year}`}
          labelComponent={<VictoryTooltip />}
        />
      )}
    </VictoryChart>
  );
};

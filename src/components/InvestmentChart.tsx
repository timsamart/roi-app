// Datei: src/components/InvestmentChart.tsx

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  Brush,
} from 'recharts';
import { DataPoint } from '../utils/dataModels';

interface InvestmentChartProps {
  data: DataPoint[];
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  const breakEvenPoint = data.find((d) => d.netBenefit >= 0);

  return (
    <LineChart
      width={800}
      height={500}
      data={data}
      margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="year"
        label={{ value: 'Jahr', position: 'insideBottomRight', offset: -10 }}
      />
      <YAxis
        label={{ value: 'Euro (€)', angle: -90, position: 'insideLeft' }}
      />
      <YAxis
        yAxisId="right"
        orientation="right"
        label={{ value: 'ROI (%)', angle: 90, position: 'insideRight' }}
      />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
      <Line
        type="monotone"
        dataKey="cumulativeInvestment"
        stroke="#8884d8"
        name="Kumulierte Investition"
      />
      <Line
        type="monotone"
        dataKey="cumulativeBenefit"
        stroke="#82ca9d"
        name="Kumulativer Nutzen"
      />
      <Line
        type="monotone"
        dataKey="netBenefit"
        stroke="#ff7300"
        name="Netto-Nutzen"
      />
      <Line
        type="monotone"
        dataKey="roi"
        stroke="#ff0000"
        name="ROI (%)"
        yAxisId="right"
      />
      {breakEvenPoint && (
        <ReferenceDot
          x={breakEvenPoint.year}
          y={breakEvenPoint.netBenefit}
          r={5}
          fill="red"
          label="Break-Even"
        />
      )}
      <Brush dataKey="year" height={30} stroke="#8884d8" />
    </LineChart>
  );
};

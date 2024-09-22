// Datei: src/utils/calculations.ts

import { evaluate } from 'mathjs';
import { Parameters, DataPoint } from './dataModels';

export const calculateData = (parameters: Parameters): DataPoint[] => {
  const {
    timeHorizon,
    discountRate,
    initialInvestmentFunction,
    annualCostFunction,
    annualBenefitFunction,
    riskFunction,
  } = parameters;

  const data: DataPoint[] = [];
  let cumulativeInvestment = 0;
  let cumulativeBenefit = 0;

  for (let year = 0; year <= timeHorizon; year++) {
    const scope = { t: year };

    const investment = year === 0 ? evaluate(initialInvestmentFunction, scope) : 0;
    const cost = evaluate(annualCostFunction, scope);
    const benefit = evaluate(annualBenefitFunction, scope);
    const risk = evaluate(riskFunction, scope);

    const netBenefit = benefit - cost - risk;
    cumulativeInvestment += investment + cost;
    cumulativeBenefit += benefit;

    const roi = cumulativeInvestment !== 0 ? (cumulativeBenefit - cumulativeInvestment) / cumulativeInvestment * 100 : 0;

    data.push({
      year,
      investment,
      cost,
      benefit,
      netBenefit,
      cumulativeInvestment,
      cumulativeBenefit,
      roi,
      risk,
    });
  }

  return data;
};

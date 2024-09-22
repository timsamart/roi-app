// Datei: src/utils/calculations.ts

import { evaluate } from 'mathjs';
import { Parameters, DataPoint } from './dataModels';

// Funktion zur Berechnung der ROI-Daten basierend auf den Parametern
export const calculateData = (parameters: Parameters): DataPoint[] => {
  const {
    timeHorizon,
    discountRate, // Abzinsungssatz in Prozent
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

    // Berechnung der einzelnen Parameter mittels mathjs
    const investment = year === 0 ? evaluate(initialInvestmentFunction, scope) : 0;
    const cost = evaluate(annualCostFunction, scope);
    const benefit = evaluate(annualBenefitFunction, scope);
    const risk = evaluate(riskFunction, scope);

    // Berechnung des Barwerts der Kosten und Nutzen
    const discountedCost = cost / Math.pow(1 + discountRate / 100, year);
    const discountedBenefit = benefit / Math.pow(1 + discountRate / 100, year);
    const discountedRisk = risk / Math.pow(1 + discountRate / 100, year);

    const netBenefit = discountedBenefit - discountedCost - discountedRisk;
    cumulativeInvestment += investment + discountedCost;
    cumulativeBenefit += discountedBenefit;

    const roi = cumulativeInvestment !== 0 ? ((cumulativeBenefit - cumulativeInvestment) / cumulativeInvestment) * 100 : 0;

    data.push({
      year,
      investment,
      cost,
      benefit,
      netBenefit,
      cumulativeInvestment: Math.round(cumulativeInvestment),
      cumulativeBenefit: Math.round(cumulativeBenefit),
      roi: Math.round(roi * 100) / 100, // Auf zwei Dezimalstellen gerundet
      risk: discountedRisk,
    });
  }

  return data;
};

// Datei: src/utils/dataModels.ts

// Interface für die Parameter der ROI-Berechnung
export interface Parameters {
    timeHorizon: number; // Betrachtungszeitraum in Jahren
    discountRate: number; // Abzinsungssatz in Prozent
    initialInvestmentFunction: string; // Funktion für initiale Investitionen I(t)
    annualCostFunction: string; // Funktion für jährliche Kosten C(t)
    annualBenefitFunction: string; // Funktion für jährlichen Nutzen N(t)
    riskFunction: string; // Funktion für Risiken R(t)
  }
  
  // Interface für einen Datenpunkt pro Jahr
  export interface DataPoint {
    year: number; // Jahr
    investment: number; // Investition in diesem Jahr
    cost: number; // Kosten in diesem Jahr
    benefit: number; // Nutzen in diesem Jahr
    netBenefit: number; // Netto-Nutzen in diesem Jahr (benefit - cost - risk)
    cumulativeInvestment: number; // Kumulierte Investitionen bis zu diesem Jahr
    cumulativeBenefit: number; // Kumulierte Nutzen bis zu diesem Jahr
    roi: number; // ROI in Prozent bis zu diesem Jahr
    risk: number; // Risiko in diesem Jahr
  }
  
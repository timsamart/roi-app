// Datei: src/utils/dataModels.ts

export interface Parameters {
    timeHorizon: number;
    discountRate: number;
    initialInvestmentFunction: string;
    annualCostFunction: string;
    annualBenefitFunction: string;
    riskFunction: string;
  }
  
  export interface DataPoint {
    year: number;
    investment: number;
    cost: number;
    benefit: number;
    netBenefit: number;
    cumulativeInvestment: number;
    cumulativeBenefit: number;
    roi: number;
    risk: number;
  }
  
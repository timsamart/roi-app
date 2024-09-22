// Datei: src/utils/gameTheory.ts

export interface Strategy {
    name: string;
    payoff: number;
  }
  
  export const calculateNashEquilibrium = (strategies: Strategy[]): Strategy | null => {
    // Vereinfachtes Beispiel für die Berechnung des Nash-Gleichgewichts
    // In der Praxis müssten komplexere Berechnungen durchgeführt werden
    let maxPayoff = -Infinity;
    let bestStrategy: Strategy | null = null;
  
    strategies.forEach((strategy) => {
      if (strategy.payoff > maxPayoff) {
        maxPayoff = strategy.payoff;
        bestStrategy = strategy;
      }
    });
  
    return bestStrategy;
  };
  
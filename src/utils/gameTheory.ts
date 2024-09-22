// Datei: src/utils/gameTheory.ts

// Interface für eine Strategie
export interface Strategy {
    name: string; // Name der Strategie
    payoff: number; // Auszahlung der Strategie
  }
  
  // Funktion zur Berechnung des Nash-Gleichgewichts (vereinfachte Version)
  export const calculateNashEquilibrium = (strategies: Strategy[]): Strategy | null => {
    // Vereinfachte Berechnung: Strategie mit höchstem Payoff ist das Nash-Gleichgewicht
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
  
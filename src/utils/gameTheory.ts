// Datei: src/utils/gameTheory.ts

export interface Strategy {
  name: string;
  payoff?: number; // Optional
}

export interface Player {
  name: string;
  strategies: Strategy[];
}

export interface PayoffMatrix {
  players: string[]; // Array der Spielernamen
  payoffs: {
    [playerIndex: number]: {
      [strategy: string]: number;
    };
  };
}

export const calculateNashEquilibrium = (payoffMatrix: PayoffMatrix): { player1: string; player2: string }[] => {
  const equilibria: { player1: string; player2: string }[] = [];

  const player1 = payoffMatrix.players[0];
  const player2 = payoffMatrix.players[1];

  const player1Strategies = Object.keys(payoffMatrix.payoffs[0]);
  const player2Strategies = Object.keys(payoffMatrix.payoffs[1]);

  player1Strategies.forEach(strategy1 => {
    player2Strategies.forEach(strategy2 => {
      const currentPayoff1 = payoffMatrix.payoffs[0][strategy1];
      const currentPayoff2 = payoffMatrix.payoffs[1][strategy2];

      // Best Response für Spieler 1
      const player1BestResponse = player1Strategies.every(s1 => payoffMatrix.payoffs[0][s1] <= currentPayoff1);

      // Best Response für Spieler 2
      const player2BestResponse = player2Strategies.every(s2 => payoffMatrix.payoffs[1][s2] <= currentPayoff2);

      if (player1BestResponse && player2BestResponse) {
        equilibria.push({ player1: strategy1, player2: strategy2 });
      }
    });
  });

  return equilibria;
};

// Datei: src/utils/formulas.ts

export interface Formula {
    name: string;
    description: string;
    formula: string;
    parameters: {
      [key: string]: {
        description: string;
        defaultValue: number | string;
      };
    };
  }
  
  export const formulas: Formula[] = [
    {
      name: 'Exponentiell Abnehmende Investition',
      description: 'Berechnet initiale Investitionen, die exponentiell über die Zeit abnehmen.',
      formula: '100000 * exp(-0.1 * t)',
      parameters: {
        t: {
          description: 'Zeit in Jahren',
          defaultValue: 0,
        },
        rate: {
          description: 'Abnahmerate',
          defaultValue: 0.1,
        },
      },
    },
    {
      name: 'Linear Steigende Kosten',
      description: 'Berechnet jährliche Kosten, die linear über die Zeit steigen.',
      formula: '50000 + 1000 * t',
      parameters: {
        t: {
          description: 'Zeit in Jahren',
          defaultValue: 0,
        },
        slope: {
          description: 'Steigungsrate',
          defaultValue: 1000,
        },
      },
    },
    {
      name: 'Exponentiell Wachsender Nutzen',
      description: 'Berechnet jährlichen Nutzen, der exponentiell über die Zeit wächst.',
      formula: '80000 * (1 - exp(-0.2 * t))',
      parameters: {
        t: {
          description: 'Zeit in Jahren',
          defaultValue: 0,
        },
        rate: {
          description: 'Wachstumsrate',
          defaultValue: 0.2,
        },
      },
    },
    {
      name: 'Exponentiell Abnehmendes Risiko',
      description: 'Berechnet Risiko, das exponentiell über die Zeit abnimmt.',
      formula: '10000 * exp(-0.3 * t)',
      parameters: {
        t: {
          description: 'Zeit in Jahren',
          defaultValue: 0,
        },
        rate: {
          description: 'Abnahmerate',
          defaultValue: 0.3,
        },
      },
    },
    // Weitere Formeln können hier hinzugefügt werden
  ];
  
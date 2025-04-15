export const typeMap = {
  1: { description: 'Débito', nature: 'Entrada', signal: 1 },
  2: { description: 'Boleto', nature: 'Saída', signal: -1 },
  3: { description: 'Financiamento', nature: 'Saída', signal: -1 },
  4: { description: 'Crédito', nature: 'Entrada', signal: 1 },
  5: {
    description: 'Recebimento Empréstimo',
    nature: 'Entrada',
    signal: 1,
  },
  6: { description: 'Vendas', nature: 'Entrada', signal: 1 },
  7: { description: 'Recebimento TED', nature: 'Entrada', signal: 1 },
  8: { description: 'Recebimento DOC', nature: 'Entrada', signal: 1 },
  9: { description: 'Aluguel', nature: 'Saída', signal: -1 },
} as const;

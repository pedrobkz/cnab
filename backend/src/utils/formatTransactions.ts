import { typeMap } from './transactionsTypes';

type Transaction = {
  type: string;
  value: any;
  [key: string]: any;
};

type TransactionType = keyof typeof typeMap;

export const formatTransactionsAndBalance = (transactions: Transaction[]) => {
  const formatted = transactions.map((tx) => {
    const txType = Number(tx.type) as TransactionType;
    const typeInfo = typeMap[txType] || {
      description: 'Desconhecido',
      nature: 'Desconhecida',
      signal: 1,
    };

    return {
      ...tx,
      type: typeInfo.description,
      nature: typeInfo.nature,
      value: Number(tx.value) * typeInfo.signal,
    };
  });

  const balance = formatted.reduce((acc, tx) => acc + tx.value, 0);

  return {
    transactions: formatted,
    balance,
  };
};

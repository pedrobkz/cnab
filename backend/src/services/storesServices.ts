import { prisma } from '../lib/prisma';
import { formatTransactionsAndBalance } from '../utils/formatTransactions';

export const findStores = async () => {
  const stores = await prisma.store.findMany({
    orderBy: { name: 'asc' },
  });

  const storesWithTotalTransactions = await Promise.all(
    stores.map(async (store) => {
      const transactions = await prisma.transaction.findMany({
        where: { storeId: store.id },
      });

      const { balance } = formatTransactionsAndBalance(transactions);

      return {
        ...store,
        totalTransactionsValue: balance,
      };
    })
  );

  return storesWithTotalTransactions;
};

export const findAllTransactions = async () => {
  return prisma.transaction.findMany({
    include: {
      store: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
};

export const findTransactionsByStore = async (storeId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { storeId },
    orderBy: { date: 'desc' },
    include: {
      store: {
        select: {
          id: true,
          name: true,
          owner: true,
        },
      },
    },
  });

  const { transactions: formattedTransactions, balance } =
    formatTransactionsAndBalance(transactions);

  return {
    transactions: formattedTransactions,
    balance,
  };
};

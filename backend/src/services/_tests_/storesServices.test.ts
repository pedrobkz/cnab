import { jest } from '@jest/globals';
import { prisma } from '../../lib/prisma';
import {
  findTransactionsByStore,
  findStores,
  findAllTransactions,
} from '../storesServices';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    transaction: {
      findMany: jest.fn(),
    },
    store: {
      findMany: jest.fn(),
    },
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('findTransactionsByStore', () => {
  it('should return formatted transactions and balance', async () => {
    const mockFindMany = prisma.transaction.findMany as jest.Mock;

    mockFindMany.mockResolvedValueOnce([
      {
        id: 1,
        value: 1000,
        type: 'credit',
        date: new Date(),
        storeId: 1,
        store: {
          id: 1,
          name: 'Store',
          owner: 'Owner name',
        },
      },
      {
        id: 2,
        value: 300,
        type: 'credit',
        date: new Date(),
        storeId: 1,
        store: {
          id: 1,
          name: 'Store',
          owner: 'Owner name',
        },
      },
    ] as never);

    const result = await findTransactionsByStore(1);

    expect(result).toHaveProperty('transactions');
    expect(result).toHaveProperty('balance');
    expect(result.transactions.length).toBe(2);
    expect(result.balance).toBe(1300);
  });
});

describe('findStores', () => {
  it('should return stores with total transactions calculated', async () => {
    (prisma.store.findMany as jest.Mock).mockResolvedValueOnce([
      { id: 1, name: 'Store', owner: 'Owner name' },
    ] as never);

    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce([
      { id: 1, value: 1000, type: '1', storeId: 1 },
      { id: 2, value: 500, type: '2', storeId: 1 },
      { id: 1, value: 800, type: '1', storeId: 1 },
    ] as never);

    const result = await findStores();

    expect(result).toEqual([
      {
        id: 1,
        name: 'Store',
        owner: 'Owner name',
        totalTransactionsValue: 1300,
      },
    ]);
  });

  it('should return stores with negative total', async () => {
    (prisma.store.findMany as jest.Mock).mockResolvedValueOnce([
      { id: 1, name: 'Store', owner: 'Owner name' },
    ] as never);

    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce([
      { id: 1, value: 1000, type: '1', storeId: 1 },
      { id: 2, value: 500, type: '2', storeId: 1 },
      { id: 1, value: 800, type: '2', storeId: 1 },
    ] as never);

    const result = await findStores();

    expect(result).toEqual([
      {
        id: 1,
        name: 'Store',
        owner: 'Owner name',
        totalTransactionsValue: -300,
      },
    ]);
  });
});

describe('findAllTransactions', () => {
  it('should return all transactions with store included, sorted by date desc', async () => {
    const mockData = [
      {
        id: 1,
        value: 500,
        type: 'credit',
        date: new Date('2023-01-01'),
        storeId: 1,
        store: {
          id: 1,
          name: 'Store',
          owner: 'Owner name',
        },
      },
    ];

    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce(
      mockData as never
    );

    const result = await findAllTransactions();

    expect(prisma.transaction.findMany).toHaveBeenCalledWith({
      include: {
        store: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    expect(result).toEqual(mockData);
  });
});

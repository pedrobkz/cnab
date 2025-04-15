import { jest } from '@jest/globals';
import { prisma } from '../../lib/prisma';
import { importTransactionsFromCnab } from '../uploadServices';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      store: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      transaction: {
        create: jest.fn(),
      },
    })),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('importTransactionsFromCnab', () => {
  it('should import transactions correctly', async () => {
    const cnabLine =
      '3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO';

    (prisma.store.findFirst as jest.Mock).mockResolvedValueOnce(null as never);

    (prisma.store.create as jest.Mock).mockResolvedValueOnce({
      id: 1,
      name: 'BAR DO JOÃO',
      owner: 'JOÃO MACEDO',
    } as never);

    (prisma.transaction.create as jest.Mock).mockResolvedValueOnce({} as never);

    await importTransactionsFromCnab(cnabLine);

    expect(prisma.store.findFirst).toHaveBeenCalledWith({
      where: {
        name: 'BAR DO JOÃO',
        owner: 'JOÃO MACEDO',
      },
    });

    expect(prisma.store.create).toHaveBeenCalledWith({
      data: {
        name: 'BAR DO JOÃO',
        owner: 'JOÃO MACEDO',
      },
    });

    expect(prisma.transaction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: '3',
        value: 142,
        document: '09620676017',
        card: '4753****3153',
        date: '01/03/2019',
        time: '15:34:53',
        storeId: 1,
      }),
    });
  });
});

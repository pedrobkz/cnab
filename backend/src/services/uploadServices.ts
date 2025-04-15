import { prisma } from '../lib/prisma';
import { parseCnab } from '../utils/parseCnab';


export async function importTransactionsFromCnab(content: string) {
  const parsed = parseCnab(content);

  for (const entry of parsed) {
    const { storeName, storeOwner, ...transactionData } = entry;

    let store = await prisma.store.findFirst({
      where: {
        name: storeName,
        owner: storeOwner,
      },
    });

    if (!store) {
      store = await prisma.store.create({
        data: {
          name: storeName,
          owner: storeOwner,
        },
      });
    }

    await prisma.transaction.create({
      data: {
        ...transactionData,
        storeId: store.id,
      },
    });
  }
}

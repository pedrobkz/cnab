import { FastifyInstance } from 'fastify';
import {
  getStores,
  getTransactionsByStore,
  getAllTransactions,
} from '../controllers/storesController';

export default async function (app: FastifyInstance) {
  app.get('/stores/:id/transactions', getTransactionsByStore);

  app.get('/list-stores', getStores);

  app.get('/transactions', getAllTransactions);
}

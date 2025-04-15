import { FastifyReply, FastifyRequest } from 'fastify';
import * as storesServices from '../services/storesServices';

export const getTransactionsByStore = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const { id } = req.params as { id: string };
  try {
    const result = await storesServices.findTransactionsByStore(Number(id));
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao buscar transações da loja' });
  }
};

export const getStores = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const stores = await storesServices.findStores();
    return res.send(stores);
  } catch (err) {
    console.error('Erro ao buscar lojas', err);
    return res.status(500).send({ error: 'Erro ao buscar lojas' });
  }
};

export const getAllTransactions = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const transactions = await storesServices.findAllTransactions();
    return res.send(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return res.status(500).send({ error: 'Erro ao buscar transações' });
  }
};

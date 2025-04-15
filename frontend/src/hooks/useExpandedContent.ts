import { useState } from 'react';
import { GenericObject } from '../components/Table';
import axios from 'axios';
import { useToast } from './useToast';

type Transaction = {
  id: number;
  type: string;
  date: string;
  value: number;
  document: string;
  card: string;
  time: string;
  storeId: number;
  store: {
    name: string;
    owner: string;
  };
};

const useExpandedContent = () => {
  const [expandedStoreId, setExpandedStoreId] = useState<number | null>(null);
  const [storeTransactions, setStoreTransactions] = useState<GenericObject[]>(
    []
  );
  const [storeBalance, setStoreBalance] = useState<number>(0);
  const toast = useToast();

  const fetchTransactionsByStore = async (storeId: number) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/stores/${storeId}/transactions`
      );

      const transactions: GenericObject[] = data.transactions.map(
        (el: Transaction) => ({
          id: el.id,
          type: el.type,
          date: el.date,
          value: el.value,
          document: el.document,
          card: el.card,
          time: el.time,
          storeId: el.storeId,
        })
      );

      return {
        balance: data.balance,
        transactions: transactions,
      };
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      toast('Ocorreu um erro ao buscar transações, tente novamente.', 'error');
    }
  };

  const handleExpand = async (row: GenericObject | null) => {
    if (expandedStoreId === row?.id) {
      setExpandedStoreId(null);
      setStoreTransactions([]);
      setStoreBalance(0);
    } else {
      setExpandedStoreId(Number(row?.id) || null);
      const response = await fetchTransactionsByStore(Number(row?.id) || 0);
      if (response) {
        setStoreTransactions(response.transactions);
        setStoreBalance(response.balance);
      }
    }
  };

  return {
    handleExpand,
    storeTransactions,
    storeBalance,
    expandedStoreId,
  };
};

export default useExpandedContent;

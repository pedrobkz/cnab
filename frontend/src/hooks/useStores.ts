import axios from 'axios';
import { useEffect, useState } from 'react';
import { GenericObject } from '../components/Table';
import { useToast } from './useToast';

const useStores = () => {
  const [stores, setStores] = useState<GenericObject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const fetchStores = async () => {
    try {
      const response: { data: GenericObject[] } = await axios.get(
        'http://localhost:4000/list-stores'
      );
      const parsedStores = response.data.map((store) => ({
        ...store,
        totalTransactionsValue: Number(store.totalTransactionsValue).toFixed(2),
      }));
      setStores(parsedStores);
      return parsedStores;
    } catch (error) {
      setError(error as string);
      console.error(error);
      toast('Ocorreu um erro ao buscar as lojas, tente novamente.', 'error');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const refetchStores = async () => {
    console.log('refetching stores');
    await fetchStores();
  };

  return { stores, error, refetchStores };
};

export default useStores;

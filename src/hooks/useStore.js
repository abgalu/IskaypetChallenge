import { useEffect, useState } from 'react';

import { BASE_URL, DEFAULT_STORES } from '../shared/constants';

const useStore = () => {
  const [error, setError] = useState('');
  const [stores, setStores] = useState(DEFAULT_STORES);

  const addFavoriteTask = async (storeId, taskId) => {
    const url = `${BASE_URL}/checkin`;
    const payload = {
      storeId: Number(storeId),
      taskId: Number(taskId),
    };

    try {
      await fetch(url, {
        body: JSON.stringify(payload),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: 'POST',
      });

      const storesCopy = [...stores];
      const storeIndex = storesCopy.findIndex(store => store.id === storeId);
      const taskIndex = stores[storeIndex]?.tasks?.findIndex(task => task.id === taskId);

      storesCopy[storeIndex].tasks[taskIndex].assigned = true;
      setStores(storesCopy);
    } catch ({ message }) {
      setError(message); 
    }
  };

  const resetError = () => setError('');

  const resetStores = async () => {
    const url = `${BASE_URL}/stores/reset`;
    try {
      await fetch(url, {
        body: {},
        method: "POST"
      });
    } catch ({ message }) {
      setError(message); 
    }
  };

  useEffect(() => {
    resetStores();
  
    const getStores = async () => {
      const url = `${BASE_URL}/stores`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length) setStores(data);
      } catch ({ message }) {
        setError(message);
      }
    };
  
    getStores();
  }, []);

  return {
    addFavoriteTask,
    error,
    resetError,
    resetStores,
    stores,
  };
};

export default useStore;

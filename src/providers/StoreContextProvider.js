import { StoreContext } from '../contexts/StoreContext';
import useStore from '../hooks/useStore';

const StoreContextProvider = ({ children }) => {
  const { addFavoriteTask, stores } = useStore();

  return (
    <StoreContext.Provider
      value={{
          addFavoriteTask,
          stores,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

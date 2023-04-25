import React from 'react';

import StoreContextProvider from './src/providers/StoreContextProvider';
import Home from './src/views/Home'

const App = () => (
  <StoreContextProvider>
    <Home />
  </StoreContextProvider>
);

export default App;

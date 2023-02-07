import { Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

interface ContextInterface {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const Context = React.createContext<ContextInterface>({
  loading: false,
  setLoading: (value: boolean) => {},
});

const LoadingContext: React.FC<Props> = ({ children }) => {
  const [loading, setIsLoading] = useState(false);

  function editLoading(value: boolean) {
    setIsLoading(value);
  }

  return (
    <Context.Provider
      value={{
        loading,
        setLoading: editLoading,
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      {children}
    </Context.Provider>
  );
};

export default LoadingContext;

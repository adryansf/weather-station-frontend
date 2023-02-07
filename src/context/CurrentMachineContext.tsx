import React, { useState } from 'react';

// Types
import { Machine } from '../types/api';

type Props = {
  children?: React.ReactNode;
};

interface ContextInterface {
  currentMachine?: Machine;
  setCurrentMachine?: (value: Machine) => void;
}

export const Context = React.createContext<ContextInterface>({
  currentMachine: undefined,
  setCurrentMachine: undefined,
});

const CurrentMachineContext: React.FC<Props> = ({ children }) => {
  const [currentMachine, setCurrentMachine] =
    useState<ContextInterface['currentMachine']>(undefined);

  function editCurrentMachine(value: Machine) {
    setCurrentMachine(value);
  }

  return (
    <Context.Provider
      value={{
        currentMachine,
        setCurrentMachine: editCurrentMachine,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CurrentMachineContext;

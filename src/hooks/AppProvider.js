import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedChild, setSelectedChild] = useState(null);
  return (
    <AppContext.Provider
      value={{
        selectedChild,
        setSelectedChild,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

import React, { createContext, useState, useContext } from "react";

const SelectedChildContext = createContext();

export const SelectedChildProvider = ({ children }) => {
  const [selectedChild, setSelectedChild] = useState(null);

  return (
    <SelectedChildContext.Provider value={{ selectedChild, setSelectedChild }}>
      {children}
    </SelectedChildContext.Provider>
  );
};

export const useSelectedChild = () => useContext(SelectedChildContext);

import { createContext, useContext, useState } from "react";

const hostelsContext = createContext({
  continueWithEmail: false,
  signup: false,
});

export const HostelsContextProvider = ({ children }) => {
  const [hostels, setHostels] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const value = {
    hostels,
    setHostels,
    showSidebar,
    setShowSidebar,
  };

  return (
    <hostelsContext.Provider value={value}>{children}</hostelsContext.Provider>
  );
};

export const useGlobalHostelContext = () => {
  return useContext(hostelsContext);
};

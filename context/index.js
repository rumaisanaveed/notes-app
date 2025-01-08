const { createContext, useState } = require("react");

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

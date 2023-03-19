import { useState } from "react";
import { createContext } from "react";


export const UserContext = createContext('');
UserContext.displayName = 'Usuario';

export const UserProvider = ({ children }) => {
  const [ name, setName ] = useState('');
  const [ balance, setBalance ] = useState(0);

  console.log(name)

  return(
    <UserContext.Provider value={{name, setName, balance, setBalance}}>
      {children}
    </UserContext.Provider>
  );
}


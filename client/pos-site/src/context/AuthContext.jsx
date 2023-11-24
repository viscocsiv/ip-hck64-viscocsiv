import { createContext, useState } from "react";

const AuthContext = createContext(null);

export default AuthContext;

export function AuthProvider({children}) {
  const [userId, setUserId] = useState(null);

  return <AuthContext.Provider value={{userId, setUserId}}>
    {children}
  </AuthContext.Provider>
}

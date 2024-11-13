import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/api"; // Certifique-se de que a importação do `api` está correta

interface User {
  exp?: number | null;
  id: string | null;
  iss?: string | null;
  role?: string | null;
  sub?: string | null;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(token ? jwtDecode(token) : null);

  const login = async (data: any) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;

      const decodedToken = jwtDecode<User>(token);
      setToken(token);
      setUser(decodedToken);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Erro na autenticação:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

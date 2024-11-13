import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/api";

interface User {
  exp?: number | null;
  id: string | null;
  iss?: string | null;
  role?: string | null;
  sub?: string | null;
}

interface AuthContextType {
  token: string | null;
  user: User;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

// Cria o contexto de autenticação
export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: {
    exp: null,
    id: null,
    iss: null,
    role: null,
    sub: null,
  },
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<any>(token ? jwtDecode(token) : null);
  const login = async (data: any) => {
    try {
      console.log("Dados do Login:", data);
      const response = await api.post("/auth/login", data);
      const token = response.data.token;

      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      setToken(token);
      setUser(decodedToken);
      localStorage.setItem("token", token);

      console.log("Token decodificado:", decodedToken);
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

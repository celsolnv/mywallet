import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData);

export function singOut() {
  destroyCookie(undefined, "mywallet.token");

  Router.push("/login");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "mywallet.token": token } = parseCookies();
    if (!token) {
      singOut();
    }
  }, []);

  async function singIn({ email, password }: SingInCredentials) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const { token, name } = response.data;

      if (!token) return;
      setCookie(undefined, "mywallet.token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 Days
      });

      setUser({
        email,
        name,
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/");
    } catch (error) {}
  }
  return (
    <AuthContext.Provider value={{ singIn, singOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

type User = {
  email: string;
  name: string;
};
type SingInCredentials = {
  email: string;
  password: string;
};
type AuthContextData = {
  singIn: (credentials: SingInCredentials) => Promise<void>;
  singOut: () => void;
  isAuthenticated: boolean;
  user: User;
};
type AuthProviderProps = {
  children: ReactNode;
};

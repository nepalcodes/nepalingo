import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import supabase from "./supabaseClient";
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";

interface AuthContextProps {
  user: User | null;
  signUp: (data: SignUpWithPasswordCredentials) => Promise<AuthResponse>;
  signIn: (
    data: SignInWithPasswordCredentials
  ) => Promise<AuthTokenResponsePassword>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextProps = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

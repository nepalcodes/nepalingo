import React from "react";
import {
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { supabaseClient } from "@/config/supabase-client";

type AuthContextProps = {
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
  signUp: (data: SignUpWithPasswordCredentials) => Promise<AuthResponse>;
  signIn: (
    data: SignUpWithPasswordCredentials
  ) => Promise<AuthTokenResponsePassword>;
  resetPasswordEmail: (email: string) => Promise<{ error: Error | null }>;
  resetPassword: (password: string) => Promise<{ error: Error | null }>;
};
const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  signOut: () => {},
  signUp: (data) => supabaseClient.auth.signUp(data),
  signIn: (data) => supabaseClient.auth.signInWithPassword(data),
  resetPasswordEmail: (email) =>
    supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.nepalingo.com/reset-password",
    }),
  resetPassword: (password) => supabaseClient.auth.updateUser({ password }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextProps = {
    session,
    user,
    signOut: () => supabaseClient.auth.signOut(),
    signUp: (data) => supabaseClient.auth.signUp(data),
    signIn: (data) => supabaseClient.auth.signInWithPassword(data),
    resetPasswordEmail: (email) =>
      supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: "https://www.nepalingo.com/reset-password",
      }),
    resetPassword: (password) => supabaseClient.auth.updateUser({ password }),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import supabase from "./userAuth/supabaseClient";
import { useAuth } from "./userAuth/AuthContext";

interface StreakContextProps {
  currentStreak: number;
  longestStreak: number;
  updateStreak: () => void;
}

export const StreakContext = createContext<StreakContextProps>({
  currentStreak: 0,
  longestStreak: 0,
  updateStreak: () => {},
});

export const StreakProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(1);
  const [longestStreak, setLongestStreak] = useState(1);

  useEffect(() => {
    const fetchStreakData = async () => {
      if (user) {
        const { data } = await supabase
          .from("user_daily_streaks")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setCurrentStreak(data.current_streak);
          setLongestStreak(data.longest_streak);
        }
      }
    };

    fetchStreakData();
  }, [user]);

  const updateStreak = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date
    const lastUpdateDate = localStorage.getItem("lastUpdateDate");

    if (user) {
      const { data } = await supabase.rpc("update_streak", {
        user_id: user.id,
      });

      if (data && currentDate !== lastUpdateDate) {
        setCurrentStreak(data.current_streak);
        setLongestStreak(data.longest_streak);
      }
    }
  };

  return (
    <StreakContext.Provider
      value={{ currentStreak, longestStreak, updateStreak }}
    >
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
};

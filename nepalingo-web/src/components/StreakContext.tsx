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
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [streakStartDate, setStreakStartDate] = useState(0);
  const [streakEndDate, setStreakEndDate] = useState<string | null>(null);

  const fetchStreakData = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("user_daily_streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching streak data:", error);
      }

      if (data) {
        setStreakStartDate(data.streak_start_date);
        setCurrentStreak(data.current_streak);
        setLongestStreak(data.longest_streak);
        setStreakEndDate(data.streak_end_date);
      }
    }
  };

  useEffect(() => {
    fetchStreakData();
  }, [user]);

  const updateStreak = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date

    if (user) {
      let newStreak = 1;
      let newLongestStreak = 1;

      if (streakEndDate) {
        const lastDate = new Date(streakEndDate).toISOString().split("T")[0];
        if (lastDate === currentDate) {
          return; // No update needed if the user has already visited today
        } else if (
          new Date(currentDate).getTime() - new Date(lastDate).getTime() ===
          86400000
        ) {
          newStreak = currentStreak + 1;
          newLongestStreak = Math.max(newStreak, longestStreak);
        }
      }

      // Update state
      setCurrentStreak(newStreak);
      setLongestStreak(newLongestStreak);
      setStreakEndDate(currentDate);

      // Upsert database
      const { error } = await supabase
        .from("user_daily_streaks")
        .upsert(
          {
            user_id: user.id,
            streak_start_date: newStreak === 1 ? currentDate : streakStartDate,
            streak_end_date: currentDate, // Update streak_end_date with currentDate
            current_streak: newStreak,
            longest_streak: newLongestStreak,
            created_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        )
        .select();

      if (error) {
        console.error("Error updating streak data:", error);
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

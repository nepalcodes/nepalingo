import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabaseClient } from "@/config/supabase-client";
import { useAuth } from "@/hooks/Auth";

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

  const fetchStreakData = async () => {
    if (user) {
      const { data, error } = await supabaseClient
        .from("user_daily_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching streak data:", error);
      }
      return data;
    }
  };

  const updateStreakState = async () => {
    const data = await fetchStreakData();

    if (data) {
      setCurrentStreak(data.current_streak);
      setLongestStreak(data.longest_streak);
    }
  };

  useEffect(() => {
    if (user) {
      updateStreakState();
    }
  }, [user]);

  const updateStreak = async () => {
    const data = await fetchStreakData();
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date

    if (user) {
      let newStreak = 1;
      let newLongestStreak = 1;

      if (data?.streak_end_date) {
        const lastDate = new Date(data.streak_end_date)
          .toISOString()
          .split("T")[0];
        if (lastDate === currentDate) {
          return; // No update needed if the user has already visited today
        } else if (
          new Date(currentDate).getTime() - new Date(lastDate).getTime() ===
          86400000
        ) {
          newStreak = data.current_streak + 1;
          newLongestStreak = Math.max(newStreak, data.longest_streak);
          setCurrentStreak(newStreak);
          setLongestStreak(newLongestStreak);
        }
      }

      // Update state
      // Upsert database
      const { error } = await supabaseClient
        .from("user_daily_streaks")
        .upsert(
          {
            user_id: user.id,
            streak_start_date:
              newStreak === 1 ? currentDate : data?.streak_start_date,
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

    // Update the streak state by fetching from the database after an update
    updateStreakState();
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

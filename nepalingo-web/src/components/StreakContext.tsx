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
  const [lastUpdateDate, setLastUpdateDate] = useState<string | null>(null);

  const fetchStreakData = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("user_daily_streaks")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching streak data:", error);
        return;
      }

      if (data && data.length > 0) {
        const streakData = data[0];
        setCurrentStreak(streakData.current_streak);
        setLongestStreak(streakData.longest_streak);
        setLastUpdateDate(streakData.streak_end_date);
      }
    }
  };

  useEffect(() => {
    fetchStreakData();
  }, [user]);

  const updateStreak = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date

    if (user) {
      // Call Supabase function to update streak
      const { data, error } = await supabase.rpc("update_streak", {
        user_id: user.id,
      });

      if (data) {
        // Check if last update date is different from current date
        if (lastUpdateDate !== currentDate) {
          // Calculate new streak
          const newStreak =
            lastUpdateDate === null || lastUpdateDate !== currentDate
              ? 1 // Reset streak if last update was not today
              : currentStreak + 1; // Increment streak

          const newLongestStreak = Math.max(newStreak, longestStreak);

          // Update local state
          setCurrentStreak(newStreak);
          setLongestStreak(newLongestStreak);
          setLastUpdateDate(currentDate);

          // Update database
          const { error } = await supabase.from("user_daily_streaks").upsert({
            user_id: user.id,
            streak_start_date: newStreak === 1 ? currentDate : undefined,
            streak_end_date: currentDate,
            current_streak: newStreak,
            longest_streak: newLongestStreak,
            created_at: new Date().toISOString(),
          });

          if (error) {
            console.error("Error updating streak data:", error);
          }
        }
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

  return context;
};

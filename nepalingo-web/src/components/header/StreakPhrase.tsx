export interface StreakPhrase {
  min: number;
  max: number;
  text: string;
}

const phrases = [
  { min: 0, max: 5, text: "Starting strong! Keep going!" },
  { min: 6, max: 10, text: "On a roll! Nice job!" },
  { min: 11, max: 20, text: "Heating up! As hot as a chilly!" },
  { min: 21, max: 30, text: "Crushing it! Unstoppable!" },
  { min: 31, max: 40, text: "On fire! Even dragons are impressed!" },
  { min: 41, max: 50, text: "Blazing trails! You're a legend in the making!" },
  {
    min: 51,
    max: Infinity,
    text: "Epic streak! You're rewriting the rulebook!",
  },
];

export const getPhrase = (streak: number): string => {
  for (const phrase of phrases) {
    if (streak >= phrase.min && streak <= phrase.max) {
      return phrase.text;
    }
  }
  return "";
};

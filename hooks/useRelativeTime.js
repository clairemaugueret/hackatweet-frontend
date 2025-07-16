import { useState, useEffect } from "react";

export const useRelativeTime = (date) => {
  const [time, setTime] = useState("");

  //TWEET TIME
  const calculateTime = () => {
    const diffHours = (new Date() - new Date(date)) / 36e5;
    if (diffHours < 0.02) return "a few seconds";
    if (diffHours < 1) return `${Math.floor(diffHours * 60)} minutes`;
    if (diffHours < 24) return `${Math.floor(diffHours)} hours`;
    const diffDays = Math.floor(diffHours / 24);
    return diffDays === 1 ? "1 day" : `${diffDays} days`;
  };

  useEffect(() => {
    setTime(calculateTime());
    const interval = setInterval(() => setTime(calculateTime()), 5000);
    return () => clearInterval(interval);
  }, [date]);

  return time;
};

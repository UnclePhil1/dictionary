"use client";
import Search from "@/components/search";
import Results from "@/components/results";
import { createContext, useEffect, useState } from "react";
import SplashScreen from "@/components/splashscreen";

export const InputContext = createContext();

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [showMainContent, setShowMainContent] = useState(false);

  const value = {
    inputValue,
    setInputValue,
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // After 4 seconds, show the main content
      setShowMainContent(true);
    }, 3000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <InputContext.Provider value={value}>
      {showMainContent ? (
        <div className="flex flex-col md:flex-row w-full justify-start items-center gap-10 bg-backbg h-screen md:p-8 p-4">
          <Search />
          <Results />
        </div>
      ) : (
        <SplashScreen />
      )}
    </InputContext.Provider>
  );
}

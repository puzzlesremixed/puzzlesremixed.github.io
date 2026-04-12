import { useEffect, useState } from "react";

interface WindowScrollState {
  x: number;
  y: number;
}

export const useWindowScroll = (): WindowScrollState => {
  const [scrollPosition, setScrollPosition] = useState<WindowScrollState>({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: typeof window !== "undefined" ? window.scrollX : 0,
        y: typeof window !== "undefined" ? window.scrollY : 0,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return scrollPosition;
};
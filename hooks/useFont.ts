import { Quicksand, Oswald } from "next/font/google";

const oswald = Oswald({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const quicksand = Quicksand({
  weight: ['400','500', '600', '700'],
  subsets: ['latin'],
});

interface FontClasses {
  oswald: string;
  quicksand: string;
}

const useFont = (): FontClasses => {
  return {
    oswald: oswald.className,
    quicksand: quicksand.className,
  };
};

export default useFont;
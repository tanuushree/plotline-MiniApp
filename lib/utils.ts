import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const isInFarcasterFrame = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.self !== window.top ||                        // inside iframe
    window.location.href.includes("warpcast") ||        // likely a Mini App
    navigator.userAgent.toLowerCase().includes("farcaster")
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export { isInFarcasterFrame }

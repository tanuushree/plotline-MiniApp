"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useAuthenticate,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { AuthScreen } from "./components/auth-screen"
import { GameScreen } from "./components/game-screen"
import { ScoreScreen } from "./components/score-screen"
import { LoadingScreen } from "./components/loading-screen"
import ComposeCastButton from "./components/ComposeCastButton"
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import { isInFarcasterFrame } from "@/lib/utils";
type GameState = "loading" | "auth" | "game" | "score"

type User = {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  highScore?: number;
};


export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [gameState, setGameState] = useState<GameState>("loading")
  const [user, setUser] = useState<User | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions] = useState(5)

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const { signIn } = useAuthenticate();

  
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
    if (gameState === "loading") {
      const timeout = setTimeout(() => {
        setGameState("auth");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [setFrameReady, isFrameReady, gameState]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  const handleGameComplete = async (finalScore: number) => {
    setScore(finalScore);
    setGameState("score");
    if (user && finalScore > (user.highScore || 0)) {
      try {
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fid: user.fid,
            username: user.username,
            displayName: user.displayName,
            pfpUrl: user.pfpUrl,
            score: finalScore,
          }),
        });
      } catch (err) {
        console.error("Failed to update high score", err);
      }
    }
  };

  const handleAuth = async () => {
    if (context?.user) {
      const { fid, username = "", displayName = "", pfpUrl } = context.user;
      const numericFid = Number(fid) || 0;
      try {
        // Store user in DB via API
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fid: numericFid, username, displayName, pfpUrl }),
        });
        const userFromDb = await res.json();
        setUser(userFromDb);
        console.log("Farcaster user authenticated:", userFromDb);
      } catch (err) {
        console.error("Failed to store user in DB", err);
      }
    } else {
      console.warn("No Farcaster user data found in context");
    }
    setGameState("game");
  };
  
  
  
  
  

  const handleRestart = () => {
    setScore(0)
    setGameState("game")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFDDE5] via-[#FFECEE] to-[#FFF0F3] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <AnimatePresence mode="wait">
          {gameState === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingScreen />
            </motion.div>
          )}
          {gameState === "auth" && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AuthScreen onAuth={handleAuth} />
            </motion.div>
          )}

          {gameState === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <GameScreen user={user} totalQuestions={totalQuestions} onGameComplete={handleGameComplete} />
            </motion.div>
          )}

          {gameState === "score" && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <ScoreScreen
                score={score}
                totalQuestions={totalQuestions}
                user={user}
                onRestart={handleRestart}
                onCastScore={() => { }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

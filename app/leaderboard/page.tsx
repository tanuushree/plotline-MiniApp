"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface LeaderboardUser {
  username: string;
  pfpUrl?: string;
  highScore: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFDDE5] via-[#FFECEE] to-[#FFF0F3] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-[#FF6B9D] mb-2"
            >
              Leaderboard
            </motion.h1>
            <div className="text-gray-600">Top Scores</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.length === 0 && (
                <div className="text-center text-gray-500 py-8">No scores yet.</div>
              )}
              {users.map((user, idx) => (
                <motion.div
                  key={user.username}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex items-center bg-gradient-to-r from-[#FFDDE5] to-[#FFECEE] rounded-xl px-4 py-3 shadow-sm"
                >
                  <div className="mr-4 text-lg font-bold text-[#6C63FF] w-6 text-right">{idx + 1}</div>
                  <img
                    src={user.pfpUrl || "/public/icon.png"}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#6C63FF] bg-white"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-semibold text-gray-800">{user.username}</div>
                  </div>
                  <div className="font-bold text-[#6C63FF] text-lg">{user.highScore}</div>
                </motion.div>
              ))}
            </div>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full mt-6 border-2 border-[#FF9A9E] text-[#FF6B9D] hover:bg-[#FF9A9E] hover:text-white font-semibold py-3 rounded-2xl transition-all duration-300 bg-transparent"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
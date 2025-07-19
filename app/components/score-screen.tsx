"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Trophy, Share, RotateCcw, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  fid: number;
  username: string;
  displayName: string;
}

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  user: User | null;
  onRestart: () => void;
  onCastScore: () => void;
}

export function ScoreScreen({
  score,
  totalQuestions,
  user,
  onRestart,
  onCastScore,
}: ScoreScreenProps) {
  const router = useRouter();
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 80) return "Bookworm Extraordinaire! 📚✨";
    if (percentage >= 60) return "Literary Scholar! 📖";
    if (percentage >= 40) return "Getting There! 📝";
    return "Keep Reading! 📚";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "from-[#4ECDC4] to-[#44A08D]";
    if (percentage >= 60) return "from-[#FF9A9E] to-[#FECFEF]";
    if (percentage >= 40) return "from-[#FFB347] to-[#FFCC70]";
    return "from-[#FF6B9D] to-[#C44569]";
  };

  const handleCastScore = () => {
    const shareText = `I just scored ${score}/${totalQuestions} in the Book Quiz 📚! Try to beat me!`;
    const embedUrl = window.location.href;

    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
      shareText
    )}&embeds[]=${encodeURIComponent(embedUrl)}`;

    window.open(warpcastUrl, "_blank");
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`mx-auto mb-4 w-24 h-24 bg-gradient-to-br ${getScoreColor()} rounded-full flex items-center justify-center`}
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-gray-800"
        >
          {getScoreMessage()}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#C44569] bg-clip-text text-transparent">
            {score}/{totalQuestions}
          </div>
          <div className="text-gray-600 mt-1">{percentage}% Correct</div>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-[#FFDDE5] to-[#FFECEE] p-4 rounded-2xl text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-[#FF6B9D]" />
            <span className="font-semibold text-gray-700">
              Great job, .{user?.username}!
            </span>
          </div>
          <p className="text-sm text-gray-600">
            You've shown some serious literary knowledge. Ready for another
            round?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <Button
            onClick={handleCastScore}
            variant="default"
            className="w-full bg-[#6C63FF] hover:bg-[#5B52E6] text-white font-semibold py-3 rounded-2xl transition-all duration-300"
          >
            <Share className="w-5 h-5 mr-2" />
            Cast My Score
          </Button>

          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-2 border-[#FF9A9E] text-[#FF6B9D] hover:bg-[#FF9A9E] hover:text-white font-semibold py-3 rounded-2xl transition-all duration-300 bg-transparent"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <Button
            onClick={() => router.push("/leaderboard")}
            variant="outline"
            className="w-full border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white font-semibold py-3 rounded-2xl transition-all duration-300 bg-transparent"
          >
            <IconLeaderboard className="w-5 h-5 mr-2" />
            Leaderboard
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function IconLeaderboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="13" width="4" height="8" />
      <rect x="10" y="9" width="4" height="12" />
      <rect x="17" y="5" width="4" height="16" />
    </svg>
  );
}

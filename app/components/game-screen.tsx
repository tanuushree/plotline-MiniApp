"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Eye, Trophy, Send, CheckCircle, XCircle } from "lucide-react";

interface User {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  highScore?: number;
}

interface Question {
  id: number;
  plot: string;
  answer: string;
  author: string;
  alternativeAnswers?: string[];
}

interface GameScreenProps {
  user: User | null;
  totalQuestions: number;
  onGameComplete: (score: number) => void;
}

const questions: Question[] = [
  {
    id: 1,
    plot: "A young wizard discovers he's famous in the magical world and must attend a school of witchcraft and wizardry, where he learns about his past and faces a dark lord.",
    answer: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    alternativeAnswers: [
      "Harry Potter and the Sorcerer's Stone",
      "Harry Potter",
      "Philosopher's Stone",
      "Sorcerer's Stone",
    ],
  },
  {
    id: 2,
    plot: "In a dystopian future, a young woman volunteers to take her sister's place in a televised fight to the death, sparking a revolution against an oppressive government.",
    answer: "The Hunger Games",
    author: "Suzanne Collins",
    alternativeAnswers: ["Hunger Games"],
  },
  {
    id: 3,
    plot: "A hobbit is reluctantly swept into an epic quest to help a group of dwarves reclaim their mountain home from a fearsome dragon.",
    answer: "The Hobbit",
    author: "J.R.R. Tolkien",
    alternativeAnswers: ["Hobbit"],
  },
  {
    id: 4,
    plot: "A mockingbird is killed in a small Southern town, serving as a metaphor for the destruction of innocence as a young girl witnesses racial injustice.",
    answer: "To Kill a Mockingbird",
    author: "Harper Lee",
    alternativeAnswers: ["To Kill A Mockingbird", "Kill a Mockingbird"],
  },
  {
    id: 5,
    plot: "In a totalitarian society, a man working at the Ministry of Truth begins to question the regime and falls in love, leading to his ultimate downfall.",
    answer: "1984",
    author: "George Orwell",
    alternativeAnswers: ["Nineteen Eighty-Four", "Nineteen Eighty Four"],
  },
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^ -\w\s]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function checkAnswer(userAnswer: string, correctAnswer: string, alternatives: string[] = []): boolean {
  const normalizedUser = normalizeText(userAnswer);
  const normalizedCorrect = normalizeText(correctAnswer);
  if (normalizedUser === normalizedCorrect) return true;
  return alternatives.some((alt) => normalizeText(alt) === normalizedUser);
}

export function GameScreen({ user, totalQuestions, onGameComplete }: GameScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = questions[currentQuestion];

  const handleSubmitGuess = () => {
    if (!userGuess.trim() || hasGuessed) return;
    const correct = checkAnswer(userGuess, currentQ.answer, currentQ.alternativeAnswers);
    setIsCorrect(correct);
    setHasGuessed(true);
    if (correct) setScore(score + 1);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setHasGuessed(false);
      setIsCorrect(null);
      setUserGuess("");
    } else {
      onGameComplete(score);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !hasGuessed) {
      handleSubmitGuess();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 text-[#FF6B9D]">User</div>
              <span className="font-semibold text-gray-700">.{user?.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#FF6B9D]" />
              <span className="font-semibold text-gray-700">
                {score}/{totalQuestions}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-800 text-center">Can you guess this book?</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-[#FFDDE5] to-[#FFECEE] p-6 rounded-2xl">
                <p className="text-gray-700 leading-relaxed italic">&quot;{currentQ.plot}&quot;</p>
              </div>

              {/* User Input Section */}
              {!hasGuessed && !showAnswer && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="guess" className="text-sm font-medium text-gray-700">
                      Your guess:
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        id="guess"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter the book title..."
                        className="flex-1 bg-[white] text-[black] rounded-xl border-2 "
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSubmitGuess}
                      disabled={!userGuess.trim()}
                      className="bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] hover:from-[#FF8A95] to-[#FDB7E5] text-white rounded-xl px-6 flex-1"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                    
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    💡 Tip: Don&apos;t worry about exact spelling, capitalization, or spaces!
                  </p>
                  <Button
                      onClick={handleShowAnswer}
                      variant="outline"
                      className="w-full border-2 bg-[white] border-[#FF9A9E] text-[#FF6B9D] hover:bg-[#FF9A9E] hover:text-white font-semibold rounded-xl flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Give Up & Show Answer
                    </Button>
                </motion.div>
              )}

              {/* Guess Result */}
              <AnimatePresence>
                {hasGuessed && !showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl border-2 ${
                      isCorrect
                        ? "bg-gradient-to-r from-[#E8F5E8] to-[#F0FFF0] border-green-200"
                        : "bg-gradient-to-r from-[#FFE8E8] to-[#FFF0F0] border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <span className={`font-bold text-lg ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                        {isCorrect ? "Correct! 🎉" : "Not quite! 😅"}
                      </span>
                    </div>
                    <p className={`text-center ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      Your guess: &quot;{userGuess}&quot;
                    </p>
                    {isCorrect && (
                      <p className="text-center text-green-600 text-sm mt-2">+1 point added to your score!</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Correct Answer */}
              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-r from-[#E8F5E8] to-[#F0FFF0] p-6 rounded-2xl border-2 border-green-200"
                  >
                    <h3 className="font-bold text-green-800 text-lg mb-2">{currentQ.answer}</h3>
                    <p className="text-green-700">by {currentQ.author}</p>
                    {hasGuessed && !isCorrect && (
                      <p className="text-green-600 text-sm mt-2 italic">
                        Your guess &quot;{userGuess}&quot; was close! Keep trying! 📚
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="space-y-3">
                {hasGuessed && !showAnswer && (
                  <Button
                    onClick={handleShowAnswer}
                    variant="outline"
                    className="w-full border-2 border-[#FF9A9E] text-[#FF6B9D] hover:bg-[#FF9A9E] hover:text-white font-semibold py-3 rounded-2xl transition-all duration-300 bg-transparent"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Show Correct Answer
                  </Button>
                )}

                {(showAnswer || hasGuessed) && (
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] hover:from-[#FF8A95] to-[#FDB7E5] text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {currentQuestion < totalQuestions - 1 ? "Next Question" : "See Final Score"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { BookOpen, Sparkles } from "lucide-react"

interface AuthScreenProps {
  onAuth: () => void
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] rounded-full flex items-center justify-center"
        >
          <BookOpen className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#C44569] bg-clip-text text-transparent"
        >
          Plotline Flashcards
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mt-2"
        >
          Test your literary knowledge with fun plot snippets!
        </motion.p>
      </CardHeader>

      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Guess the book from plot snippets</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Track your score and share results</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <Button
            onClick={onAuth}
            className="w-full bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] hover:from-[#FF8A95] to-[#FDB7E5] text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Connect with Farcaster
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

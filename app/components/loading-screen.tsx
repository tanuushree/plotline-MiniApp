"use client"

import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-20">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        className="w-20 h-20 bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] rounded-full flex items-center justify-center"
      >
        <BookOpen className="w-10 h-10 text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#C44569] bg-clip-text text-transparent">
          Plotline Flashcards
        </h2>
        <p className="text-gray-600 mt-2">Loading your literary adventure...</p>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] rounded-full max-w-xs"
      />
    </div>
  )
}

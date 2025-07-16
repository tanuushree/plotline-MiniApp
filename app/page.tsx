"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { sdk } from "@farcaster/miniapp-sdk"
import Link from "next/link"
import { Book, BookOpen, LogIn } from "lucide-react"

export default function LandingPage() {
  const [ready, setReady] = useState(false)
  const [authStatus, setAuthStatus] = useState<"loading" | "signed-in" | "error">("loading")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await sdk.quickAuth.getToken()
        console.log("Quick Auth response:", res)
        setAuthStatus("signed-in")
      } catch (e) {
        console.error("Quick Auth failed:", e)
        setAuthStatus("error")
      }
      await sdk.actions.ready()
      setReady(true)
    })()
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!ready) return null  // Splash screen stays

  if (authStatus === "error") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
        <button onClick={() => window.location.reload()} className="btn-primary mx-auto flex items-center">
          <LogIn className="w-5 h-5 mr-2" />
          Tap to sign in with Farcaster
        </button>
      </motion.div>
    )
  }

  if (!mounted) return null  // Avoid hydration mismatch

  // Authenticated UI
  const genres = [
    { id: "romance", name: "Romance", icon: "💕", color: "bg-pink-50" },
    { id: "classics", name: "Classics", icon: "📜", color: "bg-amber-50" },
    { id: "fantasy", name: "Fantasy", icon: "🧙", color: "bg-purple-50" },
    { id: "scifi", name: "Sci‑Fi", icon: "🚀", color: "bg-blue-50" },
    { id: "mystery", name: "Mystery", icon: "🔍", color: "bg-green-50" },
    { id: "horror", name: "Horror", icon: "👻", color: "bg-red-50" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b border-dusty-rose/10">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-dusty-rose mr-2" />
          <h1 className="text-xl font-playfair">Plotline</h1>
        </div>
        <nav className="flex space-x-4 items-center">
          <Link href="/daily" className="text-charcoal/70 hover:text-dusty-rose transition-colors">Daily</Link>
          <Link href="/leaderboard" className="text-charcoal/70 hover:text-dusty-rose transition-colors">Leaderboard</Link>
        </nav>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair mb-4">Welcome to Plotline</h1>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
            Enough of Instagram scrolling, let’s see if you can guess the book from the plot!
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {genres.map((genre) => (
            <motion.div key={genre.id} variants={item}>
              <Link href={`/genre/${genre.id}`}>
                <div className={`genre-card ${genre.color} h-40 md:h-48`}>
                  <span className="text-4xl mb-2">{genre.icon}</span>
                  <h2 className="text-xl font-playfair text-center">{genre.name}</h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className="mt-16 flex flex-col items-center">
          <h2 className="text-2xl font-playfair mb-6">Daily Challenge</h2>
          <Link href="/daily">
            <button className="btn-primary flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Try Today's Book
            </button>
          </Link>
        </motion.div>
      </main>

      <footer className="py-6 px-4 border-t border-dusty-rose/10 text-center text-charcoal/60 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Plotline</p>
        </div>
      </footer>
    </div>
  )
}

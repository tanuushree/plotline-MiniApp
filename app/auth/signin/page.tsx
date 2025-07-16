"use client"

import { useEffect, useState } from "react"
import { sdk } from "@farcaster/miniapp-sdk"
import router from "next/navigation"

export default function SignInRedirect() {
  const [user, setUser] = useState<{ fid: number } | null>(null)

  useEffect(() => {
    sdk.quickAuth.fetch("/api/me").then(res => {
      if (res.ok) {
        res.json().then(u => {
          setUser(u)
          sdk.actions.ready()
        })
      } else {
        console.error("Quick Auth failed")
      }
    })
  }, [])

  if (!user) return null // keep splash shown until ready()

  // Once signed in, redirect to profile
  router.push("/profile")
  return null
}

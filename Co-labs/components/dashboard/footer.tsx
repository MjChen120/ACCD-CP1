"use client"

import Link from "next/link"
import { useColor } from "./color-context"

export function Footer() {
  const { isColorful } = useColor()
  
  return (
    <footer className={`border-t-2 transition-colors duration-300 ${
      isColorful 
        ? "border-violet-300 bg-gradient-to-br from-violet-900 via-rose-900 to-cyan-900 text-white" 
        : "border-foreground/10 bg-foreground text-background"
    }`}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                isColorful 
                  ? "bg-white text-violet-900" 
                  : "bg-background text-foreground"
              }`}>
                <span className="text-sm font-bold">Co</span>
              </div>
              <span className="text-xl font-bold tracking-tight">CoLabs</span>
            </div>
            <p className={`mt-4 text-sm ${
              isColorful ? "text-white/70" : "text-background/70"
            }`}>
              Collaborative learning and project management platform for
              academic teams.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Platform</h3>
            <ul className={`mt-4 space-y-2 text-sm ${
              isColorful ? "text-white/70" : "text-background/70"
            }`}>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Teams
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className={`mt-4 space-y-2 text-sm ${
              isColorful ? "text-white/70" : "text-background/70"
            }`}>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className={`mt-4 space-y-2 text-sm ${
              isColorful ? "text-white/70" : "text-background/70"
            }`}>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className={`transition-colors ${
                  isColorful ? "hover:text-white" : "hover:text-background"
                }`}>
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row ${
          isColorful ? "border-white/20" : "border-background/20"
        }`}>
          <p className={`text-sm ${
            isColorful ? "text-white/60" : "text-background/60"
          }`}>
            2026 CoLabs. MIT Media Lab Initiative.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className={`text-sm transition-colors ${
                isColorful ? "text-white/60 hover:text-white" : "text-background/60 hover:text-background"
              }`}
            >
              Twitter
            </Link>
            <Link
              href="#"
              className={`text-sm transition-colors ${
                isColorful ? "text-white/60 hover:text-white" : "text-background/60 hover:text-background"
              }`}
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className={`text-sm transition-colors ${
                isColorful ? "text-white/60 hover:text-white" : "text-background/60 hover:text-background"
              }`}
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

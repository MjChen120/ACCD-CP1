"use client"

import { Home, Search, Bell, Mail, Bookmark, Users, User, MoreHorizontal, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Sparkles, label: "Grok" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: Users, label: "Communities" },
  { icon: User, label: "Profile" },
  { icon: MoreHorizontal, label: "More" },
]

export function SocialSidebar() {
  return (
    <div className="flex flex-col h-full py-2">
      {/* Logo */}
      <div className="px-3 mb-2">
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-foreground">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-4 px-3 py-3 w-full hover:bg-secondary/50 rounded-full transition-colors group",
              item.active && "font-bold"
            )}
          >
            <item.icon className={cn(
              "h-6 w-6",
              item.active ? "stroke-[2.5]" : "stroke-[1.5]"
            )} />
            <span className="text-xl hidden xl:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Post Button */}
      <div className="px-3 mt-4">
        <button className="w-full bg-[#1D9BF0] hover:bg-[#1D9BF0]/90 text-white font-bold py-3 px-4 rounded-full transition-colors">
          <span className="hidden xl:block">Post</span>
          <span className="xl:hidden text-xl">+</span>
        </button>
      </div>
    </div>
  )
}

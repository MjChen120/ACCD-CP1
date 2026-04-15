"use client"

import Link from "next/link"
import { ChevronDown, User, Palette, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useColor } from "./color-context"

export function Header() {
  const { isColorful, toggleColorful } = useColor()

  return (
    <header className={`border-b-2 transition-colors duration-300 ${
      isColorful 
        ? "border-violet-400 bg-gradient-to-r from-rose-50 via-violet-50 to-cyan-50 dark:from-rose-950/30 dark:via-violet-950/30 dark:to-cyan-950/30" 
        : "border-foreground/10 bg-card"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className={`text-xl font-bold tracking-tight transition-colors ${
            isColorful ? "text-violet-700 dark:text-violet-300" : ""
          }`}>
            CoLabs
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium ${
                    isColorful 
                      ? "hover:bg-violet-100 dark:hover:bg-violet-900/30" 
                      : ""
                  }`}
                >
                  Mentor
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mentor Profiles</DropdownMenuItem>
                <DropdownMenuItem>Shared Resources</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              About Us
            </Link>

            {/* Notification Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative rounded-full ${
                    isColorful 
                      ? "hover:bg-violet-100 dark:hover:bg-violet-900/30" 
                      : ""
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  <Badge className={`absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] ${
                    isColorful 
                      ? "bg-rose-500 text-white" 
                      : "bg-destructive text-destructive-foreground"
                  }`}>
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 border-b">
                  <p className="font-semibold text-sm">Notifications</p>
                </div>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium">New document uploaded</p>
                  <p className="text-xs text-muted-foreground">Jordan Kim uploaded &quot;Wireframes v2.fig&quot;</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium">Task updated</p>
                  <p className="text-xs text-muted-foreground">API Endpoint moved to &quot;In Progress&quot;</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium">Upcoming event</p>
                  <p className="text-xs text-muted-foreground">Hobby Roulette in 2 days</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleColorful}
              className={`rounded-full transition-all ${
                isColorful 
                  ? "bg-gradient-to-br from-rose-400 via-violet-400 to-cyan-400 text-white hover:from-rose-500 hover:via-violet-500 hover:to-cyan-500" 
                  : ""
              }`}
              title={isColorful ? "Switch to minimal mode" : "Switch to colorful mode"}
            >
              <Palette className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isColorful 
                      ? "bg-gradient-to-br from-rose-200 to-violet-200 border-violet-300" 
                      : "bg-muted border-border"
                  }`}>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

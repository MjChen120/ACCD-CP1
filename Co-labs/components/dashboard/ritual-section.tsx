"use client"

import { useState } from "react"
import { Sparkles, Calendar, Info, Users, PartyPopper, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useColor } from "./color-context"

const ritualsData = {
  hobbyRoulette: {
    name: "Hobby Roulette",
    description: "A team ritual where members connect beyond their projects through shared activities chosen by the weekly host.",
    upcomingHost: "Jordan Kim",
    upcomingDate: "Mar 19, 2026",
    isCurrentUserHost: false,
    message: "The activity will be revealed during class. Be ready to participate and connect with your team for the first 10 to 15 minutes of class.",
  },
  brainsAndBites: {
    name: "Brains and Bites",
    description: "A celebratory lab-wide ritual following team presentations where all teams connect with each other, mentors, and coordinators.",
    upcomingDate: "Mar 26, 2026",
    message: "Join the celebration after team presentations to connect with fellow lab members, mentors, and coordinators.",
  },
}

export function RitualSection() {
  const { isColorful } = useColor()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className={`border-2 transition-all duration-300 ${
      isColorful 
        ? "border-rose-300 dark:border-rose-700" 
        : "border-foreground/10"
    }`}>
      <CardHeader className={`py-4 px-4 sm:px-6 border-b-2 transition-colors duration-300 ${
        isColorful 
          ? "border-rose-200 dark:border-rose-800" 
          : "border-foreground/10"
      } ${!isExpanded ? "border-b-0" : ""}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className={`h-5 w-5 ${
              isColorful ? "text-rose-600 dark:text-rose-400" : ""
            }`} />
            <CardTitle className={`text-lg font-semibold ${
              isColorful ? "text-rose-700 dark:text-rose-300" : ""
            }`}>
              Rituals
            </CardTitle>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Upcoming Host for Hobby Roulette:</span>
              <span className={`font-medium ${
                isColorful ? "text-rose-700 dark:text-rose-300" : ""
              }`}>
                {ritualsData.hobbyRoulette.upcomingHost}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="About rituals"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    Rituals are graded activities that build trust and connection within
                    your team and across the lab. Attendance is required.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Badge className={`text-xs ${
              isColorful 
                ? "bg-rose-500/20 text-rose-700 dark:text-rose-300" 
                : "bg-accent text-accent-foreground"
            }`}>
              Graded
            </Badge>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={isColorful ? "hover:bg-rose-100 dark:hover:bg-rose-900/30" : ""}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Hobby Roulette */}
          <div className={`p-4 rounded-lg space-y-3 transition-colors ${
            isColorful 
              ? "bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800" 
              : "bg-secondary/50 border border-foreground/5"
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  isColorful 
                    ? "bg-rose-100 dark:bg-rose-900/30" 
                    : "bg-secondary"
                }`}>
                  <Sparkles className={`h-4 w-4 ${
                    isColorful ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isColorful ? "text-rose-700 dark:text-rose-300" : ""
                  }`}>
                    {ritualsData.hobbyRoulette.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <Users className="h-3 w-3" />
                    <span>Team Activity</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Host:</span>
                <span className={`font-medium ${
                  isColorful ? "text-rose-700 dark:text-rose-300" : ""
                }`}>
                  {ritualsData.hobbyRoulette.upcomingHost}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{ritualsData.hobbyRoulette.upcomingDate}</span>
              </div>
            </div>

            <p className={`text-sm text-muted-foreground border-l-2 pl-3 ${
              isColorful ? "border-rose-300" : "border-border"
            }`}>
              {ritualsData.hobbyRoulette.message}
            </p>
          </div>

          {/* Brains and Bites */}
          <div className={`p-4 rounded-lg space-y-3 transition-colors ${
            isColorful 
              ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800" 
              : "bg-secondary/50 border border-foreground/5"
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  isColorful 
                    ? "bg-amber-100 dark:bg-amber-900/30" 
                    : "bg-secondary"
                }`}>
                  <PartyPopper className={`h-4 w-4 ${
                    isColorful ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${
                    isColorful ? "text-amber-700 dark:text-amber-300" : ""
                  }`}>
                    {ritualsData.brainsAndBites.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <Users className="h-3 w-3" />
                    <span>Lab-wide Celebration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{ritualsData.brainsAndBites.upcomingDate}</span>
              <span className="text-xs">(After Team Presentations)</span>
            </div>

            <p className={`text-sm text-muted-foreground border-l-2 pl-3 ${
              isColorful ? "border-amber-300" : "border-border"
            }`}>
              {ritualsData.brainsAndBites.message}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

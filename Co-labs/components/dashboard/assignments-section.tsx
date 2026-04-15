"use client"

import { useState } from "react"
import { FileText, Users, Clock, ArrowRight, Presentation, User, ChevronDown, ChevronUp, CalendarClock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useColor } from "./color-context"

type ViewType = "individual" | "team"

const individualAssignments = [
  {
    id: 1,
    type: "evaluation",
    title: "Peer Evaluation",
    description: "Evaluate your teammates' contributions this sprint",
    dueDate: "Mar 20, 2026",
    daysLeft: 3,
    status: "pending",
  },
  {
    id: 2,
    type: "meeting",
    title: "1-1 Meeting with Mentor",
    description: "Scheduled check-in with your assigned mentor",
    dueDate: "Mar 21, 2026",
    daysLeft: 4,
    status: "pending",
  },
]

const teamAssignments = [
  {
    id: 1,
    type: "report",
    title: "Progress Report",
    description: "Weekly update on project milestones and blockers",
    dueDate: "Mar 18, 2026",
    daysLeft: 1,
    status: "pending",
  },
  {
    id: 2,
    type: "presentation",
    title: "Team Presentation",
    description: "Present your project progress and findings to the cohort",
    dueDate: "Mar 26, 2026",
    daysLeft: 9,
    status: "pending",
  },
  {
    id: 3,
    type: "report",
    title: "Mentor Check-in Notes",
    description: "Submit notes from your group mentor session",
    dueDate: "Mar 22, 2026",
    daysLeft: 5,
    status: "pending",
  },
]

export function AssignmentsSection() {
  const { isColorful } = useColor()
  const [viewType, setViewType] = useState<ViewType>("individual")
  const [isExpanded, setIsExpanded] = useState(true)
  
  const assignments = viewType === "individual" ? individualAssignments : teamAssignments
  
  return (
    <Card className={`border-2 transition-all duration-300 flex flex-col ${isExpanded ? "self-stretch" : "self-start"} ${
      isColorful 
        ? "border-amber-300 dark:border-amber-700" 
        : "border-foreground/10"
    }`}>
      <CardHeader className={`pb-4 border-b-2 transition-colors duration-300 ${
        isColorful 
          ? "border-amber-200 dark:border-amber-800" 
          : "border-foreground/10"
      } ${!isExpanded ? "border-b-0" : ""}`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CalendarClock className={`h-5 w-5 ${
              isColorful ? "text-amber-600 dark:text-amber-400" : ""
            }`} />
            <CardTitle className={`text-lg font-semibold ${
              isColorful ? "text-amber-700 dark:text-amber-300" : ""
            }`}>
              Upcoming Deadlines
            </CardTitle>
            <Badge variant="secondary" className={`font-mono text-xs ${
              isColorful ? "bg-amber-500/20 text-amber-700 dark:text-amber-300" : ""
            }`}>
              {assignments.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {/* Individual/Team Toggle */}
            <div className={`flex rounded-md border-2 transition-colors ${
              isColorful ? "border-amber-300" : "border-foreground/20"
            }`}>
              <button
                onClick={() => setViewType("individual")}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewType === "individual"
                    ? isColorful 
                      ? "bg-amber-600 text-white" 
                      : "bg-foreground text-background"
                    : "hover:bg-foreground/5"
                }`}
              >
                <User className="h-3 w-3" />
                <span className="hidden sm:inline">Individual</span>
              </button>
              <button
                onClick={() => setViewType("team")}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewType === "team"
                    ? isColorful 
                      ? "bg-amber-600 text-white" 
                      : "bg-foreground text-background"
                    : "hover:bg-foreground/5"
                }`}
              >
                <Users className="h-3 w-3" />
                <span className="hidden sm:inline">Team</span>
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={isColorful ? "hover:bg-amber-100 dark:hover:bg-amber-900/30" : ""}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-0 flex-1">
          <div className={`divide-y ${
            isColorful ? "divide-amber-200 dark:divide-amber-800" : "divide-border"
          }`}>
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`p-4 transition-colors group ${
                  isColorful 
                    ? "hover:bg-amber-50 dark:hover:bg-amber-900/20" 
                    : "hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                    isColorful 
                      ? assignment.type === "report" 
                        ? "bg-amber-100 dark:bg-amber-900/30"
                        : assignment.type === "presentation"
                          ? "bg-emerald-100 dark:bg-emerald-900/30"
                          : assignment.type === "meeting"
                            ? "bg-cyan-100 dark:bg-cyan-900/30"
                            : "bg-violet-100 dark:bg-violet-900/30"
                      : "bg-secondary"
                  }`}>
                    {assignment.type === "report" ? (
                      <FileText className={`h-5 w-5 ${
                        isColorful ? "text-amber-600 dark:text-amber-400" : "text-foreground"
                      }`} />
                    ) : assignment.type === "presentation" ? (
                      <Presentation className={`h-5 w-5 ${
                        isColorful ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                      }`} />
                    ) : assignment.type === "meeting" ? (
                      <Users className={`h-5 w-5 ${
                        isColorful ? "text-cyan-600 dark:text-cyan-400" : "text-foreground"
                      }`} />
                    ) : (
                      <Users className={`h-5 w-5 ${
                        isColorful ? "text-violet-600 dark:text-violet-400" : "text-foreground"
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-sm">
                          {assignment.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {assignment.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{assignment.dueDate}</span>
                      </div>
                      <Badge
                        variant={assignment.daysLeft <= 3 ? "destructive" : "secondary"}
                        className={`text-xs font-mono ${
                          isColorful && assignment.daysLeft <= 3
                            ? "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                            : isColorful 
                              ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                              : ""
                        }`}
                      >
                        {assignment.daysLeft}d left
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

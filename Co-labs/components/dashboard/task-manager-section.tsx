"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, GripVertical, Check, ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react"
import { useColor } from "./color-context"

type KanbanStatus = "todo" | "in-progress" | "issue" | "completed" | "review"
type TaskTag = "in-progress" | "completed" | "flag" | "bug" | "change"

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  tag: TaskTag
  kanbanStatus: KanbanStatus
}

const tagColors: Record<TaskTag, string> = {
  "in-progress": "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  completed: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  flag: "bg-red-500/20 text-red-700 dark:text-red-400",
  bug: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
  change: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
}

const tagColorsColorful: Record<TaskTag, string> = {
  "in-progress": "bg-amber-400/30 text-amber-800 dark:text-amber-300 border border-amber-400/50",
  completed: "bg-emerald-400/30 text-emerald-800 dark:text-emerald-300 border border-emerald-400/50",
  flag: "bg-rose-400/30 text-rose-800 dark:text-rose-300 border border-rose-400/50",
  bug: "bg-violet-400/30 text-violet-800 dark:text-violet-300 border border-violet-400/50",
  change: "bg-cyan-400/30 text-cyan-800 dark:text-cyan-300 border border-cyan-400/50",
}

const tagLabels: Record<TaskTag, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  flag: "Flagged",
  bug: "Bug",
  change: "Change",
}

const kanbanColumns: { status: KanbanStatus; label: string; color: string; colorfulColor: string }[] = [
  { status: "todo", label: "To Do", color: "bg-foreground/5", colorfulColor: "bg-slate-100 dark:bg-slate-800/50" },
  { status: "in-progress", label: "In Progress", color: "bg-amber-500/5", colorfulColor: "bg-amber-50 dark:bg-amber-900/20" },
  { status: "issue", label: "Issue", color: "bg-red-500/5", colorfulColor: "bg-rose-50 dark:bg-rose-900/20" },
  { status: "completed", label: "Completed", color: "bg-emerald-500/5", colorfulColor: "bg-emerald-50 dark:bg-emerald-900/20" },
  { status: "review", label: "Review", color: "bg-blue-500/5", colorfulColor: "bg-violet-50 dark:bg-violet-900/20" },
]

// Initial tasks (only tasks, not events)
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Research Literature Review",
    description: "Complete literature review on adaptive learning algorithms",
    assignedTo: "Alex Chen",
    tag: "in-progress",
    kanbanStatus: "in-progress",
  },
  {
    id: "2",
    title: "Interview Analysis Report",
    description: "Analyze user interview transcripts and identify patterns",
    assignedTo: "Alex Chen",
    tag: "flag",
    kanbanStatus: "todo",
  },
  {
    id: "3",
    title: "Wireframe Student Dashboard",
    description: "Design wireframes for the student-facing dashboard",
    assignedTo: "Jordan Kim",
    tag: "in-progress",
    kanbanStatus: "in-progress",
  },
  {
    id: "4",
    title: "User Flow Documentation",
    description: "Document complete user flows for onboarding",
    assignedTo: "Jordan Kim",
    tag: "completed",
    kanbanStatus: "completed",
  },
  {
    id: "5",
    title: "API Endpoint Development",
    description: "Build REST API endpoints for progress tracking",
    assignedTo: "Sam Rivera",
    tag: "bug",
    kanbanStatus: "issue",
  },
  {
    id: "6",
    title: "Database Schema Update",
    description: "Update schema for new analytics features",
    assignedTo: "Sam Rivera",
    tag: "in-progress",
    kanbanStatus: "review",
  },
  {
    id: "7",
    title: "Learning Analytics Dashboard",
    description: "Create data visualizations for engagement patterns",
    assignedTo: "Taylor Wu",
    tag: "in-progress",
    kanbanStatus: "in-progress",
  },
  {
    id: "8",
    title: "A/B Test Analysis",
    description: "Analyze recommendation algorithm A/B test results",
    assignedTo: "Taylor Wu",
    tag: "flag",
    kanbanStatus: "todo",
  },
  {
    id: "9",
    title: "Sprint Planning",
    description: "Lead sprint planning and prioritize backlog",
    assignedTo: "Morgan Lee",
    tag: "completed",
    kanbanStatus: "completed",
  },
  {
    id: "10",
    title: "Stakeholder Presentation Prep",
    description: "Prepare presentation deck for Mar 26",
    assignedTo: "Morgan Lee",
    tag: "flag",
    kanbanStatus: "todo",
  },
]

export function TaskManagerSection() {
  const { isColorful } = useColor()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSectionExpanded, setIsSectionExpanded] = useState(true)
  const [showCompleted, setShowCompleted] = useState(true)

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: KanbanStatus) => {
    if (draggedTask) {
      setTasks(tasks.map(task => 
        task.id === draggedTask 
          ? { 
              ...task, 
              kanbanStatus: status,
              // Update tag to completed if dropped in completed column
              tag: status === "completed" ? "completed" : task.tag
            }
          : task
      ))
      setDraggedTask(null)
    }
  }

  const handleMarkComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, kanbanStatus: "completed", tag: "completed" }
        : task
    ))
  }

  const getTasksByStatus = (status: KanbanStatus) => {
    return tasks.filter((task) => task.kanbanStatus === status)
  }

  const currentTagColors = isColorful ? tagColorsColorful : tagColors

  // Filter out completed tasks if showCompleted is false
  const visibleColumns = showCompleted 
    ? kanbanColumns 
    : kanbanColumns.filter(col => col.status !== "completed")

  return (
    <>
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />
      )}
      <Card className={`border-2 transition-all duration-300 ${
        isColorful 
          ? "border-emerald-300 dark:border-emerald-700" 
          : "border-foreground/10"
      } ${
        isExpanded 
          ? "fixed inset-4 z-50 overflow-auto" 
          : ""
      }`}>
        <CardHeader className={`pb-4 border-b-2 transition-colors duration-300 ${
          isColorful 
            ? "border-emerald-200 dark:border-emerald-800" 
            : "border-foreground/10"
        }`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <LayoutGrid className={`h-5 w-5 ${
                isColorful ? "text-emerald-600 dark:text-emerald-400" : ""
              }`} />
              <CardTitle className={`text-lg font-semibold ${
                isColorful ? "text-emerald-700 dark:text-emerald-300" : ""
              }`}>
                Task Manager
              </CardTitle>
              <Badge variant="secondary" className={`text-xs ${
                isColorful ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" : ""
              }`}>
                {tasks.filter(t => t.kanbanStatus !== "completed").length} Active
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCompleted(!showCompleted)}
                className={`text-xs ${
                  isColorful 
                    ? "border-emerald-400 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30" 
                    : ""
                }`}
              >
                {showCompleted ? "Hide Completed" : "Show Completed"}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className={isColorful ? "hover:bg-emerald-100 dark:hover:bg-emerald-900/30" : ""}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSectionExpanded(!isSectionExpanded)}
                className={isColorful ? "hover:bg-emerald-100 dark:hover:bg-emerald-900/30" : ""}
              >
                {isSectionExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Completed tasks will show a checkmark and can be hidden from the board
          </p>
        </CardHeader>
        {isSectionExpanded && (
          <CardContent className="p-4">
            {/* Kanban View */}
            <div className="flex gap-3 overflow-x-auto pb-4">
              {visibleColumns.map((column) => (
                <div
                  key={column.status}
                  className={`flex min-w-56 flex-1 flex-col rounded-lg transition-colors ${
                    isColorful ? column.colorfulColor : column.color
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(column.status)}
                >
                  <div className={`flex items-center justify-between border-b-2 p-3 ${
                    isColorful ? "border-emerald-200/50 dark:border-emerald-700/50" : "border-foreground/10"
                  }`}>
                    <h3 className="text-sm font-semibold">{column.label}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {getTasksByStatus(column.status).length}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2 p-3">
                    {getTasksByStatus(column.status).map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className={`cursor-grab rounded-lg border-2 bg-card p-3 transition-all hover:shadow-md active:cursor-grabbing ${
                          isColorful 
                            ? "border-emerald-200 dark:border-emerald-700 hover:border-emerald-400" 
                            : "border-foreground/10 hover:border-foreground/20"
                        } ${draggedTask === task.id ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {task.kanbanStatus === "completed" && (
                                <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                  isColorful 
                                    ? "bg-emerald-500 text-white" 
                                    : "bg-foreground text-background"
                                }`}>
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                              <p className={`font-medium text-sm ${
                                task.kanbanStatus === "completed" ? "line-through text-muted-foreground" : ""
                              }`}>
                                {task.title}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {task.assignedTo.split(" ")[0]}
                          </span>
                          <div className="flex items-center gap-2">
                            {task.kanbanStatus !== "completed" && (
                              <button
                                onClick={() => handleMarkComplete(task.id)}
                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/30 ${
                                  isColorful 
                                    ? "border-emerald-400 text-emerald-600" 
                                    : "border-foreground/30 text-foreground/50"
                                }`}
                                title="Mark as complete"
                              >
                                <Check className="h-3 w-3" />
                              </button>
                            )}
                            <Badge className={`text-xs ${currentTagColors[task.tag]}`} variant="secondary">
                              {tagLabels[task.tag]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    {getTasksByStatus(column.status).length === 0 && (
                      <div className={`rounded-lg border-2 border-dashed p-4 text-center text-xs text-muted-foreground ${
                        isColorful ? "border-emerald-200" : "border-foreground/10"
                      }`}>
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </>
  )
}

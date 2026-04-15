"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Plus, Paperclip, Image, Link2, X, FileText, Calendar, Maximize2, Minimize2, ChevronDown, ChevronUp } from "lucide-react"
import { useColor } from "./color-context"

type ViewMode = "daily" | "weekly" | "monthly"
type TicketType = "event" | "task"
type TaskTag = "in-progress" | "completed" | "flag" | "bug" | "change"
type KanbanStatus = "todo" | "in-progress" | "issue" | "completed" | "review"

interface TicketAttachment {
  id: string
  name: string
  type: "file" | "image" | "link"
  url?: string
}

export interface CalendarTicket {
  id: string
  title: string
  description: string
  date: Date
  time: string
  assignedTo: string
  ticketType: TicketType
  tag: TaskTag
  attachments: TicketAttachment[]
  kanbanStatus: KanbanStatus
  meetingUrl?: string
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
  change: "Change of Direction",
}

const teamMembers = ["Alex Chen", "Jordan Kim", "Sam Rivera", "Taylor Wu", "Morgan Lee"]

const initialTickets: CalendarTicket[] = [
  // Events
  {
    id: "e1",
    title: "Hobby Roulette - Jordan Hosting",
    description: "Team ritual activity hosted by Jordan Kim. Be ready to participate and connect.",
    date: new Date(2026, 2, 19),
    time: "13:00",
    assignedTo: "Jordan Kim",
    ticketType: "event",
    tag: "flag",
    attachments: [],
    kanbanStatus: "todo",
  },
  {
    id: "e2",
    title: "Team Presentation",
    description: "Present project progress and findings to the cohort at the lab-wide presentation day.",
    date: new Date(2026, 2, 26),
    time: "14:00",
    assignedTo: "Morgan Lee",
    ticketType: "event",
    tag: "flag",
    attachments: [
      { id: "a1", name: "Presentation Deck", type: "link", url: "https://docs.google.com/presentation" },
      { id: "a2", name: "Demo Video", type: "file" },
    ],
    kanbanStatus: "todo",
  },
  {
    id: "e3",
    title: "Brains & Bites Celebration",
    description: "Lab-wide celebration after team presentations. Connect with fellow lab members and mentors.",
    date: new Date(2026, 2, 26),
    time: "16:00",
    assignedTo: "Morgan Lee",
    ticketType: "event",
    tag: "flag",
    attachments: [],
    kanbanStatus: "todo",
  },
  // Tasks
  {
    id: "1",
    title: "Research Literature Review",
    description: "Complete literature review on adaptive learning algorithms and compile findings for the team.",
    date: new Date(2026, 2, 17),
    time: "10:00",
    assignedTo: "Alex Chen",
    ticketType: "task",
    tag: "in-progress",
    attachments: [
      { id: "a3", name: "Research Notes", type: "file" },
    ],
    kanbanStatus: "in-progress",
  },
  {
    id: "2",
    title: "Interview Analysis Report",
    description: "Analyze user interview transcripts and identify key patterns for personalization features.",
    date: new Date(2026, 2, 20),
    time: "14:00",
    assignedTo: "Alex Chen",
    ticketType: "task",
    tag: "flag",
    attachments: [],
    kanbanStatus: "todo",
  },
  {
    id: "3",
    title: "Wireframe Student Dashboard",
    description: "Design wireframes for the student-facing dashboard showing learning progress and recommendations.",
    date: new Date(2026, 2, 18),
    time: "09:00",
    assignedTo: "Jordan Kim",
    ticketType: "task",
    tag: "in-progress",
    attachments: [
      { id: "a4", name: "Figma Design", type: "link", url: "https://figma.com/file/..." },
    ],
    kanbanStatus: "in-progress",
  },
  {
    id: "4",
    title: "User Flow Documentation",
    description: "Document complete user flows for onboarding and first-time experience.",
    date: new Date(2026, 2, 22),
    time: "11:00",
    assignedTo: "Jordan Kim",
    ticketType: "task",
    tag: "completed",
    attachments: [],
    kanbanStatus: "completed",
  },
  {
    id: "5",
    title: "API Endpoint Development",
    description: "Build REST API endpoints for student progress tracking and content recommendations.",
    date: new Date(2026, 2, 19),
    time: "09:00",
    assignedTo: "Sam Rivera",
    ticketType: "task",
    tag: "bug",
    attachments: [],
    kanbanStatus: "issue",
  },
  {
    id: "6",
    title: "Database Schema Update",
    description: "Update database schema to support new learning analytics features.",
    date: new Date(2026, 2, 23),
    time: "10:00",
    assignedTo: "Sam Rivera",
    ticketType: "task",
    tag: "in-progress",
    attachments: [],
    kanbanStatus: "review",
  },
  {
    id: "7",
    title: "Learning Analytics Dashboard",
    description: "Create data visualizations showing student engagement patterns and learning outcomes.",
    date: new Date(2026, 2, 18),
    time: "14:00",
    assignedTo: "Taylor Wu",
    ticketType: "task",
    tag: "in-progress",
    attachments: [],
    kanbanStatus: "in-progress",
  },
  {
    id: "8",
    title: "A/B Test Analysis",
    description: "Analyze results from the recommendation algorithm A/B test and prepare findings report.",
    date: new Date(2026, 2, 24),
    time: "15:00",
    assignedTo: "Taylor Wu",
    ticketType: "task",
    tag: "flag",
    attachments: [],
    kanbanStatus: "todo",
  },
  {
    id: "9",
    title: "Sprint Planning",
    description: "Lead sprint planning session and prioritize backlog items for the next two weeks.",
    date: new Date(2026, 2, 17),
    time: "09:00",
    assignedTo: "Morgan Lee",
    ticketType: "task",
    tag: "completed",
    attachments: [],
    kanbanStatus: "completed",
  },
  {
    id: "10",
    title: "Stakeholder Presentation Prep",
    description: "Prepare presentation deck for the Mar 26 team presentation showcasing project progress.",
    date: new Date(2026, 2, 25),
    time: "10:00",
    assignedTo: "Morgan Lee",
    ticketType: "task",
    tag: "flag",
    attachments: [],
    kanbanStatus: "todo",
  },
]

// Export tickets for Task Manager to use
export { initialTickets }

export function CalendarSection() {
  const { isColorful } = useColor()
  const [viewMode, setViewMode] = useState<ViewMode>("weekly")
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 15))
  const [tickets, setTickets] = useState<CalendarTicket[]>(initialTickets)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSectionExpanded, setIsSectionExpanded] = useState(true)
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    assignedTo: "",
    ticketType: "task" as TicketType,
    tag: "in-progress" as TaskTag,
    kanbanStatus: "todo" as KanbanStatus,
    meetingUrl: "",
  })
  const [attachments, setAttachments] = useState<TicketAttachment[]>([])
  const [linkInput, setLinkInput] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const [editingTicketId, setEditingTicketId] = useState<string | null>(null)
  const [editTicket, setEditTicket] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    assignedTo: "",
    ticketType: "task" as TicketType,
    tag: "in-progress" as TaskTag,
    kanbanStatus: "todo" as KanbanStatus,
    meetingUrl: "",
  })
  const [editAttachments, setEditAttachments] = useState<TicketAttachment[]>([])
  const [editLinkInput, setEditLinkInput] = useState("")
  const [showEditLinkInput, setShowEditLinkInput] = useState(false)

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "daily") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "weekly") {
      // Weekly view shows 2 weeks (current + next)
      newDate.setDate(newDate.getDate() + (direction === "next" ? 14 : -14))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getTwoWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    for (let i = 0; i < 14; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getMonthDays = () => {
    const days = []
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    
    for (let i = 0; i < startPadding; i++) {
      const day = new Date(year, month, -startPadding + i + 1)
      days.push({ date: day, isCurrentMonth: false })
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }
    
    return days
  }

  const getTicketsForDate = (date: Date) => {
    return tickets.filter(
      (ticket) =>
        ticket.date.getDate() === date.getDate() &&
        ticket.date.getMonth() === date.getMonth() &&
        ticket.date.getFullYear() === date.getFullYear()
    )
  }

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }
    if (viewMode === "daily") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }
    if (viewMode === "weekly") {
      const start = new Date(currentDate)
      start.setDate(currentDate.getDate() - currentDate.getDay())
      const end = new Date(start)
      end.setDate(start.getDate() + 13)
      const startLabel = start.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      const endLabel = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      return `${startLabel} – ${endLabel}`
    }
    return currentDate.toLocaleDateString("en-US", options)
  }

  const handleAddTicket = () => {
    if (newTicket.title && newTicket.date && newTicket.time && newTicket.assignedTo) {
      const ticket: CalendarTicket = {
        id: Date.now().toString(),
        title: newTicket.title,
        description: newTicket.description,
        date: new Date(newTicket.date),
        time: newTicket.time,
        assignedTo: newTicket.assignedTo,
        ticketType: newTicket.ticketType,
        tag: newTicket.tag,
        attachments: attachments,
        kanbanStatus: newTicket.ticketType === "task" ? newTicket.kanbanStatus : "todo",
        meetingUrl: newTicket.meetingUrl?.trim() ? newTicket.meetingUrl.trim() : undefined,
      }
      setTickets([...tickets, ticket])
      setNewTicket({
        title: "",
        description: "",
        date: "",
        time: "",
        assignedTo: "",
        ticketType: "task",
        tag: "in-progress",
        kanbanStatus: "todo",
        meetingUrl: "",
      })
      setAttachments([])
      setLinkInput("")
      setShowLinkInput(false)
      setIsDialogOpen(false)
    }
  }

  const handleFileUpload = (type: "file" | "image") => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = type === "image" ? "image/*" : "*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const attachment: TicketAttachment = {
          id: Date.now().toString(),
          name: file.name,
          type: type,
        }
        setAttachments([...attachments, attachment])
      }
    }
    input.click()
  }

  const handleAddLink = () => {
    if (linkInput.trim()) {
      const attachment: TicketAttachment = {
        id: Date.now().toString(),
        name: linkInput,
        type: "link",
        url: linkInput,
      }
      setAttachments([...attachments, attachment])
      setLinkInput("")
      setShowLinkInput(false)
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id))
  }

  const openEditTicket = (ticket: CalendarTicket) => {
    setEditingTicketId(ticket.id)
    setEditTicket({
      title: ticket.title,
      description: ticket.description,
      date: ticket.date.toISOString().slice(0, 10),
      time: ticket.time,
      assignedTo: ticket.assignedTo,
      ticketType: ticket.ticketType,
      tag: ticket.tag,
      kanbanStatus: ticket.kanbanStatus,
      meetingUrl: ticket.meetingUrl ?? "",
    })
    setEditAttachments(ticket.attachments ?? [])
    setEditLinkInput("")
    setShowEditLinkInput(false)
    setIsEditDialogOpen(true)
  }

  const handleEditFileUpload = (type: "file" | "image") => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = type === "image" ? "image/*" : "*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const attachment: TicketAttachment = {
          id: Date.now().toString(),
          name: file.name,
          type: type,
        }
        setEditAttachments([...editAttachments, attachment])
      }
    }
    input.click()
  }

  const handleAddEditLink = () => {
    if (editLinkInput.trim()) {
      const attachment: TicketAttachment = {
        id: Date.now().toString(),
        name: editLinkInput,
        type: "link",
        url: editLinkInput,
      }
      setEditAttachments([...editAttachments, attachment])
      setEditLinkInput("")
      setShowEditLinkInput(false)
    }
  }

  const removeEditAttachment = (id: string) => {
    setEditAttachments(editAttachments.filter((a) => a.id !== id))
  }

  const handleSaveTicketEdits = () => {
    if (!editingTicketId) return
    if (!(editTicket.title && editTicket.date && editTicket.time && editTicket.assignedTo)) return

    setTickets(prev =>
      prev.map(t => {
        if (t.id !== editingTicketId) return t
        const updated: CalendarTicket = {
          ...t,
          title: editTicket.title,
          description: editTicket.description,
          date: new Date(editTicket.date),
          time: editTicket.time,
          assignedTo: editTicket.assignedTo,
          ticketType: editTicket.ticketType,
          tag: editTicket.tag,
          kanbanStatus: editTicket.ticketType === "task" ? editTicket.kanbanStatus : "todo",
          attachments: editAttachments,
          meetingUrl: editTicket.meetingUrl?.trim() ? editTicket.meetingUrl.trim() : undefined,
        }
        return updated
      })
    )

    setIsEditDialogOpen(false)
    setEditingTicketId(null)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const currentTagColors = isColorful ? tagColorsColorful : tagColors

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
          ? "border-violet-300 dark:border-violet-700" 
          : "border-foreground/10"
      } ${
        isExpanded 
          ? "fixed inset-4 z-50 overflow-auto" 
          : ""
      }`}>
        <CardHeader className={`pb-4 border-b-2 transition-colors duration-300 ${
          isColorful 
            ? "border-violet-200 dark:border-violet-800" 
            : "border-foreground/10"
        }`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Calendar className={`h-5 w-5 ${
                isColorful ? "text-violet-600 dark:text-violet-400" : ""
              }`} />
              <CardTitle className={`text-lg font-semibold ${
                isColorful ? "text-violet-700 dark:text-violet-300" : ""
              }`}>
                Schedule / Calendar
              </CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Calendar View Mode */}
              <div className={`flex rounded-md border-2 transition-colors ${
                isColorful ? "border-violet-300" : "border-foreground/20"
              }`}>
                {(["daily", "weekly", "monthly"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-2 sm:px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      viewMode === mode
                        ? isColorful 
                          ? "bg-violet-600 text-white" 
                          : "bg-foreground text-background"
                        : "hover:bg-foreground/5"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className={`gap-1 ${
                    isColorful ? "bg-violet-600 hover:bg-violet-700 text-white" : ""
                  }`}>
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Ticket</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Ticket</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newTicket.title}
                        onChange={(e) =>
                          setNewTicket({ ...newTicket, title: e.target.value })
                        }
                        placeholder="Enter ticket title"
                      />
                    </div>
                    
                    {/* Event or Task Selection */}
                    <div className="grid gap-2">
                      <Label>Event or Task</Label>
                      <div className={`flex rounded-md border-2 transition-colors ${
                        isColorful ? "border-violet-300" : "border-foreground/20"
                      }`}>
                        <button
                          type="button"
                          onClick={() => setNewTicket({ ...newTicket, ticketType: "event" })}
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            newTicket.ticketType === "event"
                              ? isColorful 
                                ? "bg-violet-600 text-white" 
                                : "bg-foreground text-background"
                              : "hover:bg-foreground/5"
                          }`}
                        >
                          Event
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewTicket({ ...newTicket, ticketType: "task" })}
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            newTicket.ticketType === "task"
                              ? isColorful 
                                ? "bg-violet-600 text-white" 
                                : "bg-foreground text-background"
                              : "hover:bg-foreground/5"
                          }`}
                        >
                          Task
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {newTicket.ticketType === "event" 
                          ? "Events appear only on the calendar" 
                          : "Tasks appear on both calendar and task manager"}
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newTicket.description}
                        onChange={(e) =>
                          setNewTicket({ ...newTicket, description: e.target.value })
                        }
                        placeholder="Add description, notes, or details..."
                        className="min-h-24 resize-none"
                      />
                      <div className="flex items-center gap-1 pt-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
                          onClick={() => handleFileUpload("file")}
                        >
                          <Paperclip className="h-4 w-4" />
                          <span className="text-xs">File</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
                          onClick={() => handleFileUpload("image")}
                        >
                          <Image className="h-4 w-4" />
                          <span className="text-xs">Image</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowLinkInput(!showLinkInput)}
                        >
                          <Link2 className="h-4 w-4" />
                          <span className="text-xs">Link</span>
                        </Button>
                      </div>
                      
                      {showLinkInput && (
                        <div className="flex gap-2">
                          <Input
                            value={linkInput}
                            onChange={(e) => setLinkInput(e.target.value)}
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleAddLink}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                      
                      {attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-1.5 rounded-md border border-foreground/10 bg-secondary px-2 py-1 text-xs"
                            >
                              {attachment.type === "file" && <FileText className="h-3 w-3" />}
                              {attachment.type === "image" && <Image className="h-3 w-3" />}
                              {attachment.type === "link" && <Link2 className="h-3 w-3" />}
                              <span className="max-w-32 truncate">{attachment.name}</span>
                              <button
                                type="button"
                                onClick={() => removeAttachment(attachment.id)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Meeting link (optional, mainly for meetings/events) */}
                    <div className="grid gap-2">
                      <Label htmlFor="meetingUrl">Meeting link (optional)</Label>
                      <Input
                        id="meetingUrl"
                        value={newTicket.meetingUrl}
                        onChange={(e) =>
                          setNewTicket({ ...newTicket, meetingUrl: e.target.value })
                        }
                        placeholder="https://zoom.us/j/..."
                      />
                      <p className="text-xs text-muted-foreground">
                        If this ticket is a meeting, add the Zoom/Meet link here.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newTicket.date}
                          onChange={(e) =>
                            setNewTicket({ ...newTicket, date: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={newTicket.time}
                          onChange={(e) =>
                            setNewTicket({ ...newTicket, time: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignedTo">Assign To</Label>
                      <Select
                        value={newTicket.assignedTo}
                        onValueChange={(value) =>
                          setNewTicket({ ...newTicket, assignedTo: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member} value={member}>
                              {member}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Show kanban status only for tasks */}
                    {newTicket.ticketType === "task" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="tag">Status Tag</Label>
                          <Select
                            value={newTicket.tag}
                            onValueChange={(value) =>
                              setNewTicket({ ...newTicket, tag: value as TaskTag })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(tagLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="kanbanStatus">Board Status</Label>
                          <Select
                            value={newTicket.kanbanStatus}
                            onValueChange={(value) =>
                              setNewTicket({ ...newTicket, kanbanStatus: value as KanbanStatus })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="issue">Issue</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="review">Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    <Button onClick={handleAddTicket} className={`mt-2 ${
                      isColorful ? "bg-violet-600 hover:bg-violet-700 text-white" : ""
                    }`}>
                      Add Ticket
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Edit ticket dialog (opens when clicking a calendar ticket) */}
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Edit Ticket</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-title">Title</Label>
                      <Input
                        id="edit-title"
                        value={editTicket.title}
                        onChange={(e) => setEditTicket({ ...editTicket, title: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Event or Task</Label>
                      <div className={`flex rounded-md border-2 transition-colors ${
                        isColorful ? "border-violet-300" : "border-foreground/20"
                      }`}>
                        <button
                          type="button"
                          onClick={() => setEditTicket({ ...editTicket, ticketType: "event" })}
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            editTicket.ticketType === "event"
                              ? isColorful ? "bg-violet-600 text-white" : "bg-foreground text-background"
                              : "hover:bg-foreground/5"
                          }`}
                        >
                          Event
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditTicket({ ...editTicket, ticketType: "task" })}
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            editTicket.ticketType === "task"
                              ? isColorful ? "bg-violet-600 text-white" : "bg-foreground text-background"
                              : "hover:bg-foreground/5"
                          }`}
                        >
                          Task
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editTicket.description}
                        onChange={(e) => setEditTicket({ ...editTicket, description: e.target.value })}
                        className="min-h-24 resize-none"
                      />
                      <div className="flex items-center gap-1 pt-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
                          onClick={() => handleEditFileUpload("file")}
                        >
                          <Paperclip className="h-4 w-4" />
                          <span className="text-xs">File</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
                          onClick={() => handleEditFileUpload("image")}
                        >
                          <Image className="h-4 w-4" />
                          <span className="text-xs">Image</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowEditLinkInput(!showEditLinkInput)}
                        >
                          <Link2 className="h-4 w-4" />
                          <span className="text-xs">Link</span>
                        </Button>
                      </div>

                      {showEditLinkInput && (
                        <div className="flex gap-2">
                          <Input
                            value={editLinkInput}
                            onChange={(e) => setEditLinkInput(e.target.value)}
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <Button type="button" size="sm" onClick={handleAddEditLink}>
                            Add
                          </Button>
                        </div>
                      )}

                      {editAttachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {editAttachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-1.5 rounded-md border border-foreground/10 bg-secondary px-2 py-1 text-xs"
                            >
                              {attachment.type === "file" && <FileText className="h-3 w-3" />}
                              {attachment.type === "image" && <Image className="h-3 w-3" />}
                              {attachment.type === "link" && <Link2 className="h-3 w-3" />}
                              <span className="max-w-32 truncate">{attachment.name}</span>
                              <button
                                type="button"
                                onClick={() => removeEditAttachment(attachment.id)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-meetingUrl">Meeting link (optional)</Label>
                      <Input
                        id="edit-meetingUrl"
                        value={editTicket.meetingUrl}
                        onChange={(e) => setEditTicket({ ...editTicket, meetingUrl: e.target.value })}
                        placeholder="https://zoom.us/j/..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-date">Date</Label>
                        <Input
                          id="edit-date"
                          type="date"
                          value={editTicket.date}
                          onChange={(e) => setEditTicket({ ...editTicket, date: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-time">Time</Label>
                        <Input
                          id="edit-time"
                          type="time"
                          value={editTicket.time}
                          onChange={(e) => setEditTicket({ ...editTicket, time: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit-assignedTo">Assign To</Label>
                      <Select
                        value={editTicket.assignedTo}
                        onValueChange={(value) => setEditTicket({ ...editTicket, assignedTo: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member} value={member}>
                              {member}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {editTicket.ticketType === "task" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-tag">Status Tag</Label>
                          <Select
                            value={editTicket.tag}
                            onValueChange={(value) => setEditTicket({ ...editTicket, tag: value as TaskTag })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(tagLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-kanbanStatus">Board Status</Label>
                          <Select
                            value={editTicket.kanbanStatus}
                            onValueChange={(value) => setEditTicket({ ...editTicket, kanbanStatus: value as KanbanStatus })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="issue">Issue</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="review">Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <Button onClick={handleSaveTicketEdits} className={`mt-2 ${
                      isColorful ? "bg-violet-600 hover:bg-violet-700 text-white" : ""
                    }`}>
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className={isColorful ? "hover:bg-violet-100 dark:hover:bg-violet-900/30" : ""}
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
                className={isColorful ? "hover:bg-violet-100 dark:hover:bg-violet-900/30" : ""}
              >
                {isSectionExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          {isSectionExpanded && (
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateDate("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">{formatDateHeader()}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateDate("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        {isSectionExpanded && (
          <CardContent className="p-4">
            {/* Calendar Views */}
            {viewMode === "daily" && (
              <div className="space-y-2">
                {getTicketsForDate(currentDate).length > 0 ? (
                  getTicketsForDate(currentDate).map((ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() => openEditTicket(ticket)}
                      className={`w-full text-left flex items-center justify-between rounded-lg border-2 p-3 ${
                        isColorful 
                          ? "border-violet-200 dark:border-violet-700" 
                          : "border-foreground/10"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ticket.title}</span>
                          {ticket.ticketType === "event" && (
                            <Badge variant="outline" className="text-xs">Event</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {ticket.time} - {ticket.assignedTo}
                        </span>
                        {ticket.meetingUrl && (
                          <a
                            href={ticket.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-violet-700 dark:text-violet-300 underline underline-offset-2"
                          >
                            Open meeting link
                          </a>
                        )}
                        {ticket.attachments.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {ticket.attachments.map((att) => (
                              <Badge key={att.id} variant="secondary" className="text-xs gap-1">
                                {att.type === "link" ? <Link2 className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                {att.name.length > 15 ? att.name.slice(0, 15) + "..." : att.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Badge className={currentTagColors[ticket.tag]} variant="secondary">
                        {tagLabels[ticket.tag]}
                      </Badge>
                    </button>
                  ))
                ) : (
                  <p className="py-8 text-center text-muted-foreground">
                    No tickets scheduled for this day
                  </p>
                )}
              </div>
            )}

            {viewMode === "weekly" && (
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getTwoWeekDays().slice(0, 7).map((day) => (
                    <div
                      key={day.toISOString()}
                      className={`min-h-24 rounded-lg border-2 p-2 transition-colors ${
                        isToday(day)
                          ? isColorful
                            ? "border-violet-400 bg-violet-50 dark:bg-violet-900/20"
                            : "border-foreground bg-foreground/5"
                          : isColorful
                            ? "border-violet-200 dark:border-violet-800"
                            : "border-foreground/10"
                      }`}
                    >
                      <div
                        className={`mb-1 text-sm font-medium ${
                          isToday(day)
                            ? isColorful
                              ? "text-violet-700 dark:text-violet-300"
                              : "text-foreground"
                            : ""
                        }`}
                      >
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {getTicketsForDate(day)
                          .slice(0, 2)
                          .map((ticket) => (
                            <button
                              key={ticket.id}
                              type="button"
                              onClick={() => openEditTicket(ticket)}
                              className={`w-full text-left rounded px-1.5 py-0.5 text-xs truncate ${currentTagColors[ticket.tag]}`}
                            >
                              {ticket.ticketType === "event" ? "* " : ""}{ticket.title}
                            </button>
                          ))}
                        {getTicketsForDate(day).length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{getTicketsForDate(day).length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getTwoWeekDays().slice(7, 14).map((day) => (
                    <div
                      key={day.toISOString()}
                      className={`min-h-24 rounded-lg border-2 p-2 transition-colors ${
                        isToday(day)
                          ? isColorful
                            ? "border-violet-400 bg-violet-50 dark:bg-violet-900/20"
                            : "border-foreground bg-foreground/5"
                          : isColorful
                            ? "border-violet-200 dark:border-violet-800"
                            : "border-foreground/10"
                      }`}
                    >
                      <div
                        className={`mb-1 text-sm font-medium ${
                          isToday(day)
                            ? isColorful
                              ? "text-violet-700 dark:text-violet-300"
                              : "text-foreground"
                            : ""
                        }`}
                      >
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {getTicketsForDate(day)
                          .slice(0, 2)
                          .map((ticket) => (
                            <button
                              key={ticket.id}
                              type="button"
                              onClick={() => openEditTicket(ticket)}
                              className={`w-full text-left rounded px-1.5 py-0.5 text-xs truncate ${currentTagColors[ticket.tag]}`}
                            >
                              {ticket.ticketType === "event" ? "* " : ""}{ticket.title}
                            </button>
                          ))}
                        {getTicketsForDate(day).length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{getTicketsForDate(day).length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === "monthly" && (
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-xs font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
                {getMonthDays().map((day, idx) => (
                  <div
                    key={idx}
                    className={`min-h-16 rounded-lg border p-1.5 transition-colors ${
                      !day.isCurrentMonth
                        ? "bg-foreground/5 text-muted-foreground"
                        : isToday(day.date)
                          ? isColorful 
                            ? "border-violet-400 bg-violet-50 dark:bg-violet-900/20"
                            : "border-foreground bg-foreground/5"
                          : isColorful 
                            ? "border-violet-200 dark:border-violet-800"
                            : "border-foreground/10"
                    }`}
                  >
                    <div className="text-xs font-medium">{day.date.getDate()}</div>
                    <div className="mt-1 space-y-0.5">
                      {getTicketsForDate(day.date)
                        .slice(0, 1)
                        .map((ticket) => (
                          <div
                            key={ticket.id}
                            className={`rounded px-1 py-0.5 text-[10px] truncate ${currentTagColors[ticket.tag]}`}
                          >
                            {ticket.title}
                          </div>
                        ))}
                      {getTicketsForDate(day.date).length > 1 && (
                        <div className="text-[10px] text-muted-foreground">
                          +{getTicketsForDate(day.date).length - 1}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </>
  )
}

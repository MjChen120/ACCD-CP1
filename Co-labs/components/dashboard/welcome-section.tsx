"use client"

import { useState } from "react"
import { Pencil, Users, ChevronDown, ChevronUp, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useColor } from "./color-context"

// Emoji options for users to choose from
const emojiOptions = ["🔬", "🎨", "💻", "📊", "📋", "🚀", "💡", "⚡", "🎯", "✨", "🌟", "🔥", "💪", "🧠", "📚"]

const mockUser = {
  name: "Alex Chen",
  projectTitle: "Adaptive Learning Environments",
  projectDescription:
    "Exploring how AI can personalize educational experiences in real-time based on student engagement and comprehension patterns.",
  teamMembers: [
    { name: "Alex Chen", role: "Lead Researcher", email: "alex.chen@colabs.edu", emoji: "🔬", isCurrentUser: true },
    { name: "Jordan Kim", role: "UX Designer", email: "jordan.kim@colabs.edu", emoji: "🎨", isCurrentUser: false },
    { name: "Sam Rivera", role: "Developer", email: "sam.rivera@colabs.edu", emoji: "💻", isCurrentUser: false },
    { name: "Taylor Wu", role: "Data Analyst", email: "taylor.wu@colabs.edu", emoji: "📊", isCurrentUser: false },
    { name: "Morgan Lee", role: "Product Manager", email: "morgan.lee@colabs.edu", emoji: "📋", isCurrentUser: false },
  ],
}

export function WelcomeSection() {
  const { isColorful } = useColor()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState(mockUser.projectTitle)
  const [projectDescription, setProjectDescription] = useState(mockUser.projectDescription)
  const [teamMembers, setTeamMembers] = useState(mockUser.teamMembers)

  const handleSave = () => {
    setIsEditOpen(false)
  }

  const handleEmojiChange = (newEmoji: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.isCurrentUser ? { ...member, emoji: newEmoji } : member
    ))
    setIsEmojiPickerOpen(false)
  }

  const currentUserEmoji = teamMembers.find(m => m.isCurrentUser)?.emoji || "🔬"
  const currentUserName = teamMembers.find(m => m.isCurrentUser)?.name || mockUser.name

  return (
    <Card className={`border-2 transition-all duration-300 ${
      isColorful 
        ? "border-cyan-300 dark:border-cyan-700" 
        : "border-foreground/10"
    }`}>
      <CardContent className={`transition-all duration-300 ${isExpanded ? "p-6 sm:p-8" : "p-4 sm:p-6"}`}>
        {/* Header Row - Always Visible */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Welcome back
            </p>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
              isColorful ? "text-cyan-700 dark:text-cyan-300" : ""
            }`}>
              {currentUserName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className={`shrink-0 border-2 ${
                  isColorful 
                    ? "border-[#D6D6D6] text-violet-700 hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-900/30" 
                    : "border-foreground"
                }`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit Project Details</DialogTitle>
                  <DialogDescription>
                    Update your project information visible to your team and mentors.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className={
                    isColorful ? "bg-cyan-600 hover:bg-cyan-700 text-white" : ""
                  }>Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={isColorful ? "hover:bg-cyan-100 dark:hover:bg-cyan-900/30" : ""}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 space-y-6">
            {/* Project Info */}
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Project
              </p>
              <h2 className={`text-xl sm:text-2xl font-semibold ${
                isColorful ? "text-violet-700 dark:text-violet-300" : ""
              }`}>{projectTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mt-2 max-w-3xl text-sm sm:text-base">
                {projectDescription}
              </p>
            </div>

            {/* Team Members (screenshot-1 style) */}
            <div>
              <p className={`text-sm font-medium uppercase tracking-wider flex items-center gap-2 mb-4 ${
                isColorful ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
              }`}>
                <Users className="h-4 w-4" />
                Team Members
              </p>
              <div className="flex flex-wrap gap-3">
                {teamMembers.map((member) => (
                  <Popover key={member.name}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={`relative w-[140px] rounded-lg border-2 bg-transparent px-3 py-2 text-left transition-colors hover:bg-transparent ${
                          isColorful
                            ? "border-foreground/10 hover:border-foreground/20"
                            : "border-foreground/10 hover:border-foreground/20"
                        }`}
                      >
                        <div className="absolute left-2 top-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-background/80 text-base">
                            {member.emoji}
                          </span>
                        </div>

                        <div className="pl-8">
                          <p className="font-semibold text-sm leading-tight">{member.name}</p>
                          <p className="text-[11px] text-muted-foreground leading-none mt-1 truncate">
                            {member.role}
                          </p>
                        </div>
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-72 p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-secondary">
                            {member.emoji}
                          </div>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{member.email}</span>
                        </div>

                        {member.isCurrentUser && (
                          <div className="pt-2 border-t">
                            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full">
                                  Change My Emoji
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-64 p-3">
                                <p className="text-sm font-medium mb-2">Choose your emoji</p>
                                <div className="grid grid-cols-5 gap-2">
                                  {emojiOptions.map((emoji) => (
                                    <button
                                      key={emoji}
                                      type="button"
                                      onClick={() => handleEmojiChange(emoji)}
                                      className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg hover:bg-secondary transition-colors ${
                                        currentUserEmoji === emoji ? "bg-primary/10 ring-2 ring-primary" : ""
                                      }`}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

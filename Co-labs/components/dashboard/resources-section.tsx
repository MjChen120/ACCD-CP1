"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, FileText, Video, Link2, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import { useColor } from "./color-context"

interface Resource {
  id: string
  name: string
  description: string
  type: "syllabus" | "guide" | "video" | "link" | "document"
  url: string
}

const resources: Resource[] = [
  {
    id: "1",
    name: "Course Syllabus",
    description: "Complete course overview, learning objectives, schedule, and grading criteria",
    type: "syllabus",
    url: "#",
  },
  {
    id: "2",
    name: "Project Guidelines",
    description: "Guidelines and requirements for team projects",
    type: "document",
    url: "#",
  },
  {
    id: "3",
    name: "Research Methods Guide",
    description: "Best practices for conducting user research",
    type: "guide",
    url: "#",
  },
  {
    id: "4",
    name: "Presentation Templates",
    description: "Templates for team presentations and progress reports",
    type: "document",
    url: "#",
  },
  {
    id: "5",
    name: "Workshop Recordings",
    description: "Recorded sessions from past workshops and lectures",
    type: "video",
    url: "#",
  },
  {
    id: "6",
    name: "External Resources",
    description: "Curated links to useful external learning materials",
    type: "link",
    url: "#",
  },
]

const typeIcons = {
  syllabus: GraduationCap,
  guide: BookOpen,
  video: Video,
  link: Link2,
  document: FileText,
}

const typeColors = {
  syllabus: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
  guide: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  video: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
  link: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  document: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
}

const typeColorsColorful = {
  syllabus: "bg-rose-400/30 text-rose-800 dark:text-rose-200 border border-rose-400/50",
  guide: "bg-cyan-400/30 text-cyan-800 dark:text-cyan-200 border border-cyan-400/50",
  video: "bg-violet-400/30 text-violet-800 dark:text-violet-200 border border-violet-400/50",
  link: "bg-emerald-400/30 text-emerald-800 dark:text-emerald-200 border border-emerald-400/50",
  document: "bg-amber-400/30 text-amber-800 dark:text-amber-200 border border-amber-400/50",
}

export function ResourcesSection() {
  const { isColorful } = useColor()
  const currentTypeColors = isColorful ? typeColorsColorful : typeColors
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card className={`border-2 transition-colors duration-300 ${
      isColorful 
        ? "border-cyan-300 dark:border-cyan-700" 
        : "border-foreground/10"
    }`}>
      <CardHeader className={`pb-6 border-b-2 transition-colors duration-300 ${
        isColorful 
          ? "border-cyan-200 dark:border-cyan-800" 
          : "border-foreground/10"
      } ${!isExpanded ? "border-b-0" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className={`h-5 w-5 ${
              isColorful ? "text-cyan-600 dark:text-cyan-400" : ""
            }`} />
            <CardTitle className={`text-xl font-bold tracking-tight ${
              isColorful ? "text-cyan-700 dark:text-cyan-300" : ""
            }`}>
              Resources
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className={isColorful ? "hover:bg-cyan-100 dark:hover:bg-cyan-900/30" : ""}
            aria-label={isExpanded ? "Collapse resources" : "Expand resources"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        {isExpanded && (
          <p className="mt-4 text-sm text-muted-foreground">
            Guides, templates, and learning materials to support your project journey
          </p>
        )}
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-2 sm:gap-3">
            {resources.map((resource) => {
              const IconComponent = typeIcons[resource.type]
              return (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 sm:gap-4 rounded-xl border-2 p-3 sm:p-4 transition-all ${
                    isColorful 
                      ? "border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20" 
                      : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg ${currentTypeColors[resource.type]}`}
                  >
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base">{resource.name}</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">
                      {resource.description}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hidden sm:block" />
                </a>
              )
            })}
          </div>
          
          <div className={`mt-4 sm:mt-6 rounded-xl border-2 border-dashed p-4 sm:p-6 text-center transition-colors ${
            isColorful 
              ? "border-cyan-300 dark:border-cyan-700" 
              : "border-foreground/20"
          }`}>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Looking for specific resources?
            </p>
            <Button variant="outline" size="sm" className={`mt-2 sm:mt-3 ${
              isColorful 
                ? "border-cyan-400 text-cyan-700 hover:bg-cyan-50 dark:text-cyan-300 dark:hover:bg-cyan-900/30" 
                : ""
            }`}>
              Request Resources
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

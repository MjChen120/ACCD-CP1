"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Image,
  Film,
  File,
  Download,
  Upload,
  Search,
  MoreVertical,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useColor } from "./color-context"

type Role = "designer" | "engineer" | "researcher" | "analyst" | "manager"

interface Material {
  id: string
  name: string
  type: "document" | "image" | "video" | "other"
  uploadedBy: string
  uploadedAt: string
  size: string
  roles: Role[]
}

const roleLabels: Record<Role, string> = {
  designer: "Designer",
  engineer: "Engineer",
  researcher: "Researcher",
  analyst: "Analyst",
  manager: "Manager",
}

const materials: Material[] = [
  {
    id: "1",
    name: "Literature Review Summary.pdf",
    type: "document",
    uploadedBy: "Alex Chen",
    uploadedAt: "Mar 12, 2026",
    size: "2.4 MB",
    roles: ["researcher"],
  },
  {
    id: "2",
    name: "Dashboard Wireframes.fig",
    type: "image",
    uploadedBy: "Jordan Kim",
    uploadedAt: "Mar 10, 2026",
    size: "8.1 MB",
    roles: ["designer"],
  },
  {
    id: "3",
    name: "API Documentation.docx",
    type: "document",
    uploadedBy: "Sam Rivera",
    uploadedAt: "Mar 8, 2026",
    size: "156 KB",
    roles: ["engineer"],
  },
  {
    id: "4",
    name: "Analytics Dashboard Demo.mp4",
    type: "video",
    uploadedBy: "Taylor Wu",
    uploadedAt: "Mar 6, 2026",
    size: "45.2 MB",
    roles: ["analyst", "designer"],
  },
  {
    id: "5",
    name: "Product Roadmap.pdf",
    type: "document",
    uploadedBy: "Morgan Lee",
    uploadedAt: "Mar 4, 2026",
    size: "1.2 MB",
    roles: ["manager", "researcher"],
  },
  {
    id: "6",
    name: "User Flow Diagrams.zip",
    type: "other",
    uploadedBy: "Jordan Kim",
    uploadedAt: "Mar 2, 2026",
    size: "12.8 MB",
    roles: ["designer", "engineer"],
  },
]

const typeIcons = {
  document: FileText,
  image: Image,
  video: Film,
  other: File,
}

const typeColors = {
  document: "text-blue-600 dark:text-blue-400",
  image: "text-emerald-600 dark:text-emerald-400",
  video: "text-purple-600 dark:text-purple-400",
  other: "text-muted-foreground",
}

const typeColorsColorful = {
  document: "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30",
  image: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
  video: "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30",
  other: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/30",
}

export function MaterialsSection() {
  const { isColorful } = useColor()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "document" | "media" | "code" | "other">("all")
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [isExpanded, setIsExpanded] = useState(true)

  const isCodeMaterial = (material: Material) => {
    const name = material.name.toLowerCase()
    return (
      name.endsWith(".ts") ||
      name.endsWith(".tsx") ||
      name.endsWith(".js") ||
      name.endsWith(".jsx") ||
      name.endsWith(".py") ||
      name.endsWith(".java") ||
      name.endsWith(".go") ||
      name.endsWith(".rs") ||
      name.endsWith(".sql") ||
      name.endsWith(".json") ||
      name.endsWith(".yml") ||
      name.endsWith(".yaml") ||
      name.endsWith(".toml") ||
      name.endsWith(".env") ||
      name.endsWith(".md") ||
      name.endsWith(".ipynb")
    )
  }

  const toggleRole = (role: Role) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    )
  }

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "document" && material.type === "document") ||
      (filter === "media" && (material.type === "image" || material.type === "video")) ||
      (filter === "code" && isCodeMaterial(material)) ||
      (filter === "other" && material.type === "other" && !isCodeMaterial(material))
    const matchesRole = selectedRoles.length === 0 || 
      material.roles.some(role => selectedRoles.includes(role))
    return matchesSearch && matchesFilter && matchesRole
  })

  return (
    <Card className={`border-2 transition-all duration-300 ${
      isColorful 
        ? "border-emerald-300 dark:border-emerald-700" 
        : "border-foreground/10"
    }`}>
      <CardHeader className={`pb-4 border-b-2 transition-colors duration-300 ${
        isColorful 
          ? "border-emerald-200 dark:border-emerald-800" 
          : "border-foreground/10"
      } ${!isExpanded ? "border-b-0" : ""}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className={`h-5 w-5 ${
              isColorful ? "text-emerald-600 dark:text-emerald-400" : ""
            }`} />
            <CardTitle className={`text-lg font-semibold ${
              isColorful ? "text-emerald-700 dark:text-emerald-300" : ""
            }`}>
              Materials & Documentation
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className={`gap-2 ${
              isColorful ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
            }`}>
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={isColorful ? "hover:bg-emerald-100 dark:hover:bg-emerald-900/30" : ""}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 flex flex-col gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Role Filter Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className={`gap-1.5 ${
                    selectedRoles.length > 0 
                      ? isColorful 
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30" 
                        : "border-foreground bg-secondary"
                      : ""
                  }`}>
                    <Filter className="h-3.5 w-3.5" />
                    <span>Roles</span>
                    {selectedRoles.length > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                        {selectedRoles.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3">
                  <p className="text-sm font-medium mb-3">Filter by Role</p>
                  <div className="space-y-2">
                    {(Object.keys(roleLabels) as Role[]).map((role) => (
                      <label
                        key={role}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors"
                      >
                        <Checkbox
                          checked={selectedRoles.includes(role)}
                          onCheckedChange={() => toggleRole(role)}
                        />
                        {roleLabels[role]}
                      </label>
                    ))}
                  </div>
                  {selectedRoles.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 text-xs"
                      onClick={() => setSelectedRoles([])}
                    >
                      Clear All
                    </Button>
                  )}
                </PopoverContent>
              </Popover>

              {/* Type Filter (moved under search, full words) */}
              <div className={`flex flex-wrap gap-1 rounded-md border-2 p-1 transition-colors ${
                isColorful ? "border-emerald-300" : "border-foreground/20"
              }`}>
                {([
                  { value: "all" as const, label: "All" },
                  { value: "document" as const, label: "Document" },
                  { value: "media" as const, label: "Media" },
                  { value: "code" as const, label: "Code" },
                  { value: "other" as const, label: "Other" },
                ]).map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors rounded ${
                      filter === value
                        ? isColorful 
                          ? "bg-emerald-600 text-white" 
                          : "bg-foreground text-background"
                        : "hover:bg-foreground/5"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-0">
          <div className={`divide-y ${
            isColorful ? "divide-emerald-200 dark:divide-emerald-800" : "divide-foreground/10"
          }`}>
            {filteredMaterials.map((material) => {
              const Icon = typeIcons[material.type]
              return (
                <div
                  key={material.id}
                  className={`flex items-center gap-2 p-3 sm:p-4 transition-colors ${
                    isColorful 
                      ? "hover:bg-emerald-50 dark:hover:bg-emerald-900/20" 
                      : "hover:bg-foreground/5"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div
                      className={`rounded-lg p-2 sm:p-2.5 shrink-0 ${
                        isColorful 
                          ? typeColorsColorful[material.type] 
                          : `bg-foreground/5 ${typeColors[material.type]}`
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{material.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {material.uploadedBy} · {material.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                    <Badge variant="secondary" className={`hidden sm:inline-flex text-xs ${
                      isColorful ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" : ""
                    }`}>
                      {material.size}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
          {filteredMaterials.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No files found
            </p>
          )}
        </CardContent>
      )}
    </Card>
  )
}

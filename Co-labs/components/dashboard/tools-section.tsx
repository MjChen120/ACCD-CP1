"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExternalLink, Wrench, Pencil, Plus, X, ChevronDown, ChevronUp } from "lucide-react"
import { useColor } from "./color-context"

interface Tool {
  id: string
  name: string
  customName: string // Personalized name like "Zoom - Group Meeting"
  description: string
  icon: string
  url: string
  category: "communication" | "productivity" | "design" | "development"
}

const initialTools: Tool[] = [
  {
    id: "1",
    name: "Zoom",
    customName: "Zoom - Group Meeting",
    description: "Weekly team sync and presentations",
    icon: "Z",
    url: "#",
    category: "communication",
  },
  {
    id: "2",
    name: "Slack",
    customName: "Slack - Group Channel",
    description: "#adaptive-learning team channel",
    icon: "S",
    url: "#",
    category: "communication",
  },
  {
    id: "3",
    name: "GitHub",
    customName: "GitHub - Dev Channel",
    description: "Project repository and issues",
    icon: "G",
    url: "#",
    category: "development",
  },
  {
    id: "4",
    name: "Notion",
    customName: "Notion - Team Wiki",
    description: "Project documentation and notes",
    icon: "N",
    url: "#",
    category: "productivity",
  },
  {
    id: "5",
    name: "Figma",
    customName: "Figma - Design Files",
    description: "UI/UX design and prototypes",
    icon: "F",
    url: "#",
    category: "design",
  },
  {
    id: "6",
    name: "Google Drive",
    customName: "Drive - Shared Folder",
    description: "Team files and documents",
    icon: "D",
    url: "#",
    category: "productivity",
  },
]

const categoryColors = {
  communication: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  productivity: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  design: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
  development: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
}

const categoryColorsColorful = {
  communication: "bg-cyan-400/30 text-cyan-800 dark:text-cyan-200 border border-cyan-400/50",
  productivity: "bg-emerald-400/30 text-emerald-800 dark:text-emerald-200 border border-emerald-400/50",
  design: "bg-violet-400/30 text-violet-800 dark:text-violet-200 border border-violet-400/50",
  development: "bg-amber-400/30 text-amber-800 dark:text-amber-200 border border-amber-400/50",
}

const categoryLabels = {
  communication: "Communication",
  productivity: "Productivity",
  design: "Design",
  development: "Development",
}

export function ToolsSection() {
  const { isColorful } = useColor()
  const currentCategoryColors = isColorful ? categoryColorsColorful : categoryColors
  
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [newTool, setNewTool] = useState({
    name: "",
    customName: "",
    description: "",
    icon: "",
    url: "",
    category: "productivity" as Tool["category"],
  })

  const handleAddTool = () => {
    if (newTool.name && newTool.description) {
      const tool: Tool = {
        id: Date.now().toString(),
        name: newTool.name,
        customName: newTool.customName || newTool.name,
        description: newTool.description,
        icon: newTool.icon || newTool.name.charAt(0).toUpperCase(),
        url: newTool.url || "#",
        category: newTool.category,
      }
      setTools([...tools, tool])
      setNewTool({
        name: "",
        customName: "",
        description: "",
        icon: "",
        url: "",
        category: "productivity",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditTool = () => {
    if (editingTool) {
      setTools(tools.map(t => t.id === editingTool.id ? editingTool : t))
      setEditingTool(null)
    }
  }

  const handleRemoveTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id))
  }

  return (
    <Card className={`border-2 transition-all duration-300 flex flex-col ${isExpanded ? "self-stretch" : "self-start"} ${
      isColorful 
        ? "border-violet-300 dark:border-violet-700" 
        : "border-foreground/10"
    }`}>
      <CardHeader className={`pb-4 border-b-2 transition-colors duration-300 ${
        isColorful 
          ? "border-violet-200 dark:border-violet-800" 
          : "border-foreground/10"
      } ${!isExpanded ? "border-b-0" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wrench className={`h-5 w-5 ${
              isColorful ? "text-violet-600 dark:text-violet-400" : ""
            }`} />
            <CardTitle className={`text-lg font-semibold ${
              isColorful ? "text-violet-700 dark:text-violet-300" : ""
            }`}>
              Tools
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`gap-1.5 ${
                isColorful && isEditMode
                  ? "bg-violet-600 hover:bg-violet-700"
                  : isColorful
                    ? "border-violet-400 text-violet-700 hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-900/30"
                    : ""
              }`}
            >
              <Pencil className="h-3.5 w-3.5" />
              {isEditMode ? "Done" : "Edit"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={isColorful ? "hover:bg-violet-100 dark:hover:bg-violet-900/30" : ""}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 flex-1">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className={`group relative flex items-start gap-3 rounded-lg border-2 p-3 transition-all ${
                  isColorful 
                    ? "border-violet-200 dark:border-violet-800 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" 
                    : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5"
                }`}
              >
                {isEditMode && (
                  <button
                    onClick={() => handleRemoveTool(tool.id)}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${currentCategoryColors[tool.category]}`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm leading-tight">{tool.customName}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                    {isEditMode ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button 
                            onClick={() => setEditingTool(tool)}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Tool</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Tool Name</Label>
                              <Input
                                id="edit-name"
                                value={editingTool?.name || ""}
                                onChange={(e) =>
                                  setEditingTool(editingTool ? {...editingTool, name: e.target.value} : null)
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-customName">Custom Name</Label>
                              <Input
                                id="edit-customName"
                                value={editingTool?.customName || ""}
                                placeholder="e.g., Zoom - Group Meeting"
                                onChange={(e) =>
                                  setEditingTool(editingTool ? {...editingTool, customName: e.target.value} : null)
                                }
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingTool?.description || ""}
                                onChange={(e) =>
                                  setEditingTool(editingTool ? {...editingTool, description: e.target.value} : null)
                                }
                                className="resize-none"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-icon">Icon Letter</Label>
                                <Input
                                  id="edit-icon"
                                  value={editingTool?.icon || ""}
                                  maxLength={2}
                                  onChange={(e) =>
                                    setEditingTool(editingTool ? {...editingTool, icon: e.target.value.toUpperCase()} : null)
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Select
                                  value={editingTool?.category || "productivity"}
                                  onValueChange={(value) =>
                                    setEditingTool(editingTool ? {...editingTool, category: value as Tool["category"]} : null)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(categoryLabels).map(([value, label]) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-url">URL</Label>
                              <Input
                                id="edit-url"
                                value={editingTool?.url || ""}
                                placeholder="https://..."
                                onChange={(e) =>
                                  setEditingTool(editingTool ? {...editingTool, url: e.target.value} : null)
                                }
                              />
                            </div>
                            <Button onClick={handleEditTool} className="mt-2">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isEditMode && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className={`flex items-center justify-center gap-2 rounded-lg border-2 border-dashed p-3 transition-all min-h-[68px] ${
                      isColorful 
                        ? "border-violet-300 dark:border-violet-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" 
                        : "border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"
                    }`}
                  >
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Add Tool</span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Tool</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Tool Name</Label>
                      <Input
                        id="name"
                        value={newTool.name}
                        onChange={(e) =>
                          setNewTool({ ...newTool, name: e.target.value })
                        }
                        placeholder="Zoom, Slack, etc."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="customName">Custom Name</Label>
                      <Input
                        id="customName"
                        value={newTool.customName}
                        onChange={(e) =>
                          setNewTool({ ...newTool, customName: e.target.value })
                        }
                        placeholder="e.g., Zoom - Group Meeting"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newTool.description}
                        onChange={(e) =>
                          setNewTool({ ...newTool, description: e.target.value })
                        }
                        placeholder="What is this tool used for?"
                        className="resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="icon">Icon Letter</Label>
                        <Input
                          id="icon"
                          value={newTool.icon}
                          maxLength={2}
                          onChange={(e) =>
                            setNewTool({ ...newTool, icon: e.target.value.toUpperCase() })
                          }
                          placeholder="Z"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newTool.category}
                          onValueChange={(value) =>
                            setNewTool({ ...newTool, category: value as Tool["category"] })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(categoryLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        value={newTool.url}
                        onChange={(e) =>
                          setNewTool({ ...newTool, url: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <Button onClick={handleAddTool} className="mt-2">
                      Add Tool
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

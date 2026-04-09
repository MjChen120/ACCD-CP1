"use client"

import { useState } from "react"
import { Heart, X, ExternalLink, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ExtensionPopupProps {
  isOpen: boolean
  onClose: () => void
  showFiltered: boolean
  onToggleShowFiltered: () => void
  onOpenSettings: () => void
  onAddLink: () => void
  filteredCount: number
  canAddLinks: boolean
}

const quickSettings = [
  { id: "general-conflict", label: "General Conflict", checked: true },
  { id: "political-division", label: "Political division", checked: false },
  { id: "moral-outrage", label: "Moral outrage", checked: false },
  { id: "fear-mongering", label: "Fear-mongering", checked: false },
]

export function ExtensionPopup({
  isOpen,
  onClose,
  showFiltered,
  onToggleShowFiltered,
  onOpenSettings,
  onAddLink,
  filteredCount,
  canAddLinks,
}: ExtensionPopupProps) {
  const [settings, setSettings] = useState(quickSettings)
  const [generalProtection, setGeneralProtection] = useState(true)

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s)
    )
  }

  if (!isOpen) return null

  return (
    <TooltipProvider delayDuration={150}>
      <div className="fixed top-16 right-4 z-50 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span className="font-semibold text-foreground">EmoSafe</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-amber-500 border-amber-500 text-xs">
              Pro
            </Badge>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-lg text-foreground">We&apos;ve got your back <Heart className="inline h-4 w-4 text-primary" /></p>
      </div>

      {/* Filtered Count */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-accent-text">{filteredCount}</span>
            <div className="text-sm text-muted-foreground">
              <p>contents filtered</p>
              <p>on this page</p>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onAddLink}
                aria-disabled={!canAddLinks}
                className={cn(
                  "px-3 py-1.5 border rounded-full text-sm transition-colors",
                  canAddLinks
                    ? "border-accent-text text-accent-text hover:bg-primary/10"
                    : "border-muted-foreground/40 text-muted-foreground bg-muted/40 cursor-not-allowed"
                )}
              >
                Add Link
              </button>
            </TooltipTrigger>
            {!canAddLinks && (
              <TooltipContent side="top" className="max-w-[220px] text-xs leading-relaxed">
                Free plan limit reached (5 links). Upgrade to Pro for unlimited filtering power.
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>

      {/* Show Filtered Toggle */}
      <div className="px-4 py-3 border-b border-border">
        <button 
          onClick={onToggleShowFiltered}
          className={cn(
            "text-sm font-medium transition-colors",
            showFiltered ? "text-accent-text" : "text-muted-foreground"
          )}
        >
          {showFiltered ? "Hide Filtered" : "Show Filtered"}
        </button>
      </div>

      {/* General Protection Mode */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">General Protection Mode</span>
          <Switch
            checked={generalProtection}
            onCheckedChange={setGeneralProtection}
          />
        </div>
      </div>

      {/* Quick Settings */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Quick Settings</span>
          <button 
            onClick={onOpenSettings}
            className="text-sm text-accent-text hover:underline flex items-center gap-1"
          >
            All Settings <ExternalLink className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-2">
          {settings.map((setting) => (
            <label
              key={setting.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={setting.checked}
                onCheckedChange={() => toggleSetting(setting.id)}
                className={cn(
                  setting.checked && "border-primary bg-primary text-primary-foreground"
                )}
              />
              <span className={cn(
                "text-sm",
                setting.checked ? "text-foreground" : "text-muted-foreground"
              )}>
                {setting.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Specific Filter Word List */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Specific Filter Word List</span>
          <button className="text-sm text-accent-text hover:underline">Edit</button>
        </div>
      </div>

      {/* Language */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-foreground block">Language</span>
            <span className="text-xs text-muted-foreground">English</span>
          </div>
          <button
            disabled
            className="text-sm text-muted-foreground cursor-not-allowed hover:underline opacity-60"
          >
            Edit
          </button>
        </div>
      </div>
      </div>
    </TooltipProvider>
  )
}

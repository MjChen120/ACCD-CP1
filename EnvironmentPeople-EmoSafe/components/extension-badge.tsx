"use client"

import { Shield, ShieldCheck, X, MousePointer2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExtensionBadgeProps {
  isActive: boolean
  onClick: () => void
  filteredCount: number
  selectionMode?: boolean
  onExitSelectionMode?: () => void
}

export function ExtensionBadge({ isActive, onClick, filteredCount, selectionMode, onExitSelectionMode }: ExtensionBadgeProps) {
  if (selectionMode) {
    return (
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground shadow-lg animate-in slide-in-from-top-2 fade-in duration-200">
        <div className="flex items-center gap-2">
          <MousePointer2 className="h-4 w-4" />
          <div>
            <p className="text-sm font-medium">EmoSafe Protected</p>
            <p className="text-xs opacity-80">Select content to add to filter list</p>
          </div>
        </div>
        <button
          onClick={onExitSelectionMode}
          className="ml-2 p-1.5 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-md transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed top-3 right-3 z-40 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 shadow-lg",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-border text-foreground hover:border-primary/50"
      )}
    >
      {isActive ? (
        <ShieldCheck className="h-4 w-4" />
      ) : (
        <Shield className="h-4 w-4" />
      )}
      <span className="text-sm font-medium">I&apos;m Safe Protected</span>
      {filteredCount > 0 && (
        <span className={cn(
          "px-1.5 py-0.5 rounded-full text-xs font-bold",
          isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/20 text-primary"
        )}>
          {filteredCount}
        </span>
      )}
    </button>
  )
}

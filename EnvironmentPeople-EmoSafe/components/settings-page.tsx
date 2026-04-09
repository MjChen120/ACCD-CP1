"use client"

import { useEffect, useState } from "react"
import { Heart, Shield, Filter, Eye, X, TrendingUp, Clock, Lock } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SettingsPageProps {
  isOpen: boolean
  onClose: () => void
  isPro?: boolean
}

const protectionTriggers = [
  { id: "general-conflict", label: "General Conflict", checked: true },
  { id: "political-division", label: "Political division", checked: false },
  { id: "moral-outrage", label: "Moral outrage", checked: false },
  { id: "fear-mongering", label: "Fear-mongering", checked: false },
  { id: "us-vs-them", label: "U.S. vs. them Framing", checked: false },
  { id: "dehumanization", label: "Dehumanization", checked: false },
  { id: "absolutist-language", label: "Absolutist Language", checked: false },
  { id: "forced-agency", label: "Forced Agency", checked: false },
]

export function SettingsPage({ isOpen, onClose, isPro = false }: SettingsPageProps) {
  const [triggers, setTriggers] = useState(protectionTriggers)
  const [autoHide, setAutoHide] = useState(true)
  const [showWarnings, setShowWarnings] = useState(true)
  const [keywords, setKeywords] = useState(["women", "incel", "chad"])
  const [newKeyword, setNewKeyword] = useState("")
  const freeKeywordLimit = 5
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"])

  useEffect(() => {
    if (!isPro) setSelectedLanguages(["en"])
  }, [isPro])

  const toggleTrigger = (id: string) => {
    setTriggers(prev =>
      prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t)
    )
  }

  const isProTrigger = (id: string) => {
    const freeTriggerIds = ["general-conflict", "political-division", "moral-outrage", "fear-mongering"]
    return !freeTriggerIds.includes(id)
  }

  const addKeyword = () => {
    if (keywords.length >= freeKeywordLimit) return
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim().toLowerCase())) {
      setKeywords([...keywords, newKeyword.trim().toLowerCase()])
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword))
  }

  const languages = [
    { id: "en", label: "English", proOnly: false },
    { id: "es", label: "Spanish", proOnly: true },
    { id: "fr", label: "French", proOnly: true },
    { id: "de", label: "German", proOnly: true },
    { id: "ja", label: "Japanese", proOnly: true },
    { id: "ko", label: "Korean", proOnly: true },
    { id: "ar", label: "Arabic", proOnly: true },
    { id: "ru", label: "Russian", proOnly: true },
    { id: "hi", label: "Hindi", proOnly: true },
    { id: "zh-Hans", label: "Simplified Chinese", proOnly: true },
    { id: "zh-Hant", label: "Traditional Chinese", proOnly: true },
  ] as const

  const toggleLanguage = (id: string) => {
    const lang = languages.find((l) => l.id === id)
    if (!lang) return

    // Free plan: only English can be selected.
    if (!isPro && id !== "en") return

    setSelectedLanguages((prev) => {
      const has = prev.includes(id)
      const next = has ? prev.filter((x) => x !== id) : [...prev, id]
      if (next.length === 0) return ["en"]
      if (!isPro) return ["en"]
      return next
    })
  }

  const selectedLanguageLabels = selectedLanguages
    .map((id) => languages.find((l) => l.id === id)?.label)
    .filter(Boolean) as string[]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-card border-l border-border shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">EmoSafe</h1>
                <p className="text-sm text-muted-foreground">Your emotional protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-amber-500 border-amber-500">
                Pro
              </Badge>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Protection Stats */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Protection Stats</CardTitle>
              </div>
              <CardDescription>12 rage bait posts filtered from your feed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <Heart className="h-3 w-3 text-primary" />
                    Feed Wellbeing
                  </div>
                  <p className="text-2xl font-bold text-foreground">70%</p>
                  <p className="text-xs text-emerald-500">+10% this week</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <TrendingUp className="h-3 w-3 text-amber-500" />
                    Filtered Today
                  </div>
                  <p className="text-2xl font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">for last 1 hour</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                    <Clock className="h-3 w-3 text-primary" />
                    Time Saved
                  </div>
                  <p className="text-2xl font-bold text-foreground">2h</p>
                  <p className="text-xs text-muted-foreground">this week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Filtering */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Content Filtering</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Auto-hide rage bait</p>
                  <p className="text-sm text-muted-foreground">Automatically hide detected content</p>
                </div>
                <Switch checked={autoHide} onCheckedChange={setAutoHide} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Show warning headers</p>
                  <p className="text-sm text-muted-foreground">Display risk level and confidence</p>
                </div>
                <Switch checked={showWarnings} onCheckedChange={setShowWarnings} />
              </div>
            </CardContent>
          </Card>

          {/* Protection Settings */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Protection Settings</CardTitle>
              </div>
              <CardDescription>What triggers EmoSafe looks for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {triggers.map((trigger) => (
                  <div
                    key={trigger.id}
                    className={cn(
                      "rounded-md",
                      isProTrigger(trigger.id) && "opacity-60"
                    )}
                  >
                    <label
                      className={cn(
                        "flex items-center gap-2",
                        isProTrigger(trigger.id) ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                    <Checkbox
                      checked={trigger.checked}
                      disabled={isProTrigger(trigger.id)}
                      onCheckedChange={() => {
                        if (isProTrigger(trigger.id)) return
                        toggleTrigger(trigger.id)
                      }}
                      className={cn(
                        trigger.checked && "border-primary bg-primary text-primary-foreground"
                      )}
                    />
                    <span className={cn(
                      "text-sm",
                      trigger.checked ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {trigger.label}
                    </span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-accent-text mt-0.5" />
                  <p className="text-xs leading-relaxed text-accent-text">
                    Pro only: advanced protection triggers are disabled on the free plan. Upgrade to EmoSafe Pro to unlock more filtering rules and stronger protection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Filtering */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded flex items-center justify-center text-xs font-bold">K</div>
                <CardTitle className="text-lg">Keyword Filtering</CardTitle>
              </div>
              <CardDescription>Filters certain keywords automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">
                    Keyword capacity
                  </p>
                  <span className="text-sm font-bold text-accent-text">
                    {keywords.length}/{freeKeywordLimit} keywords
                  </span>
                </div>
                <p className="mt-1 text-xs text-accent-text">
                  Free plan supports up to {freeKeywordLimit} keywords. Upgrade to Pro for expanded keyword capacity and stronger filtering power.
                </p>
              </div>
              <div className="flex gap-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Keyword"
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button 
                  onClick={addKeyword}
                  variant="outline"
                  disabled={keywords.length >= freeKeywordLimit}
                  className="text-accent-text border-accent-text hover:bg-primary/10 disabled:text-muted-foreground disabled:border-muted-foreground/40 disabled:hover:bg-transparent"
                >
                  Add
                </Button>
              </div>
              {keywords.length >= freeKeywordLimit && (
                <p className="text-xs text-accent-text">
                  You&apos;ve reached your free keyword limit. Upgrade to Pro to add more keywords.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="pl-3 pr-1 py-1 flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 p-0.5 hover:bg-destructive/20 rounded-full transition-colors"
                    >
                      <X className="h-3 w-3 text-accent-text" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Language</CardTitle>
              </div>
              <CardDescription>Choose the language for better protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-left transition-colors hover:bg-secondary/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {selectedLanguageLabels.length ? selectedLanguageLabels.join(", ") : "English"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {isPro ? "Pro: select multiple languages" : "Free plan: English only"}
                        </p>
                      </div>
                      <span className="text-muted-foreground select-none">▾</span>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[340px] p-3">
                  <div className="space-y-2">
                    {languages.map((lang) => {
                      const disabled = !isPro && lang.proOnly
                      const checked = selectedLanguages.includes(lang.id)

                      return (
                        <label
                          key={lang.id}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-md px-2 py-1.5",
                            disabled && "opacity-60 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={checked}
                              disabled={disabled}
                              onCheckedChange={() => toggleLanguage(lang.id)}
                            />
                            <span className="text-sm">{lang.label}</span>
                          </div>

                          {!isPro && lang.proOnly && (
                            <span className="text-[11px] font-bold text-accent-text bg-primary/10 rounded-full px-2 py-0.5">
                              Pro
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    {!isPro ? (
                      <div className="flex items-start gap-2">
                        <Lock className="h-4 w-4 text-accent-text mt-0.5" />
                        <p className="text-xs leading-relaxed text-accent-text">
                          You should subscribe to EmoSafe Pro to unlock multi-language protection and stronger language-aware filtering power. Non-English options are disabled on the free plan.
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your selected languages improve filtering accuracy across multiple writing systems.
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

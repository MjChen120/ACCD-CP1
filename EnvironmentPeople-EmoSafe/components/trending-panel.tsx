"use client"

import { Search, MoreHorizontal, AlertTriangle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TrendingItem {
  id: string
  category: string
  title: string
  posts: string
  isRageBait?: boolean
  rageBaitReason?: string
}

const trendingItems: TrendingItem[] = [
  {
    id: "1",
    category: "Business · Trending",
    title: "Today's News",
    posts: "45.2K posts",
    isRageBait: true,
    rageBaitReason: "Many posts in this trend contain misleading information designed to provoke outrage.",
  },
  {
    id: "2",
    category: "Technology",
    title: "Some news about AI",
    posts: "12.1K posts",
    isRageBait: false,
  },
  {
    id: "3",
    category: "Entertainment",
    title: "Movie Reviews",
    posts: "8.4K posts",
    isRageBait: false,
  },
  {
    id: "4",
    category: "Politics · Trending",
    title: "Controversial Topic",
    posts: "120K posts",
    isRageBait: true,
    rageBaitReason: "This trending topic has high engagement bait content. Many posts use inflammatory language.",
  },
]

export function TrendingPanel() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="sticky top-0">
        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-secondary rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Subscribe Card */}
        <div className="mx-3 mb-3 p-4 bg-card border border-border rounded-xl">
          <h3 className="font-bold text-foreground mb-1">Subscribe to Premium</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Get rid of ads, unlock your replies and much more!
          </p>
          <button className="bg-[#1D9BF0] hover:bg-[#1D9BF0]/90 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors">
            Subscribe
          </button>
        </div>

        {/* Trending */}
        <div className="mx-3 bg-card border border-border rounded-xl overflow-hidden">
          <h3 className="font-bold text-foreground p-4 pb-2">What&apos;s happening</h3>
          
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer relative",
                item.isRageBait && "bg-primary/5"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    {item.isRageBait && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="inline-flex items-center justify-center p-1 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors">
                            <AlertTriangle className="h-3 w-3 text-accent-text" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="left" 
                          className="max-w-xs bg-card border border-primary/30 p-3"
                        >
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-accent-text shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm mb-1">
                                High Rage Bait Content
                              </p>
                              <p className="text-muted-foreground text-xs leading-relaxed">
                                {item.rageBaitReason}
                              </p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.posts}</p>
                </div>
                <button className="p-1 hover:bg-primary/10 rounded-full transition-colors">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}

          <button className="w-full px-4 py-3 text-left text-accent-text hover:bg-secondary/50 transition-colors text-sm">
            Show more
          </button>
        </div>
      </div>
    </TooltipProvider>
  )
}

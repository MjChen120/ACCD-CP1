"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Repeat2, Share, AlertTriangle, Eye, EyeOff, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/posts"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface SocialFeedProps {
  posts: Post[]
  hiddenPosts: string[]
  onToggleHidden: (postId: string) => void
  showFiltered: boolean
  selectionMode?: boolean
  onAddToFilter?: (postId: string) => void
  canAddMoreFilters?: boolean
  onLimitReached?: () => void
}

export function SocialFeed({
  posts,
  hiddenPosts,
  onToggleHidden,
  showFiltered,
  selectionMode,
  onAddToFilter,
  canAddMoreFilters = true,
  onLimitReached,
}: SocialFeedProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  const visiblePosts = posts.filter(post => {
    const isHidden = hiddenPosts.includes(post.id)
    // If showFiltered is on, show all posts including hidden ones
    if (showFiltered) return true
    // Otherwise, hide any post that's in the hiddenPosts array
    return !isHidden
  })

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col">
        {visiblePosts.map((post) => {
          const isHidden = hiddenPosts.includes(post.id)
          // Highlight only the posts that are actually filtered (hidden) when "showFiltered" is enabled.
          const showWarning = post.isRageBait && isHidden && showFiltered
          const isHoveredInSelectionMode = selectionMode && hoveredPost === post.id && !isHidden
          
          return (
            <div
              key={post.id}
              className={cn(
                "border-b border-border px-4 py-3 transition-all duration-200 relative",
                showWarning && "bg-primary/5 border-l-2 border-l-primary",
                selectionMode && !isHidden && "cursor-pointer",
                isHoveredInSelectionMode && "bg-primary/10 ring-2 ring-primary ring-inset"
              )}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Selection mode X button */}
              {isHoveredInSelectionMode && (
                <button
                  onClick={() => {
                    if (!canAddMoreFilters) {
                      onLimitReached?.()
                      return
                    }
                    onAddToFilter?.(post.id)
                  }}
                  className="absolute top-3 right-3 z-10 p-1.5 bg-primary hover:bg-primary/80 text-primary-foreground rounded-md shadow-lg transition-all duration-150 animate-in fade-in zoom-in-95"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <div className="flex gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {post.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-semibold text-foreground text-sm">
                      {post.author.name}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {post.author.handle}
                    </span>
                    <span className="text-muted-foreground text-sm">·</span>
                    <span className="text-muted-foreground text-sm">
                      {post.timestamp}
                    </span>
                    
                    {post.isRageBait && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            aria-label="Warning: potential rage bait content"
                            className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-accent-text transition-colors hover:bg-primary/30"
                          >
                            <AlertTriangle className="h-2.5 w-2.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="bottom" 
                          className="max-w-xs bg-card border border-primary/30 p-3"
                        >
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-accent-text shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm mb-1">
                                Rage Bait Detected
                              </p>
                              <p className="text-muted-foreground text-xs leading-relaxed">
                                {post.rageBaitReason}
                              </p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  
                  <p
                    className={cn(
                      "mt-1 text-foreground text-sm leading-relaxed",
                      showWarning && "text-accent-text/90"
                    )}
                  >
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3 max-w-md">
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-blue-400 transition-colors group">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">{post.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-green-400 transition-colors group">
                      <Repeat2 className="h-4 w-4" />
                      <span className="text-xs">{post.stats.reposts}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-400 transition-colors group">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{post.stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group">
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">{post.stats.views}</span>
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {post.isRageBait && hoveredPost === post.id && !selectionMode && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!isHidden && !canAddMoreFilters) {
                            onLimitReached?.()
                            return
                          }
                          onToggleHidden(post.id)
                        }}
                        className="text-xs h-7 border-accent-text/30 text-accent-text hover:bg-primary/10"
                      >
                        {isHidden ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Show this post
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            Hide this post
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

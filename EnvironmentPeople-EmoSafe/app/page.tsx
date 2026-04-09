"use client"

import { useState } from "react"
import { SocialSidebar } from "@/components/social-sidebar"
import { SocialFeed } from "@/components/social-feed"
import { TrendingPanel } from "@/components/trending-panel"
import { ExtensionPopup } from "@/components/extension-popup"
import { ExtensionBadge } from "@/components/extension-badge"
import { SettingsPage } from "@/components/settings-page"
import { PremiumDialog } from "@/components/premium-dialog"
import { generateRelatedRageBaitPosts, initialPosts, type Post } from "@/lib/posts"

export default function Home() {
  const initialFilteredCount = 5
  const maxUserAddedFilters = 5
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showFiltered, setShowFiltered] = useState(false)
  const [hiddenPosts, setHiddenPosts] = useState<string[]>(["2", "5"])
  const [selectionMode, setSelectionMode] = useState(false)
  const [userAddedFilters, setUserAddedFilters] = useState(0)
  const [isPro, setIsPro] = useState(false)
  const [showPremiumDialog, setShowPremiumDialog] = useState(false)
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const cappedUserAddedFilters = Math.min(userAddedFilters, maxUserAddedFilters)
  const totalFilteredCount = initialFilteredCount + cappedUserAddedFilters
  const hasReachedFreeLimit = cappedUserAddedFilters >= maxUserAddedFilters

  const toggleHiddenPost = (postId: string) => {
    setHiddenPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleOpenSettings = () => {
    setIsPopupOpen(false)
    setIsSettingsOpen(true)
  }

  const handleAddLink = () => {
    if (hasReachedFreeLimit) {
      setShowPremiumDialog(true)
      return
    }
    setSelectionMode(true)
    setIsPopupOpen(false)
  }

  const handleExitSelectionMode = () => {
    setSelectionMode(false)
  }

  const handleAddToFilter = (postId: string) => {
    if (hiddenPosts.includes(postId)) return

    if (hasReachedFreeLimit) {
      setShowPremiumDialog(true)
      return
    }

    setHiddenPosts(prev => [...prev, postId])
    setUserAddedFilters(prev => Math.min(prev + 1, maxUserAddedFilters))

    // Demo feature: after a user filters something, generate more "relevant" rage-bait posts
    // in the same general category (but not copy-pasted), to show adaptive content behavior.
    const seed = posts.find(p => p.id === postId)
    if (seed) {
      const generated = generateRelatedRageBaitPosts(seed, 3)
      // Put generated posts at the top of the feed for a very obvious demo effect.
      setPosts(prev => [...generated, ...prev])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Extension Badge */}
      <ExtensionBadge
        isActive={true}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        filteredCount={totalFilteredCount}
        selectionMode={selectionMode}
        onExitSelectionMode={handleExitSelectionMode}
      />

      {/* Extension Popup */}
      <ExtensionPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        showFiltered={showFiltered}
        onToggleShowFiltered={() => setShowFiltered(!showFiltered)}
        onOpenSettings={handleOpenSettings}
        onAddLink={handleAddLink}
        filteredCount={totalFilteredCount}
        canAddLinks={!hasReachedFreeLimit}
      />

      {/* Settings Page */}
      <SettingsPage
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isPro={isPro}
      />

      {/* Premium Upsell */}
      <PremiumDialog
        isOpen={showPremiumDialog}
        onClose={() => setShowPremiumDialog(false)}
        onUpgrade={() => {
          setIsPro(true)
          setShowPremiumDialog(false)
        }}
      />

      {/* Main Layout */}
      <div className="flex justify-center">
        {/* Left Sidebar */}
        <div className="w-20 xl:w-64 shrink-0 sticky top-0 h-screen border-r border-border">
          <SocialSidebar />
        </div>

        {/* Main Feed */}
        <main className="w-full max-w-[600px] border-r border-border">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex">
              <button className="flex-1 py-4 text-center font-bold text-foreground hover:bg-secondary/50 transition-colors relative">
                For you
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1D9BF0] rounded-full" />
              </button>
              <button className="flex-1 py-4 text-center text-muted-foreground hover:bg-secondary/50 transition-colors">
                Following
              </button>
            </div>
          </div>

          {/* Compose */}
          <div className="p-4 border-b border-border">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="What's happening?"
                  className="w-full bg-transparent text-xl text-foreground placeholder:text-muted-foreground focus:outline-none py-2"
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    {["image", "gif", "poll", "emoji", "schedule", "location"].map((item) => (
                      <button
                        key={item}
                        className="p-2 hover:bg-[#1D9BF0]/10 rounded-full transition-colors"
                      >
                        <div className="w-5 h-5 bg-[#1D9BF0]/40 rounded" />
                      </button>
                    ))}
                  </div>
                  <button className="bg-gray-300 text-gray-500 font-bold py-1.5 px-4 rounded-full text-sm transition-colors cursor-not-allowed">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <SocialFeed
            posts={posts}
            hiddenPosts={hiddenPosts}
            onToggleHidden={toggleHiddenPost}
            showFiltered={showFiltered}
            selectionMode={selectionMode}
            onAddToFilter={handleAddToFilter}
            canAddMoreFilters={!hasReachedFreeLimit}
            onLimitReached={() => setShowPremiumDialog(true)}
          />
        </main>

        {/* Right Sidebar */}
        <div className="w-80 shrink-0 hidden lg:block">
          <TrendingPanel />
        </div>
      </div>
    </div>
  )
}

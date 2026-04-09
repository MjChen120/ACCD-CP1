"use client"

import { X, Shield, Zap, Sparkles, Check } from "lucide-react"

interface PremiumDialogProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

export function PremiumDialog({ isOpen, onClose, onUpgrade }: PremiumDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-border">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-secondary/50 transition-colors z-10"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent pt-8 pb-6 px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Upgrade to EmoSafe Pro</h2>
              <p className="text-sm text-muted-foreground">Unlock unlimited protection</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-muted-foreground mb-5">
            {"You've"} reached the free limit of 5 manual filters. Upgrade to Pro for unlimited filtering power!
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 text-accent-text" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Unlimited Manual Filters</h3>
                <p className="text-sm text-muted-foreground">Add as many links as you want to your filter list</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-accent-text" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Advanced AI Detection</h3>
                <p className="text-sm text-muted-foreground">More accurate rage bait detection with our latest models</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="h-4 w-4 text-accent-text" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Unlimited Keywords</h3>
                <p className="text-sm text-muted-foreground">Create custom keyword filters without any limits</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-secondary/30 rounded-xl p-4 mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">$15</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Cancel anytime. 7-day free trial included.</p>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <button
              onClick={onUpgrade}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-full transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={onClose}
              className="w-full text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

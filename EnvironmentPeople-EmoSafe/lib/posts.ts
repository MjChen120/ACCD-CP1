"use client"

export interface Post {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  timestamp: string
  stats: {
    comments: number
    reposts: number
    likes: number
    views: string
  }
  isRageBait?: boolean
  rageBaitReason?: string
  rageBaitCategory?: string
  isHidden?: boolean
  isGenerated?: boolean
}

export const initialPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      handle: "@sarahcodes",
      avatar: "/placeholder.svg",
    },
    content:
      "Just deployed my first Next.js app to Vercel and it was surprisingly smooth! The DX is incredible. Anyone else loving the App Router?",
    timestamp: "2h",
    stats: { comments: 24, reposts: 45, likes: 312, views: "4.2K" },
    isRageBait: false,
  },
  {
    id: "2",
    author: {
      name: "Hustle Bro",
      handle: "@grindset247",
      avatar: "/placeholder.svg",
    },
    content:
      "TikTokers are making more than doctors. And you're STILL going to college? WAKE UP. The system is designed to keep you poor.",
    timestamp: "3h",
    stats: { comments: 892, reposts: 1200, likes: 5400, views: "45K" },
    isRageBait: true,
    rageBaitReason:
      "This post uses inflammatory language and misleading comparisons designed to provoke emotional reactions rather than inform.",
    rageBaitCategory: "Engagement Bait",
    isHidden: true,
  },
  {
    id: "3",
    author: {
      name: "Alex Rivera",
      handle: "@alexr_design",
      avatar: "/placeholder.svg",
    },
    content: "Hot take: Coffee shops with good wifi and no time limits are the best coworking spaces. Fight me.",
    timestamp: "4h",
    stats: { comments: 89, reposts: 23, likes: 456, views: "5.1K" },
    isRageBait: false,
  },
  {
    id: "4",
    author: {
      name: "TechNews Daily",
      handle: "@technewsdaily",
      avatar: "/placeholder.svg",
    },
    content: "Breaking: Apple announces new MacBook Pro lineup with M4 chips. Up to 22 hours battery life and 3x faster than M1.",
    timestamp: "5h",
    stats: { comments: 234, reposts: 567, likes: 2341, views: "89K" },
    isRageBait: false,
  },
  {
    id: "5",
    author: {
      name: "Rage Farmer",
      handle: "@hottakes_only",
      avatar: "/placeholder.svg",
    },
    content: "People who work 9-5 jobs are LOSERS. Here's why successful people NEVER have a traditional job (Thread)",
    timestamp: "5h",
    stats: { comments: 2100, reposts: 890, likes: 12000, views: "120K" },
    isRageBait: true,
    rageBaitReason:
      "This post uses divisive language and creates artificial us-vs-them mentality to drive engagement through controversy.",
    rageBaitCategory: "Divisive Content",
    isHidden: true,
  },
  {
    id: "6",
    author: {
      name: "Emma Thompson",
      handle: "@emmawrites",
      avatar: "/placeholder.svg",
    },
    content:
      "Finally finished reading 'Tomorrow, and Tomorrow, and Tomorrow' and wow. What a beautiful exploration of friendship and creativity. Highly recommend!",
    timestamp: "6h",
    stats: { comments: 45, reposts: 12, likes: 289, views: "3.2K" },
    isRageBait: false,
  },
  {
    id: "7",
    author: {
      name: "Marcus Johnson",
      handle: "@marcusj_dev",
      avatar: "/placeholder.svg",
    },
    content:
      "Day 47 of learning Rust. Finally understanding lifetimes and borrowing. The compiler errors are actually helpful once you know how to read them.",
    timestamp: "7h",
    stats: { comments: 67, reposts: 34, likes: 523, views: "6.8K" },
    isRageBait: false,
  },
  {
    id: "8",
    author: {
      name: "Outrage Machine",
      handle: "@cancelculture",
      avatar: "/placeholder.svg",
    },
    content:
      "Can't believe this celebrity said THIS. They should be CANCELLED immediately. RT if you agree we need to hold them accountable!",
    timestamp: "8h",
    stats: { comments: 3400, reposts: 2100, likes: 8900, views: "250K" },
    isRageBait: true,
    rageBaitReason:
      "This post uses moral outrage and call-to-action language to drive engagement through controversy and mob mentality.",
    rageBaitCategory: "Outrage Farming",
    isHidden: false,
  },
  {
    id: "9",
    author: {
      name: "Lisa Park",
      handle: "@lisaparkcooks",
      avatar: "/placeholder.svg",
    },
    content: "Made homemade ramen from scratch today. 12 hours of work but totally worth it. The broth was incredible!",
    timestamp: "9h",
    stats: { comments: 156, reposts: 89, likes: 1234, views: "15K" },
    isRageBait: false,
  },
  {
    id: "10",
    author: {
      name: "David Kim",
      handle: "@davidkim_photo",
      avatar: "/placeholder.svg",
    },
    content:
      "Caught the most amazing sunset today at the pier. Sometimes you just need to put the phone down and enjoy the moment... after taking one photo.",
    timestamp: "10h",
    stats: { comments: 34, reposts: 18, likes: 567, views: "7.3K" },
    isRageBait: false,
  },
  {
    id: "11",
    author: {
      name: "Fear Monger News",
      handle: "@breakingnow",
      avatar: "/placeholder.svg",
    },
    content:
      "URGENT: New study reveals SHOCKING truth about everyday item in your home. You won't believe what it's doing to your family!",
    timestamp: "11h",
    stats: { comments: 1800, reposts: 3400, likes: 4500, views: "180K" },
    isRageBait: true,
    rageBaitReason:
      "This post uses fear-mongering tactics and clickbait language to drive engagement through anxiety rather than providing factual information.",
    rageBaitCategory: "Fear-Mongering",
    isHidden: false,
  },
  {
    id: "12",
    author: {
      name: "James Wilson",
      handle: "@jameswilson",
      avatar: "/placeholder.svg",
    },
    content: "Just adopted a rescue dog named Charlie. He's already claimed the couch as his own. Best decision ever.",
    timestamp: "12h",
    stats: { comments: 89, reposts: 23, likes: 892, views: "9.1K" },
    isRageBait: false,
  },
  {
    id: "13",
    author: {
      name: "Startup Thoughts",
      handle: "@startupthoughts",
      avatar: "/placeholder.svg",
    },
    content:
      "Reminder: You don't need to work 80 hour weeks to be successful. Work-life balance is not a weakness, it's a strategy for long-term sustainability.",
    timestamp: "13h",
    stats: { comments: 234, reposts: 456, likes: 3421, views: "42K" },
    isRageBait: false,
  },
  {
    id: "14",
    author: {
      name: "Mia Rodriguez",
      handle: "@miarodriguez",
      avatar: "/placeholder.svg",
    },
    content: "Just finished a 5K for the first time ever! Time doesn't matter, what matters is I didn't give up. Progress over perfection.",
    timestamp: "14h",
    stats: { comments: 67, reposts: 45, likes: 1567, views: "18K" },
    isRageBait: false,
  },
]

let generatedCounter = 0
function nextGeneratedId() {
  generatedCounter += 1
  return `g_${Date.now()}_${generatedCounter}`
}

const generatedAuthors = [
  { name: "Hot Take Hub", handle: "@hottakehub", avatar: "/placeholder.svg" },
  { name: "Thread Starter", handle: "@thread_starter", avatar: "/placeholder.svg" },
  { name: "ViralTruth", handle: "@viraltruth_now", avatar: "/placeholder.svg" },
  { name: "Opinion Factory", handle: "@opinionfactory", avatar: "/placeholder.svg" },
]

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function jitterStats() {
  const likes = 500 + Math.floor(Math.random() * 8000)
  const reposts = 50 + Math.floor(Math.random() * 2500)
  const comments = 80 + Math.floor(Math.random() * 3200)
  const viewsK = 20 + Math.floor(Math.random() * 300)
  return {
    likes,
    reposts,
    comments,
    views: `${viewsK}K`,
  }
}

export function generateRelatedRageBaitPosts(seed: Post, count = 3): Post[] {
  const category = seed.rageBaitCategory ?? "Engagement Bait"

  const templatesByCategory: Record<string, string[]> = {
    "Engagement Bait": [
      "If you’re still doing it the “normal way,” you’re falling behind. Be honest: are you choosing comfort over freedom?",
      "Most people won’t like hearing this: the rules are not made for you. The sooner you accept that, the faster you win.",
      "They told you to follow the path… and it’s not working. At what point do you stop pretending it will?",
    ],
    "Divisive Content": [
      "It’s wild how two people can see the same world and live in completely different realities. Which side are you really on?",
      "We’re not even arguing facts anymore — we’re arguing identities. That’s exactly how they keep everyone fighting.",
      "If you disagree with this, you’re part of the problem. Not sorry.",
    ],
    "Outrage Farming": [
      "So we’re just going to normalize this now? Because I’m not. This is embarrassing.",
      "Everyone’s defending it, but deep down you know it’s wrong. Say it out loud.",
      "If this doesn’t make you angry, you’re not paying attention.",
    ],
    "Fear-Mongering": [
      "Nobody is talking about the real risk here — and that’s the scary part. Protect your family before it’s too late.",
      "This is exactly how it starts. Quiet at first… then suddenly it’s everywhere.",
      "If you think it can’t happen to you, that’s what they want you to believe.",
    ],
  }

  const templates = templatesByCategory[category] ?? templatesByCategory["Engagement Bait"]

  return Array.from({ length: count }).map((_, idx) => {
    const author = pick(generatedAuthors)
    const stats = jitterStats()
    return {
      id: nextGeneratedId(),
      author,
      content: templates[(idx + Math.floor(Math.random() * templates.length)) % templates.length],
      timestamp: "Just now",
      stats,
      isRageBait: true,
      rageBaitCategory: category,
      rageBaitReason:
        "This post appears to mirror the same emotional trigger pattern you just filtered, which can increase engagement through provocation.",
      isHidden: false,
      isGenerated: true,
    }
  })
}


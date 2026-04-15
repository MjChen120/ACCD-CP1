"use client"

import { Header } from "@/components/dashboard/header"
import { WelcomeSection } from "@/components/dashboard/welcome-section"
import { AssignmentsSection } from "@/components/dashboard/assignments-section"
import { RitualSection } from "@/components/dashboard/ritual-section"
import { CalendarSection } from "@/components/dashboard/calendar-section"
import { TaskManagerSection } from "@/components/dashboard/task-manager-section"
import { MaterialsSection } from "@/components/dashboard/materials-section"
import { ToolsSection } from "@/components/dashboard/tools-section"
import { ResourcesSection } from "@/components/dashboard/resources-section"
import { Footer } from "@/components/dashboard/footer"
import { ColorProvider } from "@/components/dashboard/color-context"

export default function Dashboard() {
  return (
    <ColorProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6 flex flex-col gap-6">
          {/* Welcome Section with collapsible toggle */}
          <WelcomeSection />
          
          {/* Slim Rituals Section - collapsible */}
          <RitualSection />
          
          {/* Upcoming Deadlines + Tools side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <AssignmentsSection />
            <ToolsSection />
          </div>
          
          {/* Schedule/Calendar Section */}
          <CalendarSection />
          
          {/* Task Manager (Kanban) - separate section */}
          <TaskManagerSection />
          
          {/* Materials & Resources side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <MaterialsSection />
            <ResourcesSection />
          </div>
        </main>
        <Footer />
      </div>
    </ColorProvider>
  )
}

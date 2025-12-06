"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidatePool } from "@/components/candidate-pool"
import { JobApplications } from "@/components/job-applications"
import { WorkerAssignments } from "@/components/worker-assignments"

export function HiringCenter() {
  const [activeTab, setActiveTab] = useState("candidates")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Centro de Contratación</h2>
        <p className="text-muted-foreground">Gestiona candidatos, aplicaciones y asignaciones de trabajadores</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
          <TabsTrigger value="candidates">Pool de Candidatos</TabsTrigger>
          <TabsTrigger value="applications">Aplicaciones</TabsTrigger>
          <TabsTrigger value="assignments">Asignaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="space-y-4">
          <CandidatePool />
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <JobApplications />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <WorkerAssignments />
        </TabsContent>
      </Tabs>
    </div>
  )
}

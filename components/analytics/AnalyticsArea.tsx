import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import MetricCard from "./MetricCard"

export default function AnalyticsArea() {
  return (
    <section className="grid gap-4">
      <Card>
        <CardContent className="py-8">
          <div className="flex min-h-[50vh] overflow-auto items-center justify-center text-sm text-gray-500">
            Analytics will appear here based on your question
            <MetricCard 
              title="Revenue"
              value="$12,345"
              change="+5%"
              trend="up"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

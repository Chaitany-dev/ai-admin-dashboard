"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MetricCard from "@/components/analytics/MetricCard"
import TimeSeriesChart from "@/components/analytics/TimeSeriesChart"
import DataTable from "@/components/analytics/DataTable"
import {
  resolveAnalyticsQuery,
  type AnalyticsInstruction,
} from "@/services/analyticsService"

export default function Home() {
  const [prompt, setPrompt] = React.useState("")
  const [items, setItems] = React.useState<AnalyticsInstruction[]>([])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = prompt.trim()
    if (!q) return

    const instruction = resolveAnalyticsQuery(q)
    setItems((prev) => [...prev, instruction])
    setPrompt("")
  }

  return (
    <div className="space-y-6">
      <section>
        <Card>
          <CardContent>
            <form onSubmit={onSubmit} className="flex items-center gap-3">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about your analytics (e.g. 'Show today’s active users')"
                aria-label="Analytics question"
                className="h-12"
              />
              <Button type="submit" className="text-md h-12">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4">
        <Card>
          <CardContent className="py-8">
            <div className="min-h-[50vh] overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Analytics will appear here based on your question
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((item, idx) => {
                    if (item.type === "metric") {
                      return (
                        <MetricCard key={idx} {...item.props} />
                      )
                    }
                    if (item.type === "chart") {
                      return (
                        <TimeSeriesChart key={idx} {...item.props} />
                      )
                    }
                    return <DataTable key={idx} {...item.props} />
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
 

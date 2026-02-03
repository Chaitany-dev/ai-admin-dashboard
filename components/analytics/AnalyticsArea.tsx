import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function AnalyticsArea() {
  return (
    <section className="grid gap-4">
      <Card>
        <CardContent className="py-8">
          <div className="flex min-h-[280px] items-center justify-center text-sm text-gray-500">
            Analytics will appear here based on your question
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

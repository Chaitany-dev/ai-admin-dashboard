import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type Trend = "up" | "down" | "neutral"

export interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  trend?: Trend
}

function TrendIcon({ trend, className }: { trend?: Trend; className?: string }) {
  if (trend === "up") {
    return (
      <svg
        className={cn("h-3.5 w-3.5", className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (trend === "down") {
    return (
      <svg
        className={cn("h-3.5 w-3.5", className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M18 10l-6 6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg
      className={cn("h-3.5 w-3.5", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function trendClasses(trend?: Trend) {
  switch (trend) {
    case "up":
      return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-800"
    case "down":
      return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/40 dark:border-red-800"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/40 dark:border-gray-800"
  }
}

export default function MetricCard({ title, value, change, trend = "neutral" }: MetricCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {change ? (
          <div
            className={cn(
              "mt-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs",
              trendClasses(trend)
            )}
          >
            <TrendIcon trend={trend} />
            <span>{change}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface TimePoint {
  label: string
  value: number
}

export interface TimeSeriesChartProps {
  title: string
  description?: string
  data: TimePoint[]
}

export default function TimeSeriesChart({ title, description, data }: TimeSeriesChartProps) {
  const containerHeight = 128 // px
  const maxValue = React.useMemo(() => {
    return data.length ? Math.max(...data.map((d) => d.value)) : 0
  }, [data])

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-sm">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-end gap-2" style={{ height: containerHeight }}>
          {data.map((d, idx) => {
            const height = maxValue > 0 ? Math.max(2, Math.round((d.value / maxValue) * containerHeight)) : 0
            return (
              <div key={idx} className="flex w-full min-w-[16px] flex-col items-center">
                <div
                  className="w-full rounded-t-sm bg-primary/70 dark:bg-primary/60"
                  style={{ height }}
                  aria-label={`${d.label}: ${d.value}`}
                />
                <div className="mt-1 line-clamp-1 w-full text-center text-[10px] text-muted-foreground">
                  {d.label}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

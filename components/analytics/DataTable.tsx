import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface DataTableProps {
  title: string
  columns: string[]
  rows: (string | number)[][]
}

export default function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="max-h-80 overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-background">
              <tr className="border-b">
                {columns.map((col, i) => (
                  <th key={i} className="px-3 py-2 text-left font-medium text-muted-foreground">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b odd:bg-muted/30">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-6 text-center text-muted-foreground">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

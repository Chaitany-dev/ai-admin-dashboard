'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatInput() {
  const [prompt, setPrompt] = React.useState("")

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // No real logic yet; keep local state only
    // Future: trigger generative UI rendering based on `prompt`
  }

  return (
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
            <Button type="submit" className="text-md h-12">Send</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

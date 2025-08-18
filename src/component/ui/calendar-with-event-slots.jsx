"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Card, CardContent, CardFooter } from "./card"
import { Input } from "./input"
import { Badge } from "./badge"
import { Checkbox } from "./checkbox"
import { EventDialog } from "./event-dialog"
import { cn } from "../../lib/Utlis"

const eventTypeColors = {
  study: 'bg-blue-500',
  meet: 'bg-green-500', 
  assignment: 'bg-red-500',
  other: 'bg-gray-500'
}

export function CalendarWithEventSlots({ 
  events, 
  onEventAdd, 
  onEventComplete,
  searchable = false,
  compact = false 
}) {
  const [date, setDate] = React.useState(new Date())
  const [searchTerm, setSearchTerm] = React.useState("")

  // Filter events for selected date
  const selectedDateEvents = events.filter(event => {
    if (!date) return false
    const eventDate = new Date(event.datetime)
    return eventDate.toDateString() === date.toDateString()
  })

  // Filter events by search term
  const filteredEvents = selectedDateEvents.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <Card className={cn("w-fit", compact ? "max-w-sm" : "")}>
      <CardContent className="px-4 py-4">
        {searchable && (
          <div className="mb-4 relative">
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-transparent p-0"
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm font-medium">
            {date?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          {onEventAdd && (
            <EventDialog 
              onSave={onEventAdd}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  title="Add Event"
                >
                  <PlusIcon />
                  <span className="sr-only">Add Event</span>
                </Button>
              }
            />
          )}
        </div>
        <div className="flex w-full flex-col gap-2">
          {filteredEvents.length === 0 ? (
            <p className="text-muted-foreground text-xs text-center py-2">
              No events for this date
            </p>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "relative rounded-md p-2 pl-6 text-sm transition-opacity",
                  "after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full",
                  `after:${eventTypeColors[event.type]}`,
                  event.completed ? "opacity-50" : "bg-muted"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium",
                      event.completed && "line-through"
                    )}>
                      {event.name}
                    </div>
                    <div className="text-muted-foreground text-xs flex items-center gap-2">
                      <span>{formatTime(event.time)}</span>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", `border-${eventTypeColors[event.type].replace('bg-', '')}`)}
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  {onEventComplete && (
                    <Checkbox
                      checked={event.completed || false}
                      onCheckedChange={() => onEventComplete(event.id)}
                      className="ml-2"
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

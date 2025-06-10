"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  CalendarIcon,
  Plus,
  List,
  ChevronLeft,
  ChevronRight,
  Bell,
  Users,
  Building,
  Gavel,
  DollarSign,
  AlertTriangle,
  Clock,
  FileText,
} from "lucide-react"

// Sample calendar events
const calendarEvents = [
  {
    id: "1",
    title: "Court Date - Gorbell, Ryan",
    date: "2025-06-06",
    type: "court-date",
    time: "9:00 AM",
    location: "District Court",
    description: "DUI case hearing",
  },
  {
    id: "2",
    title: "Court Date - Carroll, Dessie",
    date: "2025-06-12",
    type: "court-date",
    time: "2:00 PM",
    location: "Municipal Court",
    description: "Theft case hearing",
  },
  {
    id: "3",
    title: "Court Date - Mosier, Matthew",
    date: "2025-06-24",
    type: "court-date",
    time: "10:30 AM",
    location: "County Court",
    description: "Disorderly conduct hearing",
  },
  {
    id: "4",
    title: "Balance Due - Smith, John",
    date: "2025-06-15",
    type: "balance-due",
    time: "",
    location: "",
    description: "$500 payment due",
  },
  {
    id: "5",
    title: "Collateral Return",
    date: "2025-06-20",
    type: "collateral-return",
    time: "",
    location: "",
    description: "Property return scheduled",
  },
]

const calendarTypes = [
  { id: "personal", name: "Personal Events", icon: Users, color: "bg-blue-500", enabled: true },
  { id: "company", name: "Company Events", icon: Building, color: "bg-green-500", enabled: true },
  { id: "court-dates", name: "Def's Court Dates", icon: Gavel, color: "bg-red-500", enabled: true },
  { id: "collateral", name: "Collateral Returns", icon: FileText, color: "bg-orange-500", enabled: false },
  { id: "forfeitures", name: "Forfeitures Due", icon: AlertTriangle, color: "bg-yellow-500", enabled: false },
  { id: "balance", name: "Balance Due", icon: DollarSign, color: "bg-purple-500", enabled: true },
  { id: "show-cause", name: "Show Cause Date", icon: Gavel, color: "bg-pink-500", enabled: false },
  { id: "remission", name: "Remission Expire Dates", icon: Clock, color: "bg-indigo-500", enabled: false },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([
    "personal",
    "company",
    "court-dates",
    "balance",
  ])
  const [viewMode, setViewMode] = useState<"month" | "list">("month")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const toggleCalendar = (calendarId: string) => {
    setSelectedCalendars((prev) =>
      prev.includes(calendarId) ? prev.filter((id) => id !== calendarId) : [...prev, calendarId],
    )
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getEventsForDate = (day: number | null) => {
    if (!day) return []

    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    return calendarEvents.filter((event) => {
      const eventDate = event.date
      const eventType = event.type
      return eventDate === dateString && selectedCalendars.includes(eventType)
    })
  }

  const getEventTypeColor = (type: string) => {
    const calendarType = calendarTypes.find((cal) => cal.id === type)
    return calendarType?.color || "bg-gray-500"
  }

  const totalEvents = calendarEvents.filter((event) => selectedCalendars.includes(event.type)).length
  const courtDatesCount = calendarEvents.filter((event) => event.type === "court-dates").length
  const balanceDueCount = calendarEvents.filter((event) => event.type === "balance").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
          <Button variant="outline" onClick={() => setViewMode(viewMode === "month" ? "list" : "month")}>
            <List className="mr-2 h-4 w-4" />
            {viewMode === "month" ? "List View" : "Calendar View"}
          </Button>
          <Button variant="outline" onClick={goToToday}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Today
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-blue-100">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{totalEvents}</h3>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-red-100">
                <Gavel className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Court Dates</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{courtDatesCount}</h3>
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Balance Due</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">{balanceDueCount}</h3>
                  <p className="text-xs text-muted-foreground">Items</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-orange-100">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold">3</h3>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h4 className="font-medium mb-2">Default Calendars</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mccarthy" defaultChecked />
                  <Label htmlFor="mccarthy" className="text-sm">
                    McCarthy, Lucas
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications" defaultChecked />
                  <Label htmlFor="notifications" className="text-sm">
                    Notification (3)
                  </Label>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-medium mb-2">Calendars</h4>
              <div className="space-y-2">
                {calendarTypes.map((calendar) => {
                  const Icon = calendar.icon
                  return (
                    <div key={calendar.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={calendar.id}
                        checked={selectedCalendars.includes(calendar.id)}
                        onCheckedChange={() => toggleCalendar(calendar.id)}
                      />
                      <div className={`w-3 h-3 rounded-full ${calendar.color}`} />
                      <Icon className="h-4 w-4" />
                      <Label htmlFor={calendar.id} className="text-sm flex-1">
                        {calendar.name}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Def's Court Dates</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Select
                  value={monthNames[currentDate.getMonth()]}
                  onValueChange={(month) => {
                    const monthIndex = monthNames.indexOf(month)
                    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1))
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={currentDate.getFullYear().toString()}
                  onValueChange={(year) => {
                    setCurrentDate(new Date(Number.parseInt(year), currentDate.getMonth(), 1))
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2023, 2024, 2025, 2026, 2027].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "month" ? (
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground border-b">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {getDaysInMonth(currentDate).map((day, index) => {
                  const events = getEventsForDate(day)
                  const isToday =
                    day &&
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear()

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-border ${
                        day ? "bg-background hover:bg-muted/50 cursor-pointer" : "bg-muted/20"
                      } ${isToday ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
                          <div className="space-y-1">
                            {events.map((event) => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                                title={`${event.title} - ${event.time}`}
                              >
                                {event.type === "court-dates" && `Court Dates (${events.length})`}
                                {event.type === "balance" && "Balance Due"}
                                {event.type === "collateral-return" && "Collateral Return"}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upcoming Events</h3>
                {calendarEvents
                  .filter((event) => selectedCalendars.includes(event.type))
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${getEventTypeColor(event.type)} mt-1`} />
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.date} {event.time && `at ${event.time}`}
                        </div>
                        {event.location && <div className="text-sm text-muted-foreground">{event.location}</div>}
                        {event.description && <div className="text-sm text-muted-foreground">{event.description}</div>}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

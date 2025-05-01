"use client"

import { useState, useEffect, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  // Initialize with the provided date values
  const [day, setDay] = useState<string>(date.getDate().toString())
  const [month, setMonth] = useState<string>((date.getMonth() + 1).toString())
  const [year, setYear] = useState<string>(date.getFullYear().toString())
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])

  // Use a ref to track if we're in the initial render
  const isInitialRender = useRef(true)
  // Use a ref to prevent unnecessary updates
  const isUpdatingParent = useRef(false)

  // Generate years (100 years back from current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - 99 + i).toString())

  // Months data
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  // Update days in month when month or year changes
  useEffect(() => {
    const daysCount = new Date(Number.parseInt(year), Number.parseInt(month), 0).getDate()
    const daysArray = Array.from({ length: daysCount }, (_, i) => (i + 1).toString())
    setDaysInMonth(daysArray)

    // If current day is greater than days in month, adjust it
    if (Number.parseInt(day) > daysCount) {
      setDay(daysCount.toString())
    }
  }, [month, year, day])

  // Update parent component's date when day, month, or year changes
  // But only after initial render and not during parent-initiated updates
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (!isUpdatingParent.current) {
      const newDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
      setDate(newDate)
    }
  }, [day, month, year, setDate])

  // Update local state when parent date changes
  useEffect(() => {
    isUpdatingParent.current = true
    setDay(date.getDate().toString())
    setMonth((date.getMonth() + 1).toString())
    setYear(date.getFullYear().toString())

    // Reset the flag after state updates
    setTimeout(() => {
      isUpdatingParent.current = false
    }, 0)
  }, [date])

  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
        <label htmlFor="month-select" className="block text-xs font-medium text-green-700 mb-1">
          Month
        </label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger id="month-select" className="border-2 border-green-200 hover:border-green-300">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="day-select" className="block text-xs font-medium text-green-700 mb-1">
          Day
        </label>
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger id="day-select" className="border-2 border-green-200 hover:border-green-300">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {daysInMonth.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="year-select" className="block text-xs font-medium text-green-700 mb-1">
          Year
        </label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger id="year-select" className="border-2 border-green-200 hover:border-green-300">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

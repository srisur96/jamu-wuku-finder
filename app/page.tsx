"use client"

import { useState } from "react"
import { DatePicker } from "@/components/date-picker"
import { JamuCard } from "@/components/jamu-card"
import { CalendarInfo } from "@/components/calendar-info"
import { convertGregorianToJavanese } from "@/lib/calendar-converter"
import { getJamuByWuku } from "@/lib/jamu-data"
import { Leaf, BookOpen } from "lucide-react"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showResult, setShowResult] = useState(false)
  const [calendarData, setCalendarData] = useState<any>(null)
  const [jamuData, setJamuData] = useState<any>(null)

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    // setShowResult(false)
  }

  const findJamu = (date: Date) => {
    const javaneseDate = convertGregorianToJavanese(date)
    setCalendarData(javaneseDate)
  
    const jamu = getJamuByWuku(javaneseDate.wuku)
    setJamuData(jamu)
    setShowResult(true)
    console.log("button clicked")
    console.log(date)
    console.log(showResult)

  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-green-600 mr-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-green-800">Jamu Wuku Finder</h1>
          </div>
          <p className="text-xl text-green-700 mt-2">Discover the right Jamu based on your Javanese Wuku</p>

          <div className="mt-4 flex items-center justify-center text-sm text-green-600">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Based on the Pawukon Mbah Jo Tirto Manuscript</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-green-700 mb-2">Select your birth date:</label>
              <DatePicker date={selectedDate} setDate={handleDateChange} />
            </div>
            <button
              onClick={() => findJamu(selectedDate)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Find My Jamu
            </button>
          </div>
        </div>

        {showResult && (
          <div className="space-y-8 animate-fadeIn">
            <CalendarInfo calendarData={calendarData} />

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Your Recommended Jamu</h2>
              {jamuData ? (
                <JamuCard jamu={jamuData} />
              ) : (
                <div className="text-center p-8 bg-yellow-50 rounded-lg">
                  <p className="text-lg text-amber-700">
                    No Jamu found for this Wuku: <strong>{calendarData.wuku}</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  The Jamu recommendations are based on the ancient Javanese manuscript "Pawukon Mbah Jo Tirto," which
                  contains traditional knowledge about the relationship between Wuku cycles and herbal remedies. This
                  manuscript has been passed down through generations of traditional Javanese healers.
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-green-700">
          <p>© {new Date().getFullYear()} Jamu Wuku Finder • Based on the Pawukon Mbah Jo Tirto Manuscript</p>
        </footer>
      </div>
    </main>
  )
}

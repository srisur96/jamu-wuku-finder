interface CalendarInfoProps {
  calendarData: {
    tanggalMasehi: string
    weton: string
    wuku: string
    tanggalJawa: number | string
    bulanJawa: string
    tahunJawa: number
    namaTahun: string
  }
}

export function CalendarInfo({ calendarData }: CalendarInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Javanese Calendar Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-1">Gregorian Date</h3>
          <p className="text-lg font-semibold text-green-900">{calendarData.tanggalMasehi}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-700 mb-1">Weton</h3>
          <p className="text-lg font-semibold text-yellow-900">{calendarData.weton}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-1">Wuku</h3>
          <p className="text-lg font-semibold text-green-900">{calendarData.wuku}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-700 mb-1">Tanggal & Bulan Jawa</h3>
          <p className="text-lg font-semibold text-yellow-900">
            {calendarData.tanggalJawa} {calendarData.bulanJawa}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-1">Tahun Jawa</h3>
          <p className="text-lg font-semibold text-green-900">{calendarData.tahunJawa}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-700 mb-1">Nama Tahun (Windu)</h3>
          <p className="text-lg font-semibold text-yellow-900">{calendarData.namaTahun}</p>
        </div>
      </div>
    </div>
  )
}

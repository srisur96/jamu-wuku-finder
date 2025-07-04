// Function to calculate Absolute Days from Gregorian date
export function calculateAbsoluteDays(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let absoluteDays =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  return absoluteDays;
}

// Convert Absolute Days to Islamic Hijri Date (Tabular Method)
export function absoluteDaysToHijri(absDays: number) {
  const epochHijri = 1948439.5;

  const daysSinceEpoch = absDays - epochHijri;
  const hijriYearApprox = Math.floor((30 * daysSinceEpoch + 10646) / 10631);

  const firstDayOfHijriYear =
    epochHijri +
    354 * (hijriYearApprox - 1) +
    Math.floor((3 + 11 * hijriYearApprox) / 30);

  let hijriMonth = 1;
  let hijriDay = Math.floor(absDays - firstDayOfHijriYear) + 1;

  const hijriMonthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  if (isIslamicLeapYear(hijriYearApprox)) {
    hijriMonthLengths[11] = 30;
  }

  while (hijriDay > hijriMonthLengths[hijriMonth - 1]) {
    hijriDay -= hijriMonthLengths[hijriMonth - 1];
    hijriMonth++;
  }

  return {
    year: hijriYearApprox,
    month: hijriMonth,
    day: hijriDay,
  };
}

function isIslamicLeapYear(hijriYear: number) {
  return ((11 * hijriYear + 14) % 30) < 11;
}

// Convert Hijri Year to Javanese Year
export function hijriToJavaneseYear(hijriYear: number) {
  const javaneseYear = hijriYear + 512;
  const namaTahunJawa = ["Alip", "Ehe", "Jimawal", "Je", "Dal", "Be", "Wawu", "Jimakir"];
  const namaTahun = namaTahunJawa[((javaneseYear - 1555 + 8) % 8)];

  return {
    tahunJawa: javaneseYear,
    namaTahun: namaTahun,
  };
}

// Nama-nama bulan Jawa berdasarkan Hijriyah
const bulanHijriyahKeJawa = [
  "Sura",
  "Sapar",
  "Mulud",
  "Bakda Mulud",
  "Jumadil Awal",
  "Jumadil Akhir",
  "Rejeb",
  "Ruwah",
  "Pasa",
  "Sawal",
  "Dulkaidah",
  "Besar",
];

// Main Function - Gregorian Date to Full Javanese Calendar Info
export function convertGregorianToJavanese(date: Date) {
  console.log("🧮 Konversi dimulai untuk:", date.toISOString());
  const pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
  const javaneseWeekdays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Ahad"];
  const wukuNames = [
    "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg",
    "Warigalit", "Warigagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan",
    "Langkir", "Mandhasiya", "Julungpujud", "Pahang", "Kuruwelut", "Marakeh",
    "Tambir", "Medhangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat",
    "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"
  ];

  // Gunakan tanggal dalam UTC agar konsisten di semua zona waktu
  const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  const refPawukonDate = new Date("1632-12-26T00:00:00Z");
  const refPasaranIndex = 1; // Pahing
  const refWukuIndex = 0; // Sinta
  const oneDay = 24 * 60 * 60 * 1000;

  const absDays = calculateAbsoluteDays(dateUTC);
  const hijriDate = absoluteDaysToHijri(absDays);
  const javaneseYearInfo = hijriToJavaneseYear(hijriDate.year);

  const deltaDaysPawukon = Math.floor((dateUTC.getTime() - refPawukonDate.getTime()) / oneDay);
  const weekdayIndex = (dateUTC.getUTCDay() + 6) % 7; // Senin = 0
  const pasaranIndex = (refPasaranIndex + (deltaDaysPawukon % 5) + 5) % 5;
  const wukuIndex = (refWukuIndex + Math.floor((((deltaDaysPawukon + 1) % 210 + 210) % 210) / 7)) % 30;

  return {
    tanggalMasehi: dateUTC.toISOString().split("T")[0],
    weton: `${javaneseWeekdays[weekdayIndex]} ${pasaran[pasaranIndex]}`,
    wuku: wukuNames[wukuIndex],
    tanggalJawa: hijriDate.day,
    bulanJawa: bulanHijriyahKeJawa[hijriDate.month - 1],
    tahunJawa: javaneseYearInfo.tahunJawa,
    namaTahun: javaneseYearInfo.namaTahun,
  };
}

export function convertGregorianToJavanese(date: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const weekdays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Ahad"];
  const pasarans = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
  const wukus = [
    "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Warigagung",
    "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut",
    "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil",
    "Prangbakat", "Bala", "Wugu", "Wayang", "Kelawu", "Dukut", "Watugunung"
  ];

  // Referensi kalender Jawa: 26 Desember 1632 M = 1 Sura 1555 Jawa = Senin Pahing Wuku Sinta
  const refDate = new Date("1632-12-26T00:00:00Z");
  const deltaDays = Math.floor((date.getTime() - refDate.getTime()) / oneDay);

  const weekdayIndex = (deltaDays + 1) % 7; // Senin = 0
  const pasaranIndex = (deltaDays + 1) % 5;
  const wukuIndex = Math.floor(((deltaDays + 1) % 210 + 210) % 210 / 7) % 30;

  const absDays = calculateAbsoluteDays(date);
  const hijriDate = absoluteDaysToHijri(absDays);
  const javaneseYear = hijriDate.year + 579; // lebih akurat dibanding +512
  const namaTahunJawa = ["Alip", "Ehe", "Jimawal", "Je", "Dal", "Be", "Wawu", "Jimakir"];
  const namaTahun = namaTahunJawa[((javaneseYear - 1555 + 8) % 8)];
  const bulanJawa = bulanHijriyahKeJawa[hijriDate.month - 1];

  
  };
}

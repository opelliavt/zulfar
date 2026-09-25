import React, { useState, useEffect } from 'react';
import { Calendar, CalendarCheck, Clock, Download, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(WEDDING_DATA.dateTime.targetDateIso).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToGoogleCalendar = () => {
    // 14 Oct 2026 08:00 WIB (01:00 UTC) to 17:00 WIB (10:00 UTC)
    const title = encodeURIComponent('The Wedding of Zulfar & Natalia');
    const details = encodeURIComponent(
      'Pernikahan Zulfar Musoffa & Natalia Mega Selvi.\nLokasi: RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291.\nTerima kasih atas doa restunya!'
    );
    const location = encodeURIComponent('Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung');
    const dates = '20261014T010000Z/20261014T100000Z';
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Zulfar & Natalia Wedding//ID
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:The Wedding of Zulfar & Natalia
DESCRIPTION:Pernikahan Zulfar Musoffa & Natalia Mega Selvi di Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung.
LOCATION:RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291
DTSTART:20261014T010000Z
DTEND:20261014T100000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-zulfar-natalia.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
      {/* Background Image with warm overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING_DATA.couple.heroImage}
          alt={`${WEDDING_DATA.couple.groom.callName} & ${WEDDING_DATA.couple.bride.callName}`}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for readability and high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1916]/75 via-[#1F1916]/50 to-[#FAF7F2]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 sm:pt-24 text-center text-[#FAF7F2]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#E8D8C8] mb-3 font-medium">
          Walimatul Ursy · Undangan Pernikahan
        </p>

        <h1 className="font-serif-wedding text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#FFFDF9] mb-4 drop-shadow-md text-balance">
          {WEDDING_DATA.couple.groom.callName} &amp; {WEDDING_DATA.couple.bride.callName}
        </h1>

        <p className="font-serif-wedding italic text-lg sm:text-2xl text-[#E5C158] mb-6">
          {WEDDING_DATA.dateTime.dayName}, {WEDDING_DATA.dateTime.dateDisplay} · Tulungagung
        </p>

        {/* Holy Quote Card */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#1F1916]/60 backdrop-blur-sm border border-[#FAF7F2]/10 mb-8">
          <p className="text-xs sm:text-sm text-[#E8D8C8] italic leading-relaxed">
            {WEDDING_DATA.couple.quote}
          </p>
          <span className="inline-block mt-2 text-xs font-semibold text-[#DFBF6A] tracking-wider uppercase">
            {WEDDING_DATA.couple.quoteSource}
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 rounded-2xl bg-[#261E1A]/85 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl">
            <div className="flex flex-col items-center">
              <span className="font-mono tabular-nums text-2xl sm:text-4xl font-bold text-[#FFFDF9]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C2B2A3] mt-1">
                Hari
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-[#FAF7F2]/10">
              <span className="font-mono tabular-nums text-2xl sm:text-4xl font-bold text-[#FFFDF9]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C2B2A3] mt-1">
                Jam
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-[#FAF7F2]/10">
              <span className="font-mono tabular-nums text-2xl sm:text-4xl font-bold text-[#FFFDF9]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C2B2A3] mt-1">
                Menit
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-[#FAF7F2]/10">
              <span className="font-mono tabular-nums text-2xl sm:text-4xl font-bold text-[#DFBF6A]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C2B2A3] mt-1">
                Detik
              </span>
            </div>
          </div>
        </div>

        {/* Calendar Save Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleAddToGoogleCalendar}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF7F2] text-[#2C231E] font-medium text-xs hover:bg-[#E8D8C8] transition-colors shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B38B2B]" />
            <span>Simpan ke Google Calendar</span>
          </button>
          <button
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1F1916]/80 text-[#FAF7F2] border border-[#FAF7F2]/20 font-medium text-xs hover:bg-[#1F1916] transition-colors shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-[#DFBF6A]" />
            <span>Unduh Kalender (.ics)</span>
          </button>
        </div>
      </div>

      {/* Down indicator */}
      <div className="relative z-10 pb-6 text-center text-[#5C4336] flex flex-col items-center gap-1">
        <span className="text-xs uppercase tracking-widest text-[#7D6453]">Gulir ke bawah</span>
        <ChevronDown className="w-4 h-4 text-[#7D6453] animate-bounce" />
      </div>
    </section>
  );
};

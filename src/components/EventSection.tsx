import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const EventSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyAddress = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="acara" className="py-20 px-6 bg-[#F4EFEA] border-y border-[#E8D8C8]/70">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8C6D58] mb-2 font-semibold">
            Rangkaian Acara
          </p>
          <h2 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#2C231E] mb-4">
            Waktu &amp; Tempat Acara
          </h2>
          <p className="text-sm text-[#6B574B] leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {WEDDING_DATA.events.map((event, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8D8C8] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B38B2B]">
                    {event.subTitle}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>

                <h3 className="font-serif-wedding text-3xl font-bold text-[#2C231E] mb-4">
                  {event.title}
                </h3>

                <div className="space-y-3.5 mb-6 text-sm text-[#5C4336]">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#B38B2B] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#2C231E]">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#B38B2B] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#2C231E]">{event.time}</p>
                      {event.notes && (
                        <p className="text-xs text-[#8C6D58] mt-0.5 italic">{event.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#B38B2B] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#2C231E]">{event.venue}</p>
                      <p className="text-xs text-[#7A6455] mt-1 leading-relaxed">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#F0E6DE]">
                <a
                  href={event.mapDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3E2D24] hover:bg-[#5C4336] text-white text-xs font-medium transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => handleCopyAddress(`${event.venue}, ${event.address}`, idx)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#E8D8C8] text-[#5C4336] text-xs font-medium border border-[#E8D8C8] transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8C6D58]" />
                      <span>Salin Alamat</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Interactive Google Maps */}
        <div className="rounded-3xl overflow-hidden border border-[#E8D8C8] shadow-md bg-white">
          <div className="p-4 sm:p-6 border-b border-[#E8D8C8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif-wedding text-2xl font-bold text-[#2C231E]">
                Peta Lokasi Acara
              </h4>
              <p className="text-xs text-[#6B574B]">
                Dusun Ngampel, Desa Doroampel · Kec. Sumbergempol, Kab. Tulungagung
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Dusun+Ngampel,+Desa+Doroampel,+Kec.+Sumbergempol,+Kab.+Tulungagung"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#E8D8C8] text-[#3E2D24] font-medium text-xs border border-[#E8D8C8] transition-colors self-start sm:self-auto"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B38B2B]" />
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3 h-3 text-[#B38B2B]" />
            </a>
          </div>

          <div className="relative w-full h-72 sm:h-96 bg-[#FAF7F2]">
            <iframe
              title="Peta Lokasi Doroampel Sumbergempol Tulungagung"
              src="https://maps.google.com/maps?q=Doroampel,+Sumbergempol,+Tulungagung,+Jawa+Timur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { MailOpen, Heart, Volume2, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { romanticAudio } from '../utils/audioPlayer';

interface OpeningEnvelopeProps {
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ guestName, onOpen, isOpen }) => {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);

  const handleOpenClick = () => {
    setIsOpeningAnimation(true);
    romanticAudio.play();
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  if (isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1F1916] text-[#FAF7F2] transition-all duration-700 ${
        isOpeningAnimation ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Image with warm dark romantic scrim */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={WEDDING_DATA.couple.heroImage}
          alt={`${WEDDING_DATA.couple.groom.callName} & ${WEDDING_DATA.couple.bride.callName} Wedding`}
          className="w-full h-full object-cover object-center filter blur-xs scale-105 opacity-40 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1916]/80 via-[#261E19]/70 to-[#1F1916]/95" />
      </div>

      {/* Decorative floral/golden border container */}
      <div className="relative z-10 w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl bg-[#2C231E]/85 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl text-center flex flex-col items-center">
        {/* Subtle top ornament */}
        <div className="flex items-center gap-3 text-[#D4AF37] mb-4">
          <span className="w-8 h-[1px] bg-[#D4AF37]/50" />
          <Sparkles className="w-4 h-4 animate-pulse text-[#E5C158]" />
          <span className="w-8 h-[1px] bg-[#D4AF37]/50" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#E8D8C8]/80 mb-2 font-medium">
          The Wedding Celebration of
        </p>

        {/* Couple Names */}
        <h1 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#FDFBF7] tracking-wide mb-1 leading-tight">
          {WEDDING_DATA.couple.groom.callName} &amp; {WEDDING_DATA.couple.bride.callName}
        </h1>

        <p className="font-serif-wedding italic text-sm text-[#D4AF37] mb-6">
          {WEDDING_DATA.dateTime.dateDisplay}
        </p>

        {/* Personalized Guest Invitation Card */}
        <div className="w-full my-4 py-4 px-5 rounded-xl bg-[#FAF7F2]/10 border border-[#FAF7F2]/15 text-center">
          <p className="text-xs text-[#E8D8C8]/80 mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-lg sm:text-xl font-semibold text-[#FFFDF9] tracking-wide truncate max-w-full">
            {guestName || 'Tamu Undangan'}
          </h2>
          <p className="text-[11px] text-[#D8C3B0] mt-1 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Wax Seal Action Button */}
        <button
          onClick={handleOpenClick}
          className="group relative mt-4 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C29B38] via-[#DFBF6A] to-[#B38B2B] text-[#1F1916] font-semibold text-sm shadow-lg shadow-[#C29B38]/30 hover:shadow-xl hover:shadow-[#C29B38]/50 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <MailOpen className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Buka Undangan</span>
          <Heart className="w-3.5 h-3.5 fill-[#1F1916] text-[#1F1916]" />
        </button>

        <p className="flex items-center gap-1.5 text-[11px] text-[#C2B2A3] mt-5">
          <Volume2 className="w-3.5 h-3.5 text-[#DFBF6A]" />
          <span>Putar musik latar otomatis saat dibuka</span>
        </p>
      </div>
    </div>
  );
};

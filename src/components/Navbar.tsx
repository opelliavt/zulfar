import React from 'react';
import { Heart, Calendar, Users, MessageSquareHeart, Gift } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface NavbarProps {
  onOpenRsvp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRsvp }) => {
  return (
    <>
      {/* Desktop Top Bar (Following Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-30 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8D8C8]/60 transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            className="font-serif-wedding text-2xl font-bold tracking-wide text-[#3E2D24] hover:text-[#B38B2B] transition-colors"
          >
            {WEDDING_DATA.couple.groom.callName} &amp; {WEDDING_DATA.couple.bride.callName}
          </a>

          {/* Zone 2: Clean text navigation links (No Story / No Gallery as requested) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B574B]">
            <a href="#mempelai" className="hover:text-[#B38B2B] transition-colors">
              Mempelai
            </a>
            <a href="#acara" className="hover:text-[#B38B2B] transition-colors">
              Acara
            </a>
            <a href="#rsvp" className="hover:text-[#B38B2B] transition-colors">
              RSVP
            </a>
            <a href="#ucapan" className="hover:text-[#B38B2B] transition-colors">
              Doa Restu
            </a>
            <a href="#hadiah" className="hover:text-[#B38B2B] transition-colors">
              Hadiah
            </a>
          </nav>

          {/* Zone 3: Primary action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRsvp}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#3E2D24] hover:bg-[#5C4336] rounded-full transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              Konfirmasi RSVP
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Floating Bottom Navigation Dock */}
      <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-md px-4 py-2 rounded-2xl bg-[#261E1A]/95 text-[#FAF7F2] backdrop-blur-lg border border-[#D4AF37]/30 shadow-2xl flex items-center justify-around">
        <a
          href="#mempelai"
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#E8D8C8] hover:text-[#DFBF6A] transition-colors py-1"
        >
          <Users className="w-4 h-4" />
          <span>Mempelai</span>
        </a>
        <a
          href="#acara"
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#E8D8C8] hover:text-[#DFBF6A] transition-colors py-1"
        >
          <Calendar className="w-4 h-4" />
          <span>Acara</span>
        </a>
        <a
          href="#rsvp"
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#E8D8C8] hover:text-[#DFBF6A] transition-colors py-1"
        >
          <Heart className="w-4 h-4 text-[#DFBF6A]" />
          <span>RSVP</span>
        </a>
        <a
          href="#ucapan"
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#E8D8C8] hover:text-[#DFBF6A] transition-colors py-1"
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>Doa Restu</span>
        </a>
        <a
          href="#hadiah"
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#E8D8C8] hover:text-[#DFBF6A] transition-colors py-1"
        >
          <Gift className="w-4 h-4" />
          <span>Hadiah</span>
        </a>
      </div>
    </>
  );
};

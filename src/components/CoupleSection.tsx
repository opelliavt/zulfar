import React from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <section id="mempelai" className="py-20 px-6 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8C6D58] mb-2 font-semibold">
          Pasangan Mempelai
        </p>
        <h2 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#2C231E] mb-4">
          Mempelai yang Berbahagia
        </h2>
        <p className="text-sm text-[#6B574B] leading-relaxed">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho-Nya, kami bermaksud menyelenggarakan pernikahan kami:
        </p>
      </div>

      {/* Couple Showcase Grid (Clean Monogram Medallions without human photos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start relative">
        {/* Decorative Center Ampersand */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-md items-center justify-center">
          <span className="font-script-wedding text-3xl text-[#B38B2B] leading-none pt-1">&amp;</span>
        </div>

        {/* Groom Card */}
        <div className="flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E8D8C8] shadow-sm hover:shadow-md transition-shadow">
          {/* Royal Monogram Medallion */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#F5EFE6] via-[#E8D8C8] to-[#D8C3B0] border-2 border-[#D4AF37]/50 shadow-inner flex items-center justify-center mb-6">
            <span className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#5C4336] tracking-wider">
              {groom.initial}
            </span>
          </div>

          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#2C231E] mb-1">
            {groom.fullName}
          </h3>
          <p className="text-sm font-semibold text-[#B38B2B] mb-5">
            - {groom.callName} -
          </p>

          <div className="w-full pt-5 border-t border-[#F0E6DE] text-sm text-[#6B574B] space-y-1">
            <p className="text-xs uppercase tracking-wider text-[#8C6D58] font-medium">Putra dari:</p>
            <p className="text-base font-semibold text-[#2C231E]">{groom.father}</p>
          </div>
        </div>

        {/* Bride Card */}
        <div className="flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E8D8C8] shadow-sm hover:shadow-md transition-shadow">
          {/* Royal Monogram Medallion */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#F5EFE6] via-[#E8D8C8] to-[#D8C3B0] border-2 border-[#D4AF37]/50 shadow-inner flex items-center justify-center mb-6">
            <span className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#5C4336] tracking-wider">
              {bride.initial}
            </span>
          </div>

          <h3 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-[#2C231E] mb-1">
            {bride.fullName}
          </h3>
          <p className="text-sm font-semibold text-[#B38B2B] mb-5">
            - {bride.callName} -
          </p>

          <div className="w-full pt-5 border-t border-[#F0E6DE] text-sm text-[#6B574B] space-y-1">
            <p className="text-xs uppercase tracking-wider text-[#8C6D58] font-medium">Putri dari:</p>
            <p className="text-base font-semibold text-[#2C231E]">{bride.father}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

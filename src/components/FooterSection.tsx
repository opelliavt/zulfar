import React, { useState } from 'react';
import { Heart, Share2, Copy, Check, MessageCircle, ExternalLink, Instagram } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const FooterSection: React.FC = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [customGuestName, setCustomGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const getGeneratedUrl = () => {
    if (typeof window === 'undefined') return '';
    const cleanPath = window.location.pathname.replace(/\/+$/, '');
    const pathWithSlug = cleanPath.includes('/zulfarnatalia') ? cleanPath : '/zulfarnatalia';
    const baseUrl = `${window.location.origin}${pathWithSlug}`;
    if (!customGuestName.trim()) return baseUrl;
    return `${baseUrl}?to=${encodeURIComponent(customGuestName.trim())}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getGeneratedUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `Kepada Yth. ${customGuestName || 'Bapak/Ibu/Saudara/i'},\n\nTanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri acara pernikahan kami:\n\n*The Wedding of Zulfar & Natalia*\nRabu, 14 Oktober 2026\nRT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung\n\nInfo lengkap & konfirmasi kehadiran (RSVP):\n${getGeneratedUrl()}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <footer className="pt-20 pb-28 sm:pb-16 px-6 bg-[#261E1A] text-[#FAF7F2] border-t border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Warm Closing Expression */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3 font-semibold">
          Ungkapan Terima Kasih
        </p>

        <h3 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#FFFDF9] mb-4">
          {WEDDING_DATA.couple.groom.callName} &amp; {WEDDING_DATA.couple.bride.callName}
        </h3>

        <p className="text-xs sm:text-sm text-[#C2B2A3] max-w-lg mx-auto leading-relaxed mb-8">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami.
        </p>

        <div className="text-xs text-[#E8D8C8] space-y-1 mb-10 pb-8 border-b border-[#FAF7F2]/10">
          <p className="font-semibold text-[#DFBF6A]">Kami yang berbahagia,</p>
          <p>Keluarga Besar Bpk. Zaenudin Luthfie</p>
          <p>Keluarga Besar Bpk. Sujud Hariyono</p>
        </div>

        {/* Generate Custom Guest Invitation Tool */}
        <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#1F1916]/80 border border-[#FAF7F2]/10 mb-8 max-w-md w-full text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#DFBF6A] flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan Undangan Personal</span>
            </span>
          </div>
          <p className="text-[11px] text-[#A6978A] mb-3">
            Buat tautan undangan khusus untuk nama tamu tertentu dan bagikan langsung lewat WhatsApp.
          </p>

          <div className="space-y-2">
            <input
              type="text"
              value={customGuestName}
              onChange={(e) => setCustomGuestName(e.target.value)}
              placeholder="Ketik Nama Tamu (Contoh: Budi Santoso)"
              className="w-full px-3 py-2 rounded-xl bg-[#2C231E] border border-[#FAF7F2]/20 text-xs text-[#FFFDF9] focus:outline-none focus:ring-1 focus:ring-[#DFBF6A]"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#E8D8C8] text-[#1F1916] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Minimalist Footnote & Creator Credits */}
        <div className="flex flex-col items-center justify-center gap-3 pt-6 border-t border-[#FAF7F2]/10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#A6978A]">
            <span>The Wedding of {WEDDING_DATA.couple.groom.callName} &amp; {WEDDING_DATA.couple.bride.callName} · 2026</span>
            <span className="hidden sm:inline">·</span>
            <span>Dibuat dengan cinta &amp; doa restu</span>
          </div>

          {/* Credits: Irham Ibrohim */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1412] border border-[#D4AF37]/30 text-xs shadow-sm">
            <span className="text-[#C2B2A3]">Crafted with passion by</span>
            <span className="font-semibold text-[#DFBF6A]">Irham Ibrohim</span>
            <span className="text-[#6B574B]">|</span>
            <a
              href="https://instagram.com/irhamibra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#DFBF6A] hover:text-[#FFFDF9] font-medium transition-colors group"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C] group-hover:scale-110 transition-transform" />
              <span>@irhamibra</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

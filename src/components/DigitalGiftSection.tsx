import React, { useState } from 'react';
import { Gift, Copy, Check, Smartphone, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const DigitalGiftSection: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${WEDDING_DATA.giftAddress.recipient}, ${WEDDING_DATA.giftAddress.address} (Telp: ${WEDDING_DATA.giftAddress.phone})`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="hadiah" className="py-20 px-6 bg-[#F4EFEA] border-t border-[#E8D8C8]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8C6D58] mb-2 font-semibold">
            Tanda Kasih
          </p>
          <h2 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#2C231E] mb-4">
            Amplop Digital &amp; Kado
          </h2>
          <p className="text-sm text-[#6B574B] leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyampaikannya melalui dompet digital (DANA) atau pengiriman kado:
          </p>
        </div>

        {/* DANA Digital Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* DANA Zulfar Card */}
          <div className="p-7 rounded-3xl bg-white border border-[#E8D8C8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span>DANA</span>
                </span>
                <span className="text-xs font-semibold text-[#8C6D58]">Mempelai Pria</span>
              </div>

              <p className="text-xs text-[#8C6D58] mb-1">Nomor Akun DANA:</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono tabular-nums text-2xl font-bold text-[#2C231E] tracking-wide">
                  085641148050
                </span>
              </div>
              <p className="text-xs font-medium text-[#5C4336]">
                a.n. Zulfar Musoffa
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#F0E6DE]">
              <button
                onClick={() => handleCopyAccount('085641148050')}
                className="w-full py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8D8C8] text-xs font-semibold text-[#5C4336] border border-[#E8D8C8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedAccount === '085641148050' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Nomor DANA Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8C6D58]" />
                    <span>Salin No. DANA Zulfar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* DANA Natalia Card */}
          <div className="p-7 rounded-3xl bg-white border border-[#E8D8C8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span>DANA</span>
                </span>
                <span className="text-xs font-semibold text-[#8C6D58]">Mempelai Wanita</span>
              </div>

              <p className="text-xs text-[#8C6D58] mb-1">Nomor Akun DANA:</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono tabular-nums text-2xl font-bold text-[#2C231E] tracking-wide">
                  085749941304
                </span>
              </div>
              <p className="text-xs font-medium text-[#5C4336]">
                a.n. Natalia Mega Selvi
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#F0E6DE]">
              <button
                onClick={() => handleCopyAccount('085749941304')}
                className="w-full py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8D8C8] text-xs font-semibold text-[#5C4336] border border-[#E8D8C8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedAccount === '085749941304' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Nomor DANA Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8C6D58]" />
                    <span>Salin No. DANA Natalia</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Physical Gift Delivery Option */}
        <div className="max-w-2xl mx-auto p-6 sm:p-7 rounded-3xl bg-white border border-[#E8D8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8] flex items-center justify-center text-[#B38B2B] shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#2C231E]">Kirim Kado Fisik</h4>
              <p className="text-xs text-[#8C6D58] leading-relaxed">
                RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyAddress}
            className="px-5 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8D8C8] text-[#5C4336] border border-[#E8D8C8] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {copiedAddress ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Alamat Tersalin!
              </span>
            ) : (
              'Salin Alamat Kado'
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

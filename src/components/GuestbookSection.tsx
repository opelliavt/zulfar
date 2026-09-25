import React, { useState } from 'react';
import { Send, Heart, MessageSquareHeart, Check, Search, Sparkles, ShieldCheck } from 'lucide-react';
import { GuestWish, PRESET_PRAYERS } from '../data/weddingData';

interface GuestbookSectionProps {
  wishes: GuestWish[];
  onAddWish: (name: string, message: string, attendance: 'hadir' | 'ragu' | 'tidak_hadir') => void;
  onToggleLike: (wishId: string) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  wishes,
  onAddWish,
  onToggleLike,
}) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [selectedPrayer, setSelectedPrayer] = useState(PRESET_PRAYERS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttendance, setFilterAttendance] = useState<'all' | 'hadir' | 'tidak_hadir'>('all');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddWish(name.trim(), selectedPrayer, attendance);
    setName('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3000);
  };

  const filteredWishes = wishes.filter((wish) => {
    const matchesSearch =
      wish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterAttendance === 'all' ? true : wish.attendance === filterAttendance;
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="ucapan" className="py-20 px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8C6D58] mb-2 font-semibold">
          Untaian Doa Restu
        </p>
        <h2 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#2C231E] mb-4">
          Doa Restu Tamu Undangan
        </h2>
        <p className="text-sm text-[#6B574B] leading-relaxed">
          Sematkan doa tulus untuk mengiringi awal babak baru kehidupan kedua mempelai.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Wish Form (Col 2) - Fixed Preset Prayers to prevent misuse */}
        <div className="md:col-span-2 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8D8C8] shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F0E6DE]">
            <MessageSquareHeart className="w-5 h-5 text-[#B38B2B]" />
            <h3 className="font-serif-wedding text-2xl font-bold text-[#2C231E]">
              Kirim Doa Restu
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336] mb-1.5">
                Nama Anda *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda / Keluarga"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-xs sm:text-sm text-[#2C231E] focus:outline-none focus:ring-2 focus:ring-[#B38B2B]/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336] mb-1.5">
                Status Kehadiran
              </label>
              <select
                value={attendance}
                onChange={(e) =>
                  setAttendance(e.target.value as 'hadir' | 'ragu' | 'tidak_hadir')
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-xs sm:text-sm text-[#2C231E] focus:outline-none focus:ring-2 focus:ring-[#B38B2B]/40"
              >
                <option value="hadir">Akan Hadir</option>
                <option value="ragu">Masih Ragu</option>
                <option value="tidak_hadir">Berhalangan Hadir</option>
              </select>
            </div>

            {/* Curated Preset Prayers (Default: Barakallahu lakuma) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336]">
                  Pilih Untaian Doa Restu
                </label>
                <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Doa Berkah</span>
                </span>
              </div>
              <div className="space-y-2">
                {PRESET_PRAYERS.map((prayer, idx) => (
                  <label
                    key={idx}
                    className={`block p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedPrayer === prayer
                        ? 'bg-[#FAF7F2] border-[#B38B2B] text-[#2C231E] font-medium shadow-xs'
                        : 'bg-white border-[#E8D8C8] text-[#6B574B] hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="prayerChoice"
                        value={prayer}
                        checked={selectedPrayer === prayer}
                        onChange={() => setSelectedPrayer(prayer)}
                        className="mt-0.5"
                      />
                      <span className="leading-relaxed">{prayer}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#3E2D24] hover:bg-[#5C4336] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sematkan Doa Restu</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            {justSubmitted && (
              <p className="text-center text-xs text-emerald-700 font-medium flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Doa restu berhasil disematkan!</span>
              </p>
            )}
          </form>
        </div>

        {/* Wishes Feed (Col 3) */}
        <div className="md:col-span-3 flex flex-col space-y-4">
          {/* Controls: Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#8C6D58] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama pengirim..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E8D8C8] text-xs text-[#2C231E] focus:outline-none focus:ring-2 focus:ring-[#B38B2B]/30"
              />
            </div>

            {/* Filter buttons */}
            <div className="inline-flex items-center gap-1 p-1 bg-white border border-[#E8D8C8] rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setFilterAttendance('all')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  filterAttendance === 'all'
                    ? 'bg-[#3E2D24] text-white'
                    : 'text-[#6B574B] hover:text-[#2C231E]'
                }`}
              >
                Semua ({wishes.length})
              </button>
              <button
                onClick={() => setFilterAttendance('hadir')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  filterAttendance === 'hadir'
                    ? 'bg-[#3E2D24] text-white'
                    : 'text-[#6B574B] hover:text-[#2C231E]'
                }`}
              >
                Hadir
              </button>
              <button
                onClick={() => setFilterAttendance('tidak_hadir')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  filterAttendance === 'tidak_hadir'
                    ? 'bg-[#3E2D24] text-white'
                    : 'text-[#6B574B] hover:text-[#2C231E]'
                }`}
              >
                Berhalangan
              </button>
            </div>
          </div>

          {/* Wishes List (Scrollable box) */}
          <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-1">
            {filteredWishes.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white border border-[#E8D8C8] text-xs text-[#8C6D58]">
                Belum ada doa restu yang sesuai dengan filter.
              </div>
            ) : (
              filteredWishes.map((wish) => (
                <div
                  key={wish.id}
                  className="p-5 rounded-2xl bg-white border border-[#E8D8C8] shadow-xs hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-semibold text-sm text-[#2C231E] flex items-center gap-2">
                        <span>{wish.name}</span>
                        {wish.attendance === 'hadir' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Hadir
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#8C6D58] mt-0.5">
                        <span>{wish.date}</span>
                      </div>
                    </div>

                    {/* Like / Love Reaction Button */}
                    <button
                      onClick={() => onToggleLike(wish.id)}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        wish.isLikedByUser
                          ? 'bg-rose-50 text-rose-600 border border-rose-200 font-semibold'
                          : 'bg-[#FAF7F2] text-[#8C6D58] hover:text-rose-500 border border-[#E8D8C8]'
                      }`}
                      aria-label="Aamiin / Suka doa ini"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wish.isLikedByUser ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                      <span className="font-mono tabular-nums">{wish.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C4336] leading-relaxed whitespace-pre-line italic">
                    "{wish.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

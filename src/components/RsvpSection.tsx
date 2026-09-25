import React, { useState } from 'react';
import { CheckCircle2, Heart, Users, Calendar, Phone, UserCheck, AlertCircle, FileSpreadsheet, Download, X } from 'lucide-react';
import { RsvpEntry, PRESET_PRAYERS } from '../data/weddingData';

interface RsvpSectionProps {
  initialGuestName?: string;
  onNewWishSubmit?: (name: string, message: string, attendance: 'hadir' | 'ragu' | 'tidak_hadir') => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ initialGuestName = '', onNewWishSubmit }) => {
  const [name, setName] = useState(initialGuestName);
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);

  const defaultPrayer = PRESET_PRAYERS[0]; // 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair...'

  // Load existing RSVPs from localStorage
  const getStoredRsvps = (): RsvpEntry[] => {
    try {
      const data = localStorage.getItem('wedding_rsvps');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const [allRsvps, setAllRsvps] = useState<RsvpEntry[]>(getStoredRsvps);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Mohon isi nama lengkap Anda.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim() || '-',
      attendance,
      guestCount: attendance === 'hadir' ? guestCount : 0,
      notes: defaultPrayer,
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };

    setTimeout(() => {
      const updated = [newRsvp, ...allRsvps];
      setAllRsvps(updated);
      try {
        localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to store rsvp in localStorage', err);
      }

      // Automatically add default prayer wish to Guestbook
      if (onNewWishSubmit) {
        onNewWishSubmit(name.trim(), defaultPrayer, attendance);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleExportCsv = () => {
    if (allRsvps.length === 0) return;
    const headers = ['ID', 'Nama', 'No HP', 'Kehadiran', 'Jumlah Tamu', 'Doa Restu', 'Waktu Submit'];
    const rows = allRsvps.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.attendance,
      r.guestCount,
      `"${(r.notes || defaultPrayer).replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap-rsvp-zulfar-natalia-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const totalAttendingGuests = allRsvps
    .filter((r) => r.attendance === 'hadir')
    .reduce((sum, r) => sum + (r.guestCount || 1), 0);
  const totalResponses = allRsvps.length;

  return (
    <section id="rsvp" className="py-20 px-6 bg-[#F4EFEA] border-t border-[#E8D8C8]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8C6D58] mb-2 font-semibold">
            Konfirmasi Kehadiran
          </p>
          <h2 className="font-serif-wedding text-4xl sm:text-5xl font-bold text-[#2C231E] mb-4">
            Formulir RSVP
          </h2>
          <p className="text-sm text-[#6B574B] leading-relaxed">
            Guna mempersiapkan jamuan terbaik untuk Anda, mohon berkenan mengonfirmasi kehadiran Anda.
          </p>
        </div>

        {/* RSVP Card Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8D8C8] shadow-md relative">
          {isSubmitted ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-wedding text-3xl font-bold text-[#2C231E] mb-2">
                Terima Kasih, {name}!
              </h3>
              <p className="text-sm text-[#6B574B] max-w-md mx-auto mb-6">
                Konfirmasi kehadiran Anda telah berhasil kami catat. 
                {attendance === 'hadir'
                  ? ' Kami sangat menantikan kehadiran dan kehangatan Anda di hari bahagia kami.'
                  : ' Terima kasih telah mengabari kami serta doa tulus yang Anda berikan.'}
              </p>

              <div className="inline-flex items-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#E8D8C8] text-[#5C4336] text-xs font-semibold border border-[#E8D8C8] transition-colors cursor-pointer"
                >
                  Edit / Kirim Ulang Konfirmasi
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336] mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-sm text-[#2C231E] focus:outline-none focus:ring-2 focus:ring-[#B38B2B]/40 focus:border-[#B38B2B] transition-colors"
                />
              </div>

              {/* WhatsApp / Phone field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336] mb-2">
                  Nomor WhatsApp / HP (Opsional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C6D58] absolute left-4 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8] text-sm text-[#2C231E] focus:outline-none focus:ring-2 focus:ring-[#B38B2B]/40 focus:border-[#B38B2B] transition-colors"
                  />
                </div>
              </div>

              {/* Attendance confirmation options */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336] mb-3">
                  Konfirmasi Kehadiran *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      attendance === 'hadir'
                        ? 'bg-[#3E2D24] text-white border-[#3E2D24]'
                        : 'bg-[#FAF7F2] text-[#5C4336] border-[#E8D8C8] hover:border-[#B38B2B]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="hadir"
                      checked={attendance === 'hadir'}
                      onChange={() => setAttendance('hadir')}
                      className="sr-only"
                    />
                    <UserCheck className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold">Hadir</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      attendance === 'ragu'
                        ? 'bg-[#3E2D24] text-white border-[#3E2D24]'
                        : 'bg-[#FAF7F2] text-[#5C4336] border-[#E8D8C8] hover:border-[#B38B2B]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="ragu"
                      checked={attendance === 'ragu'}
                      onChange={() => setAttendance('ragu')}
                      className="sr-only"
                    />
                    <Users className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold">Masih Ragu</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      attendance === 'tidak_hadir'
                        ? 'bg-[#3E2D24] text-white border-[#3E2D24]'
                        : 'bg-[#FAF7F2] text-[#5C4336] border-[#E8D8C8] hover:border-[#B38B2B]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="tidak_hadir"
                      checked={attendance === 'tidak_hadir'}
                      onChange={() => setAttendance('tidak_hadir')}
                      className="sr-only"
                    />
                    <Heart className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold">Tidak Hadir</span>
                  </label>
                </div>
              </div>

              {/* Conditional field if Attending: Jumlah Tamu only */}
              {attendance === 'hadir' && (
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8]">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4336] mb-2">
                    Jumlah Tamu yang Hadir
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8D8C8] text-sm text-[#2C231E] focus:outline-none focus:ring-2 focus:ring-[#B38B2B]/40"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              )}

              {/* Default Blessed Prayer Notice (Prevents Form Misuse) */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58] mb-1.5">
                  Doa Restu Untuk Mempelai:
                </p>
                <p className="text-xs sm:text-sm text-[#3E2D24] italic leading-relaxed">
                  "{defaultPrayer}"
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#3E2D24] hover:bg-[#5C4336] text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Menyimpan Konfirmasi...</span>
                ) : (
                  <>
                    <span>Kirim Konfirmasi Kehadiran</span>
                    <Heart className="w-4 h-4 fill-white" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Organizer / Admin RSVP summary trigger */}
          <div className="mt-8 pt-4 border-t border-[#F0E6DE] flex items-center justify-between text-xs text-[#8C6D58]">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{totalResponses} konfirmasi masuk ({totalAttendingGuests} tamu hadir)</span>
            </span>

            <button
              onClick={() => setShowAdminModal(true)}
              className="inline-flex items-center gap-1 hover:text-[#2C231E] underline cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Rekap Tamu Undangan</span>
            </button>
          </div>
        </div>

        {/* Modal Rekap Tamu RSVP */}
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8D8C8] max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C8]">
                <div>
                  <h4 className="font-serif-wedding text-2xl font-bold text-[#2C231E]">
                    Rekapitulasi Kehadiran RSVP
                  </h4>
                  <p className="text-xs text-[#6B574B]">
                    Data tersimpan di browser (Offline &amp; Cloudflare ready)
                  </p>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="block text-xl font-bold text-emerald-700 font-mono tabular-nums">
                    {totalAttendingGuests}
                  </span>
                  <span className="text-[11px] text-emerald-800">Total Tamu Hadir</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <span className="block text-xl font-bold text-amber-700 font-mono tabular-nums">
                    {allRsvps.filter((r) => r.attendance === 'ragu').length}
                  </span>
                  <span className="text-[11px] text-amber-800">Masih Ragu</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="block text-xl font-bold text-slate-700 font-mono tabular-nums">
                    {allRsvps.filter((r) => r.attendance === 'tidak_hadir').length}
                  </span>
                  <span className="text-[11px] text-slate-800">Tidak Hadir</span>
                </div>
              </div>

              {/* RSVP Table / List */}
              <div className="overflow-y-auto flex-1 my-2 border border-[#E8D8C8] rounded-xl">
                {allRsvps.length === 0 ? (
                  <p className="p-6 text-center text-xs text-[#8C6D58]">
                    Belum ada data RSVP baru yang tersimpan di perangkat ini.
                  </p>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-[#5C4336] sticky top-0 border-b border-[#E8D8C8]">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">Nama Tamu</th>
                        <th className="py-2.5 px-3 font-semibold">Status</th>
                        <th className="py-2.5 px-3 font-semibold">Porsi</th>
                        <th className="py-2.5 px-3 font-semibold">Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0E6DE]">
                      {allRsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-[#FAF7F2]/50">
                          <td className="py-2 px-3 font-medium text-[#2C231E]">
                            <div>{rsvp.name}</div>
                            {rsvp.phone && rsvp.phone !== '-' && (
                              <div className="text-[10px] text-slate-400">{rsvp.phone}</div>
                            )}
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                                rsvp.attendance === 'hadir'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : rsvp.attendance === 'ragu'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {rsvp.attendance === 'hadir' ? 'Hadir' : rsvp.attendance === 'ragu' ? 'Ragu' : 'Tidak Hadir'}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono tabular-nums">
                            {rsvp.attendance === 'hadir' ? `${rsvp.guestCount} org` : '-'}
                          </td>
                          <td className="py-2 px-3 text-[#6B574B] text-[11px]">
                            {rsvp.submittedAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Export Button */}
              <div className="pt-4 border-t border-[#E8D8C8] flex justify-end gap-2">
                <button
                  onClick={handleExportCsv}
                  disabled={allRsvps.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3E2D24] text-white text-xs font-semibold hover:bg-[#5C4336] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File Excel/CSV</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

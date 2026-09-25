export interface WeddingEvent {
  title: string;
  subTitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
  notes?: string;
}

export interface GuestWish {
  id: string;
  name: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  message: string;
  date: string;
  likes: number;
  isLikedByUser?: boolean;
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  guestCount: number;
  notes?: string;
  submittedAt: string;
}

export const PRESET_PRAYERS = [
  'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair (Semoga Allah memberkahi kalian dan menghimpun kalian berdua dalam kebaikan).',
  'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, serta dianugerahi keturunan yang saleh dan salehah.',
  'Selamat menempuh hidup baru untuk Zulfar & Natalia. Semoga senantiasa rukun, harmonis, dan bahagia hingga akhir hayat.',
  'Semoga ikatan pernikahan ini menjadi jalan menuju keberkahan dan kebahagiaan dunia hingga akhirat.'
];

export const WEDDING_DATA = {
  couple: {
    groom: {
      fullName: 'Zulfar Musoffa',
      callName: 'Zulfar',
      initial: 'Z',
      father: 'Bpk. Zaenudin Luthfie',
      parentInfo: 'Putra dari Bpk. Zaenudin Luthfie',
      instagram: 'https://instagram.com',
    },
    bride: {
      fullName: 'Natalia Mega Selvi',
      callName: 'Natalia',
      initial: 'N',
      father: 'Bpk. Sujud Hariyono',
      parentInfo: 'Putri dari Bpk. Sujud Hariyono',
      instagram: 'https://instagram.com',
    },
    heroImage: '/src/assets/images/wedding_floral_bg_1790340695740.jpg',
    quote: '"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."',
    quoteSource: 'QS. Ar-Rum: 21',
  },

  audio: {
    // Masukkan URL link MP3 lagu pilihan Anda di sini (misal dari Google Drive/hosting/CDN/cloud)
    // Jika dibiarkan kosong (''), sistem otomatis memainkan alunan piano akustik romantis bawaan.
    url: '', 
    title: 'Melodi Romantis Pernikahan',
  },
  
  dateTime: {
    targetDateIso: '2026-10-14T08:00:00+07:00', // Rabu, 14 Oktober 2026
    dayName: 'Rabu',
    dateDisplay: '14 Oktober 2026',
    timeZone: 'WIB',
  },

  events: [
    {
      title: 'Akad Nikah',
      subTitle: 'Ikrar Suci & Ijab Qabul',
      date: 'Rabu, 14 Oktober 2026',
      time: '08.00 - 10.00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Doroampel,+Sumbergempol,+Tulungagung,+Jawa+Timur&t=&z=15&ie=UTF8&iwloc=&output=embed',
      mapDirectionUrl: 'https://maps.google.com/?q=Dusun+Ngampel,+Desa+Doroampel,+Kec.+Sumbergempol,+Kab.+Tulungagung',
      notes: 'Khusus keluarga besar dan kerabat terdekat'
    },
    {
      title: 'Resepsi Pernikahan',
      subTitle: 'Syukuran & Ramah Tamah',
      date: 'Rabu, 14 Oktober 2026',
      time: '10.00 WIB - Selesai',
      venue: 'Kediaman Mempelai Wanita',
      address: 'RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Doroampel,+Sumbergempol,+Tulungagung,+Jawa+Timur&t=&z=15&ie=UTF8&iwloc=&output=embed',
      mapDirectionUrl: 'https://maps.google.com/?q=Dusun+Ngampel,+Desa+Doroampel,+Kec.+Sumbergempol,+Kab.+Tulungagung',
      notes: 'Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan kehormatan bagi kami'
    }
  ] as WeddingEvent[],

  digitalGifts: [
    {
      type: 'dana',
      appName: 'DANA',
      accountNumber: '085641148050',
      accountHolder: 'Zulfar Musoffa',
      colorBadge: 'bg-sky-500'
    },
    {
      type: 'dana',
      appName: 'DANA',
      accountNumber: '085749941304',
      accountHolder: 'Natalia Mega Selvi',
      colorBadge: 'bg-sky-500'
    }
  ],

  giftAddress: {
    recipient: 'Natalia Mega Selvi / Zulfar Musoffa',
    phone: '0857-4994-1304 / 0856-4114-8050',
    address: 'RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291'
  },

  initialWishes: [
    {
      id: 'w-1',
      name: 'Keluarga Besar Bpk. Ahmad',
      attendance: 'hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair. Selamat menempuh hidup baru untuk Zulfar & Natalia.',
      date: 'Baru saja',
      likes: 12
    },
    {
      id: 'w-2',
      name: 'Sahabat Tulungagung',
      attendance: 'hadir',
      message: 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, serta senantiasa dalam limpahan berkah Allah SWT.',
      date: '2 jam lalu',
      likes: 8
    },
    {
      id: 'w-3',
      name: 'Keluarga Sumbergempol',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru untuk Zulfar & Natalia. Semoga senantiasa rukun, harmonis, dan bahagia hingga akhir hayat.',
      date: 'Kemarin',
      likes: 15
    }
  ] as GuestWish[]
};

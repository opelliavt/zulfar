import heroFloralBg from '../assets/images/wedding_floral_bg_1790340695740.jpg';
import weddingSong from '../assets/audio/akad_payung-teduh.mp3';

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
      instagram: 'zulfaru',
      instagramUrl: 'https://instagram.com/zulfaru',
    },
    bride: {
      fullName: 'Natalia Mega Selvi',
      callName: 'Natalia',
      initial: 'N',
      father: 'Bpk. Sujud Hariyono',
      parentInfo: 'Putri dari Bpk. Sujud Hariyono',
      instagram: 'Nataliaselvi07',
      instagramUrl: 'https://instagram.com/Nataliaselvi07',
    },
    heroImage: heroFloralBg,
    quote: '"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."',
    quoteSource: 'QS. Ar-Rum: 21',
  },

  audio: {
    url: weddingSong, 
    title: 'Akad - Payung Teduh',
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
      mapEmbedUrl: 'https://maps.google.com/maps?q=-8.104439,111.932977&t=&z=18&ie=UTF8&iwloc=&output=embed',
      mapDirectionUrl: 'https://www.google.com/maps/search/?api=1&query=-8.104439,111.932977',
      notes: 'Keluarga besar dan kerabat terdekat'
    },
    {
      title: 'Resepsi Pernikahan',
      subTitle: 'Syukuran & Ramah Tamah',
      date: 'Rabu, 14 Oktober 2026',
      time: '10.00 WIB - Selesai',
      venue: 'Kediaman Mempelai Wanita',
      address: 'RT 03 RW 02, Dusun Ngampel, Desa Doroampel, Kec. Sumbergempol, Kab. Tulungagung, Jawa Timur 66291',
      mapEmbedUrl: 'https://maps.google.com/maps?q=-8.104439,111.932977&t=&z=18&ie=UTF8&iwloc=&output=embed',
      mapDirectionUrl: 'https://www.google.com/maps/search/?api=1&query=-8.104439,111.932977',
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
      name: 'Keluarga Besar Bpk. Junaidi Sujiroh',
      attendance: 'hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair. Selamat menempuh hidup baru untuk Zulfar & Natalia.',
      date: 'Baru saja',
      likes: 1294
    },
    {
      id: 'w-2',
      name: 'Salman Al Farisi',
      attendance: 'hadir',
      message: 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, serta senantiasa dalam limpahan berkah Allah SWT.',
      date: '2 jam lalu',
      likes: 8
    },
    {
      id: 'w-3',
      name: 'Rizal Kia Rifai',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru untuk Zulfar & Natalia. Semoga senantiasa rukun, harmonis, dan bahagia hingga akhir hayat.',
      date: 'Kemarin',
      likes: 15
    }
  ] as GuestWish[]
};

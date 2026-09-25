/**
 * The Wedding of Zulfar & Natalia
 * Romantic Digital Wedding Invitation
 * Production-ready, lightweight & optimized for Cloudflare Pages
 */

import React, { useState, useEffect } from 'react';
import { WEDDING_DATA, GuestWish } from './data/weddingData';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { EventSection } from './components/EventSection';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookSection } from './components/GuestbookSection';
import { DigitalGiftSection } from './components/DigitalGiftSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');

  // Read guest name from query param (e.g., ?to=Bapak+Budi+%26+Keluarga)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const toParam = searchParams.get('to') || searchParams.get('name') || searchParams.get('guest');
      if (toParam && toParam.trim()) {
        setGuestName(toParam.trim());
      }
    } catch {
      // Fallback
    }
  }, []);

  // Guestbook Wishes state with localStorage persistence
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const localData = localStorage.getItem('wedding_guest_wishes');
      if (localData) {
        return JSON.parse(localData);
      }
    } catch {
      // ignore
    }
    return WEDDING_DATA.initialWishes;
  });

  // Track which wishes user has liked
  const [likedWishIds, setLikedWishIds] = useState<string[]>(() => {
    try {
      const localLikes = localStorage.getItem('wedding_liked_wishes');
      return localLikes ? JSON.parse(localLikes) : [];
    } catch {
      return [];
    }
  });

  const handleAddWish = (
    name: string,
    message: string,
    attendance: 'hadir' | 'ragu' | 'tidak_hadir'
  ) => {
    const newWish: GuestWish = {
      id: `w-${Date.now()}`,
      name,
      message,
      attendance,
      date: 'Baru saja',
      likes: 1,
      isLikedByUser: true,
    };

    setWishes((prev) => {
      const updated = [newWish, ...prev];
      try {
        localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save wish', err);
      }
      return updated;
    });

    setLikedWishIds((prev) => {
      const updated = [...prev, newWish.id];
      try {
        localStorage.setItem('wedding_liked_wishes', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleToggleLike = (wishId: string) => {
    const alreadyLiked = likedWishIds.includes(wishId);
    const updatedLiked = alreadyLiked
      ? likedWishIds.filter((id) => id !== wishId)
      : [...likedWishIds, wishId];

    setLikedWishIds(updatedLiked);
    try {
      localStorage.setItem('wedding_liked_wishes', JSON.stringify(updatedLiked));
    } catch {
      // ignore
    }

    setWishes((prev) => {
      const updated = prev.map((item) => {
        if (item.id === wishId) {
          return {
            ...item,
            likes: Math.max(0, item.likes + (alreadyLiked ? -1 : 1)),
            isLikedByUser: !alreadyLiked,
          };
        }
        return item;
      });
      try {
        localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleOpenRsvpScroll = () => {
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2724] relative selection:bg-[#E8D8C8] selection:text-[#5C3D2E]">
      {/* Opening Envelope Screen */}
      <OpeningEnvelope
        guestName={guestName}
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
      />

      {/* Main Website Structure */}
      {isEnvelopeOpen && (
        <div className="animate-fade-in transition-opacity duration-700">
          {/* Top Bar Navigation */}
          <Navbar onOpenRsvp={handleOpenRsvpScroll} />

          {/* Main Content Sections */}
          <main>
            {/* 1. Hero & Live Countdown */}
            <HeroSection />

            {/* 2. Couple Details (Clean Monogram, no photos or bio descriptions) */}
            <CoupleSection />

            {/* 3. Event Schedule & Interactive Google Map */}
            <EventSection />

            {/* 4. RSVP Confirmation Form (without session and using default blessed prayer) */}
            <RsvpSection
              initialGuestName={guestName !== 'Tamu Undangan' ? guestName : ''}
              onNewWishSubmit={handleAddWish}
            />

            {/* 5. Guestbook & Doa Restu (Protected with default prayers to prevent misuse) */}
            <GuestbookSection
              wishes={wishes}
              onAddWish={handleAddWish}
              onToggleLike={handleToggleLike}
            />

            {/* 6. Digital Gift & Cashless Envelope (DANA) */}
            <DigitalGiftSection />
          </main>

          {/* 7. Footer & Personalized Invitation Sharing */}
          <FooterSection />

          {/* Floating Audio Music Player */}
          <AudioPlayerFloating />
        </div>
      )}
    </div>
  );
}

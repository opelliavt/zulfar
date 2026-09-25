import React, { useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

export const AudioPlayerFloating: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(romanticAudio.isPlaying());
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.toggle();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      romanticAudio.setVolume(0.5);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2">
      {/* Tooltip / Status Badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F1916]/90 text-[#FAF7F2] text-xs shadow-md border border-[#D4AF37]/30 backdrop-blur-md animate-fade-in">
          <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Canon in D · Acoustic Piano</span>
          <button
            onClick={handleToggleMute}
            className="p-1 hover:text-[#D4AF37] transition-colors"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Floating Vinyl Button */}
      <button
        onClick={handleTogglePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2C231E] border-2 border-[#D4AF37] shadow-xl text-[#FDFBF7] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Vinyl Grooves Background */}
        <div
          className={`absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/40 ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        />

        {/* Center icon */}
        <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1F1916] flex items-center justify-center border border-[#D4AF37]/60">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-[#DFBF6A]" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#DFBF6A] ml-0.5" />
          )}
        </div>

        {/* Pulsing halo when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full bg-[#D4AF37]/20 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};

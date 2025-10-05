import { useCallback, useEffect, useRef } from "react";

const resetAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
};

const useAudioPlayer = (audioUrl?: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastUrlRef = useRef<string | undefined>(audioUrl);

  useEffect(() => {
    return () => {
      resetAudio(audioRef.current);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioUrl) {
      resetAudio(audioRef.current);
      audioRef.current = null;
    } else if (lastUrlRef.current && lastUrlRef.current !== audioUrl) {
      resetAudio(audioRef.current);
      audioRef.current = null;
    }

    lastUrlRef.current = audioUrl;
  }, [audioUrl]);

  const togglePlayback = useCallback(() => {
    if (!audioUrl) {
      return;
    }

    const existingAudio = audioRef.current;

    if (existingAudio) {
      if (!existingAudio.paused) {
        resetAudio(existingAudio);
      } else {
        existingAudio.currentTime = 0;
        const playPromise = existingAudio.play();
        if (playPromise) {
          void playPromise.catch(() => undefined);
        }
      }

      return;
    }

    const newAudio = new Audio(audioUrl);
    audioRef.current = newAudio;
    const playPromise = newAudio.play();
    if (playPromise) {
      void playPromise.catch(() => undefined);
    }
  }, [audioUrl]);

  return { togglePlayback };
};

export default useAudioPlayer;

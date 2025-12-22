import { useCallback, useEffect, useState } from "react";

const resetAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;
};

const useAudioPlayer = (audioUrl?: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [lastUrl, setLastUrl] = useState<string | undefined>(audioUrl);

  const clearAudio = useCallback(() => {
    setAudio((currentAudio) => {
      if (currentAudio) {
        resetAudio(currentAudio);
      }

      return null;
    });
  }, []);

  useEffect(() => {
    return () => {
      resetAudio(audio);
    };
  }, [audio]);

  useEffect(() => {
    if (!audioUrl) {
      clearAudio();
      if (lastUrl !== undefined) {
        setLastUrl(undefined);
      }
      return;
    }

    if (lastUrl && lastUrl !== audioUrl) {
      clearAudio();
    }

    if (lastUrl !== audioUrl) {
      setLastUrl(audioUrl);
    }
  }, [audioUrl, lastUrl, clearAudio]);

  const togglePlayback = useCallback(() => {
    if (!audioUrl) {
      return;
    }

    setAudio((currentAudio) => {
      if (currentAudio) {
        if (!currentAudio.paused) {
          resetAudio(currentAudio);
          return null;
        }

        currentAudio.currentTime = 0;
        const playPromise = currentAudio.play();
        if (playPromise) {
          void playPromise.catch(() => undefined);
        }

        return currentAudio;
      }

      const newAudio = new Audio(audioUrl);
      const playPromise = newAudio.play();
      if (playPromise) {
        void playPromise.catch(() => undefined);
      }

      return newAudio;
    });
  }, [audioUrl]);

  return { togglePlayback };
};

export default useAudioPlayer;

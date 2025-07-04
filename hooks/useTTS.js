import { useCallback } from 'react';

export default function useTTS() {
  const speak = useCallback((text) => {
    // TODO: Gọi API TTS
  }, []);
  return { speak };
} 
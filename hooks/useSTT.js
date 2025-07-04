import { useCallback } from 'react';

export default function useSTT() {
  const listen = useCallback(() => {
    // TODO: Gọi API STT
  }, []);
  return { listen };
} 
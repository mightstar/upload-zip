import { useEffect, useRef } from 'react';

import { AbortController, AbortSignal } from 'native-abort-controller';

export type AbortFunction = () => void;

type ResetAbortController = () => AbortSignal;

type UseAbortController = () => {
  abort: AbortFunction;
  reset: ResetAbortController;
  getSignal: () => AbortSignal | undefined;
};

export const useAbortController: UseAbortController = () => {
  const abortRef = useRef<AbortController | null>();

  const abort = () => {
    abortRef.current?.abort();
  };

  const reset = () => {
    abortRef.current = new AbortController();

    return abortRef.current.signal;
  };

  const getSignal = () => {
    if (!abortRef.current) {
      reset();
    }

    return abortRef.current?.signal;
  };

  useEffect(() => {
    return () => {
      abort();
    };
  }, []);

  return {
    abort,
    reset,
    getSignal,
  };
};

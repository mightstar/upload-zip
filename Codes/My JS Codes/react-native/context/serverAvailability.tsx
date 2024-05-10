import { createContext, createRef, FC, useImperativeHandle, useState } from 'react';

interface ServerAvailabilityContextValue {
  lastDisconnectTimestamp: number | null;
  isServerAvailable: boolean;
  updateServerAvailabilityStatus: (status: boolean) => void;
}

export const ServerAvailabilityContext = createContext<ServerAvailabilityContextValue>(
  {} as ServerAvailabilityContextValue,
);

export const serverAvailabilityRef = createRef<ServerAvailabilityContextValue>();

export const ServerAvailabilityContextProvider: FC = ({ children }) => {
  const [isServerAvailable, setIsServerAvailable] = useState<boolean>(true);
  const [lastDisconnectTimestamp, setLastDisconnectTimestamp] = useState<number | null>(null);

  const updateServerAvailabilityStatus = (status: boolean) => {
    setIsServerAvailable(status);

    // we need lastDisconnectTimestamp to trigger toast.show() to show a toast even if a user closed it
    if (!status) {
      setLastDisconnectTimestamp(Date.now());
    }
  };

  const value: ServerAvailabilityContextValue = {
    updateServerAvailabilityStatus,
    isServerAvailable,
    lastDisconnectTimestamp,
  };

  useImperativeHandle(serverAvailabilityRef, () => value);

  return <ServerAvailabilityContext.Provider value={value}>{children}</ServerAvailabilityContext.Provider>;
};

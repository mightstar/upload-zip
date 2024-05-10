import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { loadAssetsAsync } from 'utils/loadAssets';

interface Context {
  booted: boolean;
  showBottomNavigation: boolean;
  setShowBottomNavigation: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export const AppProvider: FC<Props> = ({ children }) => {
  const [showBottomNavigation, setShowBottomNavigation] = useState<boolean>(true);
  const [booted, setBooted] = useState<boolean>(false);

  useEffect(() => {
    async function bootApp() {
      // do your async work here
      // load icons
      // etc.

      await loadAssetsAsync();

      setBooted(true);
    }

    bootApp();
  }, []);

  return (
    <AppContext.Provider
      value={{
        booted,
        showBottomNavigation,
        setShowBottomNavigation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

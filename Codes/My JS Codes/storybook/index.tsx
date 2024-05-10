import { FC, useEffect } from 'react';
import { LogBox } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure, getStorybookUI } from '@storybook/react-native';
import { NativeBaseProvider, View } from 'native-base';

import { ToastProvider } from 'hooks';
import { Theme } from 'theme';

import { AppBackgroundView } from './decorators';
import './rn-addons';

LogBox.ignoreLogs(['EventEmitter.removeListener', 'We can not support a function callback.', 'Constants.platform']);

// enables knobs for all stories
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/naming-convention -- withKnobs is untyped
addDecorator(withKnobs({ escapeHTML: false }));
addDecorator(AppBackgroundView);

// import stories
configure(() => {
  // eslint-disable-next-line global-require -- we will get rid of it when migrate Storybook initialization to a modern approach
  require('./stories');
}, module);

// eslint-disable-next-line @typescript-eslint/naming-convention -- we need PascalCase here because we use it as a React component
const StorybookUiRoot = getStorybookUI({
  asyncStorage: null,
});

export const Storybook: FC = () => {
  const config = {
    dependencies: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, global-require, @typescript-eslint/no-var-requires, @typescript-eslint/naming-convention -- importing via different way doesn't allow to reach the LinearGradient
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
    },
  };

  useEffect(() => {
    void RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <NativeBaseProvider theme={Theme} config={config}>
      <ToastProvider>
        <View width='100%' height='100%'>
          <StorybookUiRoot />
        </View>
      </ToastProvider>
    </NativeBaseProvider>
  );
};

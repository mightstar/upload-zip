import { createRef, useContext, useEffect } from 'react';
import { combineProviders } from 'react-combine-providers';
import { LogBox, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@apollo/client';
import { AnalyticsService } from '@modules/analytics-service';
import { PrimaryBackground, Theme, ToastProvider, useToast } from '@modules/ui-library';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import DynamicLinkHandler from 'components/DynamicLinkHandler';
import config from 'config';
import { authErrorsToastParams } from 'constants/notifyOptions';
import { AppContext, AppProvider } from 'context/app';
import { AuthContext, AuthProvider } from 'context/auth';
import { ConfigContext, ConfigProvider } from 'context/config';
import { ServerAvailabilityContextProvider } from 'context/serverAvailability';
import { apolloClient } from 'graphql/client';
import SplashScreen from 'ui/SplashScreen';
import Auth from 'navigators/Auth';
import Main from 'navigators/Main';
import { Colors, globalStyles, navigationTheme } from 'theme';
import initializeServices from 'utils/initializeServices';

export const navigationRef = createRef<NavigationContainerRef<ReactNavigation.RootParamList>>();

const provider = combineProviders();

//UI providers
provider.push(Host);
provider.push(NativeBaseProvider, { theme: Theme, config: config.nativeBase });
provider.push(SafeAreaProvider, { initialMetrics: initialWindowMetrics });
provider.push(ToastProvider);

//Data providers
provider.push(AppProvider);
provider.push(ApolloProvider, { client: apolloClient, children: null });
provider.push(AuthProvider);
provider.push(ServerAvailabilityContextProvider);
provider.push(ConfigProvider);

const MasterProvider = provider.master();

const PostProvidersApp = () => {
  const { booted } = useContext(AppContext);
  const { isAuthenticated, authErrorMessage, setAuthErrorMessage } = useContext(AuthContext);
  const { configured } = useContext(ConfigContext);
  const toast = useToast();

  //reason: https://reactnavigation.org/docs/5.x/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
    'We can not support a function callback.',
  ]);

  useEffect(() => {
    if (booted && authErrorMessage) {
      const authErrorToastParams = authErrorsToastParams[authErrorMessage];

      toast.show(authErrorToastParams);
      setAuthErrorMessage(null);
    }

    RNBootSplash.hide({ fade: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, authErrorMessage, setAuthErrorMessage]);

  const loaded = booted && configured;
  const onChangeRouteHandler = () => {
    const route = navigationRef.current?.getCurrentRoute?.();
    const routeName = route?.name || 'undefined';
    const data = route?.name ? undefined : JSON.stringify(route);

    AnalyticsService.eventTracker.trackNavigationEvent({ eventName: 'screenChanged', routeName, data });
  };

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef} onStateChange={onChangeRouteHandler}>
      <GestureHandlerRootView style={globalStyles.flex}>
        <StatusBar animated={false} backgroundColor={Colors.barColor} barStyle="light-content" />
        <PrimaryBackground>
          {!loaded && <SplashScreen />}
          {loaded && !isAuthenticated && <Auth />}
          {loaded && isAuthenticated && <Main />}
        </PrimaryBackground>
      </GestureHandlerRootView>
      {loaded && <DynamicLinkHandler />}
    </NavigationContainer>
  );
};

const PreProvidersApp = () => {
  useEffect(() => {
    initializeServices();
  }, []);

  return (
    <MasterProvider>
      <PostProvidersApp />
    </MasterProvider>
  );
};

export default PreProvidersApp;

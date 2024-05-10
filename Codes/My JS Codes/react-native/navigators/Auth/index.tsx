import { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ForgotPassword from 'screens/public/ForgotPassword';
import ResetPassword from 'screens/public/ResetPassword';
import SignIn from 'screens/public/SignIn';
import Welcome from 'screens/public/Welcome';
import Terms from 'screens/shared/Terms';
import { lockedScreenOptions, defaultStackScreenOptions as screenOptions } from 'theme';

import { AuthStackParamList, StackScreen } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={StackScreen.WELCOME} component={Welcome} />
      <Stack.Screen name={StackScreen.TERMS} component={Terms} />
      <Stack.Screen name={StackScreen.SIGN_IN} component={SignIn} />
      <Stack.Screen name={StackScreen.FORGOT_PASSWORD} component={ForgotPassword} />

      <Stack.Group screenOptions={lockedScreenOptions}>
        <Stack.Screen name={StackScreen.RESET_PASSWORD} component={ResetPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthNavigator;

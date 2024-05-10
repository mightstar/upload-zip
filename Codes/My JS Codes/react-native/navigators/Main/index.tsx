import { FC } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TabBar from 'components/TabBar';
import Home from 'screens/private/Home';
import Settings from 'screens/private/Settings';

import { defaultTabScreenOptions, defaultStackScreenOptions as screenOptions } from 'theme';

import { BottomTabParamList, MainStackParamList, MainStackScreen } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const RootStack = createStackNavigator<MainStackParamList>();

const MainNavigator: FC = () => {
  return (
    <RootStack.Navigator initialRouteName={MainStackScreen.MAIN} screenOptions={screenOptions}>
      <RootStack.Screen name={MainStackScreen.MAIN} component={TabNavigator} options={screenOptions} />
      {/* other screens */}
    </RootStack.Navigator>
  );
};

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator screenOptions={defaultTabScreenOptions} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name={MainStackScreen.HOME} component={Home} />
      <Tab.Screen name={MainStackScreen.SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

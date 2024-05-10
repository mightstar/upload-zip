import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum MainStackScreen {
  MAIN = 'Main',
  HOME = 'Home',
  SETTINGS = 'Settings',
}

export type BottomTabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type MainStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  Home: undefined;
  Settings: undefined;
};

export type BottomNavScreenProps = StackNavigationProp<MainStackParamList, 'Main'>;

export type HomeScreenProps = StackNavigationProp<MainStackParamList, 'Home'>;
export type SettingsScreenProps = StackNavigationProp<MainStackParamList, 'Settings'>;

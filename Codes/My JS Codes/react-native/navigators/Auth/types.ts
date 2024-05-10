import { StackNavigationProp } from '@react-navigation/stack';

export enum StackScreen {
  WELCOME = 'Welcome',
  TERMS = 'Terms',
  SIGN_IN = 'SignIn',
  FORGOT_PASSWORD = 'ForgotPassword',
  RESET_PASSWORD = 'ResetPassword',
}

export type CommonStackParamList = {
  HelpAndFAQ: undefined;
};

export type AuthStackParamList = CommonStackParamList & {
  Welcome: undefined;
  SignIn: { email: string } | undefined;
  Terms: { isProfile?: boolean; } | undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string; code: string };
};

export type WelcomeScreenProps = StackNavigationProp<AuthStackParamList, 'Welcome'>;
export type TermsScreenProps = StackNavigationProp<AuthStackParamList, 'Terms'>;
export type SignInScreenProps = StackNavigationProp<AuthStackParamList, 'SignIn'>;
export type ForgotPasswordScreenProps = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
export type ResetPasswordScreenProps = StackNavigationProp<AuthStackParamList, 'ResetPassword'>;


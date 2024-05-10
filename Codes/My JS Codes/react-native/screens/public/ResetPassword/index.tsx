import { FC } from 'react';
import { Alert } from 'react-native';

import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';

import { useResetPassword } from 'graphql/hooks';
import { DefaultResponseStatus } from 'graphql/types';
import { AuthStackParamList, ResetPasswordScreenProps, StackScreen } from 'navigators/Auth/types';
import Content from 'sampleData/content/resetPassword.json';

import View, { ResetPasswordFormValues } from './view';

const ResetPassword: FC = () => {
  const navigation = useNavigation<ResetPasswordScreenProps>();
  const route = useRoute<RouteProp<AuthStackParamList, StackScreen.RESET_PASSWORD>>();
  const { email, code } = route.params;

  const { resetPassword, resetPasswordLoading } = useResetPassword();

  const submitHandler = async ({ password }: ResetPasswordFormValues) => {
    const response = await resetPassword({
      email,
      code,
      newPassword: password,
    });

    if (response?.status === DefaultResponseStatus.SUCCESS) {
      navigation.navigate(StackScreen.SIGN_IN);
    } else {
      Alert.alert(Content.errorMessage);
    }
  };

  const goToPreviousScreen = () => {
    navigation.dispatch(StackActions.pop());
  };

  return <View onBack={goToPreviousScreen} onSubmit={submitHandler} loading={resetPasswordLoading} />;
};

export default ResetPassword;

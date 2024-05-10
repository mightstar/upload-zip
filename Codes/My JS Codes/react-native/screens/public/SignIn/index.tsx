import { FC, useContext, useState } from 'react';

import { useToast } from '@modules/ui-library';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { authErrorsToastParams } from 'constants/notifyOptions';
import { AuthContext, AuthErrorsMessages, SignInFormData } from 'context/auth';
import { useSignIn } from 'graphql/hooks';
import { AuthStackParamList, SignInScreenProps, StackScreen } from 'navigators/Auth/types';
import Content from 'sampleData/content/signIn.json';

import View from './view';

const SignIn: FC = () => {
  const { goBack, navigate } = useNavigation<SignInScreenProps>();
  const route = useRoute<RouteProp<AuthStackParamList, 'SignIn'>>();
  const email = route.params?.email;

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setUserData, changeIsDataCleared } = useContext(AuthContext);

  const toast = useToast();
  const { signIn } = useSignIn();

  const submitHandler = async (values: SignInFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await signIn({ email: values.email, password: values.password });

      if (response?.token) {
        setUserData(response.token, values.rememberMe);
        changeIsDataCleared(false);
      }
    } catch (e) {
      setLoading(false);

      if (e instanceof Error && e.message === AuthErrorsMessages.RESET_PASSWORD) {
        toast.show(authErrorsToastParams[AuthErrorsMessages.RESET_PASSWORD]);
      } else {
        setErrorMessage(Content.wrongEmailOrPasswordMessage);
      }
    }
  };

  const clearErrorMessageHandler = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const forgotPasswordPressHandler = () => {
    navigate(StackScreen.FORGOT_PASSWORD);
  };

  return (
    <View
      onBack={goBack}
      onSubmit={submitHandler}
      onForgotPasswordPress={forgotPasswordPressHandler}
      onClearErrorMessage={clearErrorMessageHandler}
      loading={loading}
      email={email}
      errorMessage={errorMessage}
    />
  );
};

export default SignIn;

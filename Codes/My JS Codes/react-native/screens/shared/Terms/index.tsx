import { FC, useContext, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import _omit from 'lodash/omit';

import { AuthContext, AuthContextValues, SignUpUserFieldName } from 'context/auth';
import { SignUpUserResponse, useSignUpUser } from 'graphql/hooks';
import useTerms from 'hooks/useTerms';
import { TermsDetailScreenProps } from 'navigators/Auth/types';

import View from './view';

const Terms: FC = () => {
  const navigation = useNavigation<TermsDetailScreenProps>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUpUserFormData, setUserData }: AuthContextValues = useContext(AuthContext);

  const {
    processedTerms,
    error,
    // getApiTerms
  } = useTerms();
  const { signUpUser } = useSignUpUser();

  const onPressHandler = async () => {
    setIsLoading(true);

    const input = _omit(signUpUserFormData, SignUpUserFieldName.CONFIRM);
    const response: SignUpUserResponse | undefined = await signUpUser({
      email: input.email,
      fullName: input.name,
      password: input.password,
    });

    const token = response?.token;

    if (token) {
      setUserData(token, true);
    }
  };

  return (
    <View
      terms={processedTerms}
      error={error?.message}
      onPress={onPressHandler}
      isLoading={isLoading}
      onPressBack={navigation.goBack}
    />
  );
};

export default Terms;

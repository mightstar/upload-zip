import { FC, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { useSendResetPasswordCode } from 'graphql/hooks';
import { ForgotPasswordScreenProps, StackScreen } from 'navigators/Auth/types';

import View, { ForgotPasswordFormValues } from './view';

const ForgotPassword: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { goBack, navigate } = useNavigation<ForgotPasswordScreenProps>();

  const { sendResetPasswordCode } = useSendResetPasswordCode();

  const submitHandler = async (values: ForgotPasswordFormValues) => {
    setLoading(true);

    const { email } = values;

    await sendResetPasswordCode({ email });

    navigate(StackScreen.RESET_PASSWORD_CODE, { email });
  };

  return <View onBack={goBack} onSubmit={submitHandler} loading={loading} />;
};

export default ForgotPassword;

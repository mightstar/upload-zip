import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonProps, TextInput, TopNavigation, TopNavigationProps } from '@modules/ui-library';
import _get from 'lodash/get';
import * as yup from 'yup';

import BaseView from 'ui/BaseView';
import Container from 'ui/Container';
import Content from 'sampleData/content/forgotPassword.json';
import { rh, rhpx } from 'utils/ratioSizer';
import { yupFields } from 'validations/yupSchemaTypes';

export enum ForgotPasswordFormField {
  EMAIL = 'email',
}

export interface ForgotPasswordFormValues {
  [ForgotPasswordFormField.EMAIL]: string;
}

interface Props {
  onSubmit: SubmitHandler<ForgotPasswordFormValues>;
  onBack: TopNavigationProps['onPressBack'];
  loading: ButtonProps['isLoading'];
}

const schema = yup.object().shape({
  [ForgotPasswordFormField.EMAIL]: yupFields.email,
});

const ForgotPassword: FC<Props> = ({ onSubmit, onBack, loading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register(ForgotPasswordFormField.EMAIL);
  }, [register]);

  const onChangeHandler = (fieldName: ForgotPasswordFormField) => (newValue: unknown) => {
    setValue(fieldName, newValue);
    clearErrors(fieldName);
  };

  const emailError = _get(errors, 'email')?.message;

  return (
    <BaseView>
      <TopNavigation onPressBack={onBack} title={Content.title} />
      <Container style={styles.container}>
        <TextInput
          label={Content.email}
          onChangeText={onChangeHandler(ForgotPasswordFormField.EMAIL)}
          onSubmitEditing={handleSubmit(onSubmit)}
          autoCapitalize="none"
          textContentType="username"
          keyboardType="email-address"
          isInvalid={Boolean(emailError)}
          errorMessage={emailError}
          withDoneButton
        />
        <Button mt={rhpx(40)} size="full" variant="primary" onPress={handleSubmit(onSubmit)} isLoading={loading}>
          {Content.submitButton}
        </Button>
      </Container>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rh(160),
  },
});

export default ForgotPassword;

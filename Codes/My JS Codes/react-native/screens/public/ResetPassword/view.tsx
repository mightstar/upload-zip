import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ButtonProps,
  PrimaryBackground,
  Text,
  TextInput,
  TopNavigation,
  TopNavigationProps,
} from '@modules/ui-library';
import _get from 'lodash/get';
import { Pressable, VStack } from 'native-base';
import * as yup from 'yup';

import ValidationBlock from 'components/ValidationBlock';
import { horizontalSpacing } from 'constants/spacings';
import BaseView from 'ui/BaseView';
import Content from 'sampleData/content/resetPassword.json';
import { isIOS } from 'utils/deviceInfo';
import { rh, rwpx } from 'utils/ratioSizer';
import { yupFields } from 'validations/yupSchemaTypes';

export type ResetPasswordFormValues = {
  [ResetPasswordFormFieldName.PASSWORD]: string;
};

enum ResetPasswordFormFieldName {
  PASSWORD = 'password',
}

const schema = yup.object().shape({
  [ResetPasswordFormFieldName.PASSWORD]: yupFields.password,
});

interface Props {
  onBack: TopNavigationProps['onPressBack'];
  onSubmit: SubmitHandler<ResetPasswordFormValues>;
  loading: ButtonProps['isLoading'];
}

const ResetPassword: FC<Props> = ({ onBack, onSubmit, loading }) => {
  const [valueForValidation, setValueForValidation] = useState<string>('');

  const {
    handleSubmit,
    clearErrors,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register(ResetPasswordFormFieldName.PASSWORD);
  }, [register]);

  const changeTextHandler = (text: string) => {
    setValue(ResetPasswordFormFieldName.PASSWORD, text);
    setValueForValidation(text);
    clearErrors();
  };

  return (
    <BaseView>
      <PrimaryBackground>
        <TopNavigation onPressBack={onBack} title={Content.title} />
        <KeyboardAvoidingView
          behavior={isIOS ? 'padding' : 'height'}
          keyboardVerticalOffset={rh(70)}
          style={styles.scrollView}
        >
          <Pressable flex={1} onPress={Keyboard.dismiss}>
            <VStack height="full" justifyContent="space-between" px={rwpx(horizontalSpacing)}>
              <VStack space={rwpx(105)}>
                <Text size="sm" fontWeight="normal" textAlign="center">
                  {Content.absolutelyNewPassword}
                </Text>
                <VStack space={rwpx(10)}>
                  <TextInput
                    label={Content.newPasswordLabel}
                    onChangeText={changeTextHandler}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    isInvalid={Boolean(_get(errors, ResetPasswordFormFieldName.PASSWORD))}
                    visibilityIconStatus="inactive"
                    textContentType="password"
                    withDoneButton
                  />
                  <ValidationBlock password={valueForValidation} />
                </VStack>
              </VStack>
              <Button variant="primary" size="full" onPress={handleSubmit(onSubmit)} isLoading={loading}>
                {Content.setNewPasswordButton}
              </Button>
            </VStack>
          </Pressable>
        </KeyboardAvoidingView>
      </PrimaryBackground>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default ResetPassword;

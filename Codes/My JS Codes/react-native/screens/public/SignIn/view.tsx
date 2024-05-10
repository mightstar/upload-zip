import { FC, useEffect, useRef } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, TextInput as RNTextInput, StyleSheet } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ButtonProps,
  Checkbox,
  Text,
  TextInput,
  TopNavigation,
  TopNavigationProps,
  WelcomeLogo,
} from '@modules/ui-library';
import _get from 'lodash/get';
import { Box, HStack, Pressable, VStack } from 'native-base';
import * as yup from 'yup';

import { SignInFieldName, SignInFormData } from 'context/auth';
import BaseView from 'ui/BaseView';
import Container from 'ui/Container';
import Content from 'sampleData/content/signIn.json';
import { isIOS } from 'utils/deviceInfo';
import { rh, rhpx } from 'utils/ratioSizer';
import { yupFields } from 'validations/yupSchemaTypes';

const schema = yup.object().shape({
  [SignInFieldName.EMAIL]: yupFields.signInEmail,
  [SignInFieldName.PASSWORD]: yupFields.signInPassword,
  [SignInFieldName.REMEMBER_ME]: yup.boolean().strict(),
});

interface Props {
  loading: ButtonProps['isLoading'];
  errorMessage: string | null;
  onBack: TopNavigationProps['onPressBack'];
  onSubmit: SubmitHandler<SignInFormData>;
  onForgotPasswordPress: ButtonProps['onPress'];
  onClearErrorMessage: () => void;
  email?: string;
}

const SignIn: FC<Props> = ({
  onBack,
  onSubmit,
  onForgotPasswordPress,
  onClearErrorMessage,
  loading,
  email,
  errorMessage,
}) => {
  const passwordRef = useRef<RNTextInput>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
    defaultValues: { rememberMe: true },
  });

  const values: Record<SignInFieldName, any> = {
    [SignInFieldName.EMAIL]: watch(SignInFieldName.EMAIL),
    [SignInFieldName.PASSWORD]: watch(SignInFieldName.PASSWORD),
    [SignInFieldName.REMEMBER_ME]: watch(SignInFieldName.REMEMBER_ME),
  };

  const fieldsErrors: Record<SignInFieldName, FieldError | undefined> = {
    [SignInFieldName.EMAIL]: _get(errors, SignInFieldName.EMAIL),
    [SignInFieldName.PASSWORD]: _get(errors, SignInFieldName.PASSWORD),
    [SignInFieldName.REMEMBER_ME]: _get(errors, SignInFieldName.REMEMBER_ME),
  };

  useEffect(() => {
    register(SignInFieldName.EMAIL);
    register(SignInFieldName.PASSWORD);
    register(SignInFieldName.REMEMBER_ME);
  }, [register]);

  useEffect(() => {
    if (email) {
      setValue(SignInFieldName.EMAIL, email);
    }
  }, [email, setValue]);

  const onChangeHandler = (fieldName: SignInFieldName, value: any) => {
    setValue(fieldName, value);

    clearErrors();
    onClearErrorMessage();
  };

  return (
    <BaseView>
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : 'height'}
        keyboardVerticalOffset={rh(70)}
        style={styles.container}
      >
        <Pressable flex={1} onPress={Keyboard.dismiss}>
          <TopNavigation onPressBack={onBack} />
          <Container style={styles.container}>
            <VStack flex={1} justifyContent="space-between">
              <Box>
                <WelcomeLogo hideText hideTitle />
                {errorMessage && (
                  <Text size="sm" textAlign="center" color="red.500" marginTop={rhpx(22.4)}>
                    {errorMessage}
                  </Text>
                )}
              </Box>
              <VStack space={rhpx(30)}>
                <TextInput
                  autoFocus
                  value={values.email}
                  label={Content.emailPlaceholder}
                  onChangeText={(text: string) => onChangeHandler(SignInFieldName.EMAIL, text)}
                  autoCorrect={false}
                  textContentType="username"
                  importantForAutofill="yes"
                  autoCapitalize="none"
                  isInvalid={Boolean(fieldsErrors.email)}
                  errorMessage={fieldsErrors.email?.message}
                  keyboardType="email-address"
                  nextInputRef={passwordRef}
                  blurOnSubmit={false}
                />
                <Box>
                  <TextInput
                    ref={passwordRef}
                    value={values.password}
                    label={Content.passwordPlaceholder}
                    onChangeText={(text: string) => onChangeHandler(SignInFieldName.PASSWORD, text)}
                    passwordRules={null}
                    textContentType="password"
                    importantForAutofill="yes"
                    autoCapitalize="none"
                    isInvalid={Boolean(fieldsErrors.password)}
                    errorMessage={fieldsErrors.password?.message}
                    secureTextEntry
                    onSubmitEditing={handleSubmit(onSubmit)}
                    withDoneButton
                  />
                  <HStack justifyContent="space-between" alignItems="center" mt={rhpx(16)}>
                    <Checkbox
                      size="sm"
                      value="rememberMe"
                      isChecked={values.rememberMe}
                      label={Content.rememberMe}
                      onPress={() => onChangeHandler(SignInFieldName.REMEMBER_ME, !values.rememberMe)}
                    />
                    <Button onPress={onForgotPasswordPress} variant="tertiary" size="md" _text={{ underline: true }}>
                      {Content.forgotPasswordButton}
                    </Button>
                  </HStack>
                </Box>
              </VStack>
              <Button onPress={handleSubmit(onSubmit)} isLoading={loading} variant="primary" size="full">
                {Content.signInButton}
              </Button>
            </VStack>
          </Container>
        </Pressable>
      </KeyboardAvoidingView>
    </BaseView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignIn;

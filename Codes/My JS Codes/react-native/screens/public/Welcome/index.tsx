import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { WelcomeLogo } from '@modules/ui-library';
import { useNavigation } from '@react-navigation/native';

import BaseView from 'ui/BaseView';
import PrimaryButton from 'ui/PrimaryButton';
import { StackScreen, WelcomeScreenProps } from 'navigators/Auth/types';
import Content from 'sampleData/content/welcome.json';
import { Colors } from 'theme';
import { height, width } from 'theme';

const Welcome: FC = () => {
  const navigation = useNavigation<WelcomeScreenProps>();

  return (
    <BaseView>
      <View style={styles.root}>
        <View />
        <View style={styles.content}>
          <WelcomeLogo />
          <PrimaryButton
            isGroupButton
            label={Content.signIn}
            onPress={() => navigation.navigate(StackScreen.SIGN_IN)}
          />
          <PrimaryButton
            style={styles.createAccountButton}
            label={Content.createAccount}
            onPress={() => navigation.navigate(StackScreen.VERIFY_INVITE_CODE)}
            isGroupButton
          />
        </View>
        <View style={styles.disclaimerContainer} />
      </View>
    </BaseView>
  );
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    marginTop: height / 5,
  },
  createAccountButton: {
    marginTop: 0,
    backgroundColor: Colors.buttonGrey,
    borderWidth: 1,
    borderColor: Colors.buttonBlueColor,
  },
  disclaimerContainer: {
    paddingHorizontal: width / 18,
    paddingBottom: height / 50,
  },
  disclaimerText: {
    color: Colors.white,
    fontSize: width / 32.7,
    textAlign: 'center',
    lineHeight: width / 20,
  }
});

export default Welcome;

import { FC, useCallback } from 'react';
import { Keyboard } from 'react-native';

import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { KeyboardIosExtraButton, KeyboardIosExtraButtonProps } from 'atoms';
import { TextInput } from 'molecules';
import { StoryProps } from 'storybook/types';

interface Props extends Partial<KeyboardIosExtraButtonProps>, StoryProps {}

const EXTRA_BUTTON_ID = 'extraButtonShowcase';

const StorybookKeyboardIosExtraButton: FC<Props> = ({ groupId, ...restProps }) => {
  const extraButtonPressHandler = useCallback(() => {
    Keyboard.dismiss();
    action('Extra button - pressed')();
  }, []);

  return (
    <>
      <TextInput withDoneButton inputAccessoryViewID={EXTRA_BUTTON_ID} placeholder='Tap here to open keyboard' />
      <KeyboardIosExtraButton
        nativeID={EXTRA_BUTTON_ID}
        title={text('title', 'Done', groupId)}
        onPress={extraButtonPressHandler}
        {...restProps}
      />
    </>
  );
};

export { StorybookKeyboardIosExtraButton as KeyboardIosExtraButton };

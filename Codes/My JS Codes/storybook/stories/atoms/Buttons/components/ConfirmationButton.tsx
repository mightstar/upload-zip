import { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import { ConfirmationButton, ConfirmationButtonProps } from 'components';
import { StoryProps } from 'storybook/types';

interface Props extends Partial<ConfirmationButtonProps>, StoryProps {}

const StorybookConfirmationButton: FC<Props> = (props) => {
  const { groupId } = props;

  return (
    <ConfirmationButton
      onLongPress={action('Long press action')}
      delayLongPress={number('DelayLongPress (ms)', 3000, {}, groupId)}
      {...props}
    />
  );
};

export { StorybookConfirmationButton as ConfirmationButton };

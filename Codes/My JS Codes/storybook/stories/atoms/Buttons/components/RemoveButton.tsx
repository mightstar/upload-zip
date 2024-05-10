import { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import { RemoveButton } from 'components';
import { StoryProps } from 'storybook/types';

const StorybookRemoveButton: FC<StoryProps> = ({ groupId, ...restProps }) => (
  <RemoveButton
    onPress={action('RemoveButton - pressed')}
    pressOpacity={number('pressOpacity', 0.5, undefined, groupId)}
    {...restProps}
  />
);

export { StorybookRemoveButton as RemoveButton };

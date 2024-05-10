import { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { NavigationButton, NavigationButtonProps, NavigationButtonType } from 'components';
import { StoryProps } from 'storybook/types';

interface Props extends Partial<NavigationButtonProps>, StoryProps {}

const StorybookNavigationButton: FC<Props> = ({ type, ...restProps }) => {
  const typeKnob = select('type', NavigationButtonType, NavigationButtonType.BACK);

  return <NavigationButton type={type || typeKnob} onPress={action(`NavigationButton(${typeKnob}`)} {...restProps} />;
};

export { StorybookNavigationButton as NavigationButton };

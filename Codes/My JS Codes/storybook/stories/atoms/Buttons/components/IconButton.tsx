import { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import { BarsIcon, TrashIcon, UserIcon } from 'assets';
import { IconButton, IconButtonProps, IconButtonShape, IconButtonSize, IconButtonVariant } from 'components';
import { StoryProps } from 'storybook/types';

interface Props extends Partial<IconButtonProps>, StoryProps {}

const sampleIcons: Record<string, JSX.Element> = {
  user: <UserIcon />,
  trash: <TrashIcon />,
  menu: <BarsIcon />,
};

const StorybookIconButton: FC<Props> = ({ groupId, ...props }) => (
  <IconButton
    icon={sampleIcons[select('icon', Object.keys(sampleIcons), 'trash', groupId)]}
    variant={select('variant', IconButtonVariant, IconButtonVariant.PRIMARY, groupId)}
    size={select('size', IconButtonSize, IconButtonSize.XS, groupId)}
    isDisabled={boolean('isDisabled', false, groupId)}
    shape={select('shape', IconButtonShape, IconButtonShape.RECT, groupId)}
    onPress={action('IconButton - pressed')}
    {...props}
  />
);

export { StorybookIconButton as IconButton };

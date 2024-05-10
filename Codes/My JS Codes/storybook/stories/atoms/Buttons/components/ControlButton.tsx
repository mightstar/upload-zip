import { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';

import { CirclePauseIcon, CirclePlayIcon, SkipNextIcon, SkipPrevIcon } from 'assets';
import { ControlButton, ControlButtonProps } from 'components';
import { MapIcon, StoryProps } from 'storybook/types';
import { rw } from 'utils';

interface Props extends Partial<ControlButtonProps>, StoryProps {}

const exampleIcons: MapIcon = {
  play: <CirclePlayIcon />,
  pause: <CirclePauseIcon />,
  skipPrev: <SkipPrevIcon />,
  skipNext: <SkipNextIcon />,
};

const StorybookControlButton: FC<Props> = ({ groupId }) => (
  <ControlButton
    onPress={action('ControlButton - pressed')}
    size={number('size', rw(34), {}, groupId)}
    icon={exampleIcons[select('icon', Object.keys(exampleIcons), 'play', groupId)]}
  />
);

export { StorybookControlButton as ControlButton };

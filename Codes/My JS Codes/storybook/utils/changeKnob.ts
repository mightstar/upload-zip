import { CHANGE } from '@storybook/addon-knobs';
import { addons } from '@storybook/addons';

import { Primitive } from 'storybook/types';

export const changeKnob = (name: string, value: Primitive, groupId?: string) => {
  const channel = addons.getChannel();

  channel.emit(CHANGE, {
    name: name + (groupId ? `_${groupId}` : ''),
    value,
  });
};

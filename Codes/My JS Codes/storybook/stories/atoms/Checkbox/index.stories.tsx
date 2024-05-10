import { storiesOf } from '@storybook/react-native';

import { CenterWithPaddings } from 'storybook/decorators';

import { Checkbox } from './components';

storiesOf('Checkbox', module)
  .addDecorator(CenterWithPaddings)
  .add('Checkbox', () => <Checkbox />);

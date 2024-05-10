import { storiesOf } from '@storybook/react-native';

import { ButtonVariant } from 'components';
import { CenterView } from 'storybook/decorators';

import {
  Button,
  ConfirmationButton,
  ControlButton,
  IconButton,
  KeyboardIosExtraButton,
  NavigationButton,
  RecordButton,
  RemoveButton,
} from './components';

storiesOf('Buttons', module)
  .addDecorator(CenterView)
  .add('Primary', () => <Button variant={ButtonVariant.PRIMARY} />)
  .add('Secondary', () => <Button variant={ButtonVariant.SECONDARY} />)
  .add('Tertiary', () => <Button variant={ButtonVariant.TERTIARY} />)
  .add('Navigation', () => <NavigationButton />)
  .add('Remove', () => <RemoveButton />)
  .add('Record', () => <RecordButton />)
  .add('Control', () => <ControlButton />)
  .add('Confirmation', () => <ConfirmationButton />)
  .add('Icon', () => <IconButton />)
  .add('KeyboardIosExtraButton', () => <KeyboardIosExtraButton />);

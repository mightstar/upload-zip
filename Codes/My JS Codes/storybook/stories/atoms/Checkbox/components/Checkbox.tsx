import { FC, useState } from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

import { AlignLabel, Checkbox, CheckboxProps, CheckboxSize } from 'components';
import { StoryProps } from 'storybook/types';
import { changeKnob } from 'storybook/utils';

interface Props extends Partial<CheckboxProps>, StoryProps {}

const StorybookCheckbox: FC<Props> = ({
  groupId,
  isChecked: parentIsChecked,
  isDisabled,
  isIndeterminate,
  isInvalid,
  label,
  onPress,
  size,
  value,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const useParentState = parentIsChecked !== undefined;
  const newIsChecked = parentIsChecked ?? isChecked;

  const resultOnPress: CheckboxProps['onPress'] = useParentState
    ? onPress
    : () => {
        setIsChecked((prevState) => !prevState);
      };

  return (
    <Checkbox
      value={value || 'storybookCheckbox'}
      isChecked={boolean('isChecked', newIsChecked, groupId)}
      isDisabled={boolean('isDisabled', isDisabled || false, groupId)}
      isInvalid={boolean('isInvalid', isInvalid || false, groupId)}
      isIndeterminate={boolean('isIndeterminate', isIndeterminate || false, groupId)}
      size={select('Size', CheckboxSize, size || CheckboxSize.MEDIUM, groupId)}
      label={text('Label', label || 'Label', groupId)}
      onPress={(event) => {
        resultOnPress?.(event);
        changeKnob('isChecked', isChecked, groupId);
        action('Checkbox - pressed')();
      }}
      alignLabel={select('alignLabel', AlignLabel, AlignLabel.CENTER, groupId)}
      {...props}
    />
  );
};

export { StorybookCheckbox as Checkbox };

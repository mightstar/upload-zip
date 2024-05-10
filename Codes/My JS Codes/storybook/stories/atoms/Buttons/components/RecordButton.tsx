import { FC } from "react";

import { boolean } from "@storybook/addon-knobs";

import { RecordButton } from "components";
import { StoryProps } from "storybook/types";
import { changeKnob } from "storybook/utils";

const StorybookRecordButton: FC<StoryProps> = ({ groupId, ...restProps }) => {
  const isRecording = boolean("isRecording", false, groupId);

  const onPressHandler = () => {
    changeKnob("isRecording", !boolean("isRecording", false, groupId), groupId);
  };

  return (
    <RecordButton
      onPress={onPressHandler}
      isRecording={isRecording}
      {...restProps}
    />
  );
};

export { StorybookRecordButton as RecordButton };

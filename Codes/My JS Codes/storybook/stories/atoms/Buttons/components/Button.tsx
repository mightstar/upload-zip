import { FC } from "react";

import { boolean, select, text } from "@storybook/addon-knobs";

import {
  CircleCheckIcon,
  EyeIcon,
  SkipNextIcon,
  SkipPrevIcon,
  TrashIcon,
} from "assets";
import {
  Button,
  ButtonColorScheme,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "components";
import { StoryProps } from "storybook/types";

const exampleIcons: Record<string, JSX.Element | undefined> = {
  empty: undefined,
  eye: <EyeIcon />,
  check: <CircleCheckIcon />,
  trash: <TrashIcon />,
  skipPrev: <SkipPrevIcon />,
  skipNext: <SkipNextIcon />,
};

interface Props extends Partial<ButtonProps>, StoryProps {}

const StorybookButton: FC<Props> = ({ variant, groupId, ...restProps }) => {
  return (
    <Button
      size={select("size", ButtonSize, ButtonSize.LG, groupId)}
      colorScheme={select(
        "colorScheme",
        ButtonColorScheme,
        ButtonColorScheme.PRIMARY,
        groupId
      )}
      variant={select(
        "variant",
        ButtonVariant,
        variant || ButtonVariant.PRIMARY,
        groupId
      )}
      isDisabled={boolean("isDisabled", false, groupId)}
      isLoading={boolean("isLoading", false, groupId)}
      startIcon={
        exampleIcons[
          select("startIcon", Object.keys(exampleIcons), "eye", groupId)
        ]
      }
      endIcon={
        exampleIcons[
          select("endIcon", Object.keys(exampleIcons), "empty", groupId)
        ]
      }
      {...restProps}
    >
      {text("label", "Button", groupId)}
    </Button>
  );
};

export { StorybookButton as Button };

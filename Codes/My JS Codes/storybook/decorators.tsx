import { StyleSheet, View } from "react-native";

import { addDecorator, storiesOf } from "@storybook/react-native";

import { rw } from "utils";

type Decorator = Parameters<ReturnType<typeof storiesOf>["addDecorator"]>[0];
type StoryFn = () => JSX.Element;

// This decorator needs a custom type because it is used in a function with other typing
export const AppBackgroundView = ((storyFn: StoryFn) => {
  return <View style={styles.background}>{storyFn()}</View>;
}) as Parameters<typeof addDecorator>[0];

export const CenterView = ((storyFn: StoryFn) => {
  return <View style={styles.center}>{storyFn()}</View>;
}) as Decorator;

export const CenterWithPaddings = ((storyFn: StoryFn) => {
  return <View style={styles.centerWithPaddings}>{storyFn()}</View>;
}) as Decorator;

const styles = StyleSheet.create({
  fullScreenView: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#0A1128",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerWithPaddings: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: rw(15),
  },
});

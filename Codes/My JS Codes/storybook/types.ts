import { ReactNode } from "react";

export interface StoryProps {
  groupId?: string;
}

export type Primitive = string | boolean | number | symbol | undefined | null;

export interface MapIcon {
  [x: string]: ReactNode | JSX.Element | null;
}

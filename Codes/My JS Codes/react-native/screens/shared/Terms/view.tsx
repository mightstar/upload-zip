import { FC } from 'react';

import {
  Button,
  ButtonProps,
  NavigationLink,
  NavigationLinkProps,
  Text,
  TopNavigation,
  TopNavigationProps,
} from '@modules/ui-library';
import { VStack } from 'native-base';

import { horizontalSpacing } from 'constants/spacings';
import BaseView from 'ui/BaseView';
import content from 'sampleData/content/terms.json';
import { rhpx, rwpx } from 'utils/ratioSizer';

interface Props {
  terms: NavigationLinkProps[];
  isLoading: boolean;
  onPressBack: TopNavigationProps['onPressBack'];
  onPress?: ButtonProps['onPress'];
  error?: string;
}

const Terms: FC<Props> = ({ error, onPress, isLoading, terms, onPressBack }) => {
  const headerText: string = content.settingsMessage;

  return (
    <BaseView>
      <TopNavigation title={content.title} onPressBack={onPressBack} />
      <VStack mt={rhpx(25)} justifyContent="space-between" flex={1} px={rwpx(horizontalSpacing)}>
        {error && (
          <Text fontWeight="normal" size="sm" color="red.400" textAlign="center">
            {error}
          </Text>
        )}
        {!error && (
          <>
            <VStack space={rwpx(70)}>
              <Text fontWeight="normal" size="sm" textAlign="center">
                {headerText}
              </Text>
              <VStack space={rwpx(40)}>
                {terms.map(itemProps => (
                  <NavigationLink key={itemProps.children} {...itemProps} />
                ))}
              </VStack>
            </VStack>
          </>
        )}
      </VStack>
    </BaseView>
  );
};

export default Terms;

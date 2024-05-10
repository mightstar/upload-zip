import { ApolloError } from '@apollo/client';

export type CommonUseApolloHookWrapperResult<Name extends string, Response> = Record<
  `${Name}Response`,
  Response | undefined
> &
  Record<`${Name}Loading`, boolean> &
  Record<`${Name}Error`, ApolloError | undefined>;

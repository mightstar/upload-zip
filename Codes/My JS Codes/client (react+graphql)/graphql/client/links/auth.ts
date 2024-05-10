import { setContext } from "@apollo/client/link/context";
import Storage from "some-storage";

import { ACCESS_TOKEN_KEY } from "context/constants";

export const authLink = setContext(async (_, { headers }) => {
  const token = await Storage.getItem(ACCESS_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
      time: new Date(),
    },
  };
});

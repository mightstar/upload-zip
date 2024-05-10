import { Environments } from "consts";

export type internalApiCredentialsHeaders = {
  account_id: string;
  account_key: string;
};

export type EnvironmentVariables = {
  NODE_ENV: Environments;
  PORT: number;
  DATABASE_URL: string;
  DATABASE_LOGGING: string;
  DATABASE_SSL: string;
  INTERNAL_API_HOST: string;
  INTERNAL_API_ACCOUNT_ID: string;
  INTERNAL_API_ACCOUNT_KEY: string;
  LOGTAIL_TOKEN: string;
};

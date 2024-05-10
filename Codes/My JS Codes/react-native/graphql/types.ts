export enum DefaultResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type DefaultResponse = {
  status: DefaultResponseStatus;
  message: string;
};

export type GetManyInput = {
  order?: string;
  where?: Record<string, unknown>;
  offset?: number;
  limit?: number;
};

export type GetOneInput = {
  where?: Record<string, unknown>;
};

export type GetGraphqlResponseType<Response> = { response: Response };

export type GetGraphqlVariablesType<Input> = { input?: Input };

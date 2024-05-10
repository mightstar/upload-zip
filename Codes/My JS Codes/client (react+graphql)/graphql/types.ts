export enum DefaultResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type DefaultResponse = {
  status: DefaultResponseStatus;
  message: string;
};

export type GetGraphqlResponseType<Response> = { response: Response };

export type GetGraphqlVariablesType<Input> = { input?: Input };

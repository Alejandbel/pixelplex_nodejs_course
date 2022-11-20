import { Request } from 'express';

export interface KeyValueRequest<
  T1 extends Record<string, any> | unknown = unknown,
  T2 extends Record<string, any> | unknown = unknown,
  T3 extends Record<string, any> | unknown = unknown
> extends Request<any, any, any, any> {
  params: T1;
  body: T2;
  query: T3;
}

export type TypedRequestQuery<T extends Record<string, any>> = KeyValueRequest<unknown, unknown, T>;

export type TypedRequestBody<T extends Record<string, any>> = KeyValueRequest<unknown, T>;

export type TypedRequestParams<T extends Record<string, any>> = KeyValueRequest<T>;

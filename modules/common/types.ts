export type ResponseType<T> = {
  status: boolean;
  success?: boolean;
  message: string;
  data: T;
};

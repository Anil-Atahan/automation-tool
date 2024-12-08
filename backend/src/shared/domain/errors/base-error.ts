export abstract class BaseError extends Error {
  constructor(
      public readonly message: string,
      public readonly statusCode: number,
      public readonly code: string 
  ) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string; code: string }[];
}

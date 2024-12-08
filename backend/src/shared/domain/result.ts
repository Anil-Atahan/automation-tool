export class Result<T = void> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private _value?: T;
  private _error?: string;

  private constructor(isSuccess: boolean, value?: T, error?: string) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
    this._error = error;

    if (isSuccess && error) {
      throw new Error("Invalid operation: Success result cannot contain an error.");
    }
    if (!isSuccess && !error) {
      throw new Error("Invalid operation: Failure result must contain an error.");
    }
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error("Cannot retrieve the value of a failed result.");
    }
    return this._value as T;
  }

  public get error(): string {
    if (this.isSuccess) {
      throw new Error("Cannot retrieve the error of a successful result.");
    }
    return this._error as string;
  }

  public static ok(): Result<void>;
  public static ok<U>(value: U): Result<U>;
  public static ok<U>(value?: U): Result<U | void> {
    return new Result<U | void>(true, value);
  }

  public static fail<U = void>(error: string): Result<U> {
    return new Result<U>(false, undefined, error);
  }
}

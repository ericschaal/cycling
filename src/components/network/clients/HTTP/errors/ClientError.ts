import { ProblemJSONError } from "./ProblemJSONError";

export default class ClientError extends Error {
  public readonly type: string;
  public readonly title: string;
  public readonly status: number;
  public readonly path: string;
  public readonly message: string;

  constructor(problemJSONError: ProblemJSONError) {
    super(`Client error with status code: ${problemJSONError.status}`);
    this.type = problemJSONError.type;
    this.message = problemJSONError.message;
    this.title = problemJSONError.message;
    this.status = problemJSONError.status;
    this.path = problemJSONError.path;
    this.message = problemJSONError.message;
  }
}

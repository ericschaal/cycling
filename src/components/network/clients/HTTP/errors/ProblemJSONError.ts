export interface ProblemJSONError {
  type: string;
  title: string;
  status: number;
  detail: string;
  path: string;
  message: string;
}
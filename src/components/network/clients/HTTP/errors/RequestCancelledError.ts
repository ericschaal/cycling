export default class RequestCancelledError extends Error {
  constructor() {
    super("Network Request was cancelled.");
  }
}

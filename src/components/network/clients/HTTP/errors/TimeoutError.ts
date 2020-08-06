export default class TimeoutError extends Error {
  constructor() {
    super("Network timeout error.");
  }
}
export default class ConnectionError extends Error {
  constructor() {
    super("Connection error. Server unavailable.");
  }
}

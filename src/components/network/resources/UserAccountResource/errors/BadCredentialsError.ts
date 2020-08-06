export default class BadCredentialsError extends Error {
  constructor() {
    super("Failed to login, bad credentials.");
  }
}
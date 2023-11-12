/**
 * Represents an error that occurred during a query.
 */
export class QueryError extends Error {
  constructor(
    public readonly code: number,
    message: string,
  ) {
    super(message);
    this.name = 'QueryError';
  }
}

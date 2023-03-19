class InternalServerError extends Error {
  private readonly code: string

  constructor (message) {
    super(message)
    this.code = 'INTERNAL_SERVER_ERROR'
    this.message = message
  }
}
export default InternalServerError

class ValidationError extends Error {
  private readonly code: string

  constructor (message) {
    super(message)
    this.code = 'VALIDATION_ERROR'
  }
}

export default ValidationError

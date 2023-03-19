import ValidationError from '../errors/ValidationError'

export const validateRequest = ({ schema, data }): boolean => {
  const { error } = schema.validate(data)
  if (typeof error !== 'undefined') {
    throw new ValidationError(error)
  }
  return true
}

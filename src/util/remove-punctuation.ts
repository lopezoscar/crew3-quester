export const removePunctuation = (word): string => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
  return word.replace(regex, '')
}

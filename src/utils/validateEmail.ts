export const validateEmail = (email: string, options?: { strict?: boolean }): boolean => {
  const standardRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const defaultOptions = {
    strict: false
  }

  const mergedOptions = { ...defaultOptions, ...options }

  const isStandardValid = standardRegex.test(email)

  if (!mergedOptions.strict) return isStandardValid

  const isStrictlyValid = !email.includes('..') && !email.endsWith('@')

  return isStandardValid && isStrictlyValid
}

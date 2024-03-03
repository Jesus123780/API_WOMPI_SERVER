interface RequiredFieldsResult {
  error: boolean
  fields: string[]
}

export const checkRequiredFields = (body: any, requiredFields: string[]): RequiredFieldsResult => {
  const missingFields: string[] = []
  for (const field of requiredFields) {
    if (typeof body[field] === 'undefined' || body[field] === null) {
      missingFields.push(field)
    }
  }
  return {
    error: missingFields.length > 0,
    fields: missingFields
  }
}

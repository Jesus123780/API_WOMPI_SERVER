/**
 * Adds a specified number of minutes to the current date and time.
 * @param {number} minutes - The number of minutes to add to the current date.
 * @version 1.0.0
 * @returns {string} The resulting date and time in ISO 8601 format.
 */
export const addMinutesToCurrentDate = (minutes: number): string => {
  // Get the current date and time
  const currentDate: Date = new Date()

  // Add the specified number of minutes to the current date
  currentDate.setTime(currentDate.getTime() + minutes * 60 * 1000)

  // Format the date in ISO 8601 format
  const isoDate: string = currentDate.toISOString()

  // Validate if the result is in ISO 8601 format
  if (!isValidIso8601(isoDate)) {
    throw new Error('Invalid ISO 8601 format')
  }

  // Return the current date plus the specified minutes in ISO 8601 format
  return isoDate
}

/**
 * Validates if a given date string is in ISO 8601 format.
 * @param {string} dateStr - The date string to validate.
 * @returns {boolean} True if the date string is in ISO 8601 format, false otherwise.
 */
function isValidIso8601 (dateStr: string): boolean {
  return new Date(dateStr).toISOString() === dateStr
}

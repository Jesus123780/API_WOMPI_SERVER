"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutesToCurrentDate = void 0;
/**
 * Adds a specified number of minutes to the current date and time.
 * @param {number} minutes - The number of minutes to add to the current date.
 * @version 1.0.0
 * @returns {string} The resulting date and time in ISO 8601 format.
 */
const addMinutesToCurrentDate = (minutes) => {
    // Get the current date and time
    const currentDate = new Date();
    // Add the specified number of minutes to the current date
    currentDate.setTime(currentDate.getTime() + minutes * 60 * 1000);
    // Format the date in ISO 8601 format
    const isoDate = currentDate.toISOString();
    // Validate if the result is in ISO 8601 format
    if (!isValidIso8601(isoDate)) {
        throw new Error('Invalid ISO 8601 format');
    }
    // Return the current date plus the specified minutes in ISO 8601 format
    return isoDate;
};
exports.addMinutesToCurrentDate = addMinutesToCurrentDate;
/**
 * Validates if a given date string is in ISO 8601 format.
 * @param {string} dateStr - The date string to validate.
 * @returns {boolean} True if the date string is in ISO 8601 format, false otherwise.
 */
function isValidIso8601(dateStr) {
    return new Date(dateStr).toISOString() === dateStr;
}
//# sourceMappingURL=index.js.map
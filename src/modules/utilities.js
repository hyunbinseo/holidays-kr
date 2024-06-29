/** @param {Date} date */
export const toROKDateString = (date) =>
	new Date(date.valueOf() + 9 * 60 * 60 * 1000).toISOString().substring(0, 10); // yyyy-MM-dd

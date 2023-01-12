/** @param {Object.<string, string>} preset */
export const generateCsv = (preset) => (
	'\ufeff' // BOM 
	+ 'Start date,Subject\n'
	+ JSON.stringify(preset)
		.replaceAll('","', '\n')
		.replaceAll('":"', ',')
		.replaceAll(/{"|"}/g, '')
);

/**
 * @param {{[date: string]: string}} dates 
 */
export const generateCsv = (dates) => (
	'\ufeff' // BOM 
	+ 'Start date,Subject\n'
	+ JSON.stringify(dates)
		.replaceAll('","', '\n')
		.replaceAll('":"', ',')
		.replaceAll(/{"|"}/g, '')
);

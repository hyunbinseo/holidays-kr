/**
 * @param {{[date: string]: string}} holidays 
 */
export const generateCsv = (holidays) => (
	'\ufeff' // BOM 
	+ 'Start date,Subject\n'
	+ JSON.stringify(holidays)
		.replaceAll('","', '\n')
		.replaceAll('":"', ',')
		.replaceAll(/{"|"}/g, '')
);

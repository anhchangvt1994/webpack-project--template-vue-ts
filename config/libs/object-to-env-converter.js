module.exports = (obj) => {
	if (!obj || typeof obj !== 'object') return

	let tmpENVContent = ''
	for (let key in obj) {
		tmpENVContent +=
			key + '=' + (!obj[key] ? '' : JSON.stringify(obj[key]) + '\n')
	}

	return tmpENVContent
}

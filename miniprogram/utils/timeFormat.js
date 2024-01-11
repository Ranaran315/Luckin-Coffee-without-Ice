
export function getCurrentTime() {
	const date = new Date()
	const hour = date.getHours()
	const minute = date.getMinutes()
	return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2,'0')}`
}

export function getCureentDetailTime() {
	const date = new Date()
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2,'0')
	const day = date.getDate().toString().padStart(2,'0')
	const hour = date.getHours().toString().padStart(2,'0')
	const minute = date.getMinutes().toString().padStart(2,'0')
	return `${year}-${month}-${day} ${hour}:${minute}`
}
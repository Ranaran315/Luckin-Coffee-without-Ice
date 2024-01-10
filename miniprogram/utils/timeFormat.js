
export function getCurrentTime() {
	const date = new Date()
	const hour = date.getHours()
	const minute = date.getMinutes()
	return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2,'0')}`
}
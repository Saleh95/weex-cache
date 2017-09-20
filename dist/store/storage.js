const storage = weex.requireModule('storage')

export function setItem (val) {
	storage.setItem('name', JSON.stringify(val))
}

export function	getItem () {
	return new Promise((resolve, reject) => {
		var dat = null
		storage.getItem('name', event => dat = JSON.parse(event.data))
		if(dat)
			resolve(dat)
		else
			reject(dat)
	})
}

export function removeItem (key) {
	storage.removeItem(key)
}

export function	getAll () {
	return storage.getAllKeys(event => event.data)
}

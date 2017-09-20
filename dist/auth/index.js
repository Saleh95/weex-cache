let axios = require('weex-axios')

export const http = {
	create (baseURL) {
		return axios.create({
			baseURL: `${baseURL}`,
			headers: {
			}
		})
	},
	set (instance, headers, headervars) {
		headervars.map(key => {
			instance.defaults.headers[] = headers[key]
		})
	},
	unset (instance,logoutUrl) {
		return instance.delete(`${logoutUrl}`)
	}
}

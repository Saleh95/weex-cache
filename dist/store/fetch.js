export function authenticateUser (http, path, authParams){
  return new Promise ((resolve, reject) => {
    http.post(`${path}`,authParams)
    .then((response) => {
      resolve(response.headers)
    })
    .catch((error) => {
      reject(error)
    })
  }
  )
}

export function create (http, path, data) {
  return new Promise((resolve, reject) => {
    this.http.post(`/${path}`, data)
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function update (http, path, id, data) {
  return new Promise((resolve, reject) => {
    this.http.put(`/${path}/${id}`, data)
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function deleteData (http, path, id) {
  return new Promise((resolve, reject) => {
    this.http.delete(`/${path}/${id}`)
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function fetch (http, path){
  return new Promise((resolve, reject) => {
    http.get(`${path}`)
    .then((response) => {
      console.log(response)
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export function fetchItem (http, path, id) {
  return fetch(http,`${path}/${id}`)
}

export function fetchItems (http, path, ids) {
  return Promise.all(ids.map(id => fetchItem(http, path, id.id)))
}

export function fetchDetail (http, path, id, key) {
  return fetch(http,`${path}/${id}/${key}`)
}
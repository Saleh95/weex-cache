const cache = {
	install(Vue, options) {
    var vmStore = store
    let auth = require('./dist/auth')
    let vm = auth.http
    let store = require('./dist/store')
    let instance = vm.create(options.baseUrl)
    let router = options.router
    var authenicated = false

    var intializeData = () => {
      var usr = store.getters.userData
      if (!usr && store.getters.authParams) {
        store.dispatch('VALIDATE_TOKEN', {
          http: instance,
          path: options.validateUrl
        })
        .catch(err => {
          login(store.getters.authParams)
        })
      }else if (usr) {
        vm.set(instance, usr, options.authHeaders)
      }
    }

    (function init () {
      store.commit('INIT_STATE', {callback: intializeData})
    })()

    var login = (authParams) => {
      store.dispatch('FETCH_USER',{
        http: instance,
        authUrl: options.authUrl,
        authParams: authParams
      })
      .then((usr) => {
        vm.set(instance, usr, options.authHeaders)
      })
      .then(() => {
        store.commit('SET_USER',
        {
          headers: instance.defaults.headers, 
          authParams: authParams
        })
      })
    }

    Vue.prototype.$data = {
      login: (authParams) => {
        login(authParams)
      },
      fetchList: (type, path, subRoutes) => {
        return store.dispatch('FETCH_LIST_DATA', {
          http: instance,
          type: type,
          path: path,
          keys: subRoutes
        })
      },
      setActiveType: (type) => {
        return store.commit('SET_ACTIVE_TYPE', type)
      },
      ensureType: (path) => {
        return store.dispatch('ENSURE_ACTIVE_ITEMS', {
          http: instance,
          path: path
        })
      },
      logout: () => {
        return vm.unset(instance,options.logoutUrl).
        then(() => {
          authenicated = false
          router.push('/login')
        }).then(() => {
          store.commit('UNSET_USER')
        })
      },
      loadMore: (path) => {
        return store.commit('LOAD_MORE_ITEMS', {
          http: instance,
          path: path
        })
      },
      isAuthenticated: () => {
        return authenicated
      },
      addData: (type, path, data) => {
        return store.commit('ADD_DATA', {
          http: instance,
          path: path,
          type: type,
          data: data
        })
      },
      updateData: (path, id, type,data) => {
        return store.commit('UPDATE_DATA', {
          http: instance,
          path: path,
          id: id,
          type: type,
          data: data
        })
      },
      deleteData: (path, type, id) => {
        return store.commit('DELETE_DATA', {
          http: instance,
          path: path,
          type: type,
          id: id
        })
      }
    }

    Vue.mixin({
      destroyed () {
        store.dispatch('SAVE_STATE')
      }
    })
  }
}

export default cache

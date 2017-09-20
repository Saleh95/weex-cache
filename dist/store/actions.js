import { fetch, fetchItems, fetchItem, fetchDetail, authenticateUser, create, deleteData, update } from './fetch'
import { setItem } from './storage'

const LOAD_MORE_STEP = 10

export function FETCH_LIST_DATA ({commit, dispatch, state}, {http, type, path, keys}) {
  commit('SET_ACTIVE_TYPE', {type})
  return state.lists[type].length > 0
  ? Promise.resolve(state.lists[type])
  : fetch(http, path)
    .then(ids => commit('SET_LIST', {type, ids}))
    .then(() => dispatch('ENSURE_ACTIVE_ITEMS',{http: http, path: path}))
    .then(() =>keys.map(key => dispatch('FETCH_DETAIL',{http: http, path: path, key: key})))
}

export function VALIDATE_TOKEN ({ commit, dispatch }, { http, path }) {
  return fetch(http, path)
}

export function ADD_DATA ({commit, dispatch}, { http, path, type, data }){
  return create(http,path,data).then(() => {
    commit('SET_ACTIVE_TYPE', {type})
    dispatch('ENSURE_ACTIVE_ITEMS',{http: http, path: path})
  })
}

export function DELETE_DATA ({commit, dispatch}, { http, path, id }) {
  return deleteData(http, path, id).then(() => {
    commit('SET_ACTIVE_TYPE', {type})
    dispatch('ENSURE_ACTIVE_ITEMS',{http: http, path: path})
  })
}

export function UPDATE_DATA ({commit, dispatch}, { http, path, id, data }) {
  return update(http, path, id, data).then(() => {
    commit('SET_ACTIVE_TYPE', {type})
    dispatch('ENSURE_ACTIVE_ITEMS',{http: http, path: path})
  })
}

export function LOAD_MORE_ITEMS ({ dispatch, state }, { http, path }) {
  state.counts += LOAD_MORE_STEP
  return dispatch('ENSURE_ACTIVE_ITEMS',{http: http, path: path})
}

export function LOAD_SUB ({ state, commit }, { http, type, id, path }) {
  return fetch(http, path).
    then(val => commit('APPEND_TYPE', {type: type, data: val, id:id}))
}

export function SAVE_STATE ({ state }) {
  setItem(state)
}

export function FETCH_ITEMS ({ commit, state }, { http, path, ids }) {
  const newIds = ids.filter(id => !state.items[id])
  return newIds.length
    ? fetchItems(http, path, newIds).then(items => commit('SET_ITEMS', { items }))
    : Promise.resolve()
}

export function ENSURE_ACTIVE_ITEMS ({ dispatch, getters }, { http, path }) {
  return dispatch('FETCH_ITEMS', {
    http: http, 
    path: path,
    ids: getters.activeIds
  })
}

export function FETCH_ITEM ({ commit, getters }, { http, path, id }) {
  return getters.activeItems[id]
  ? Promise.resolve(getters.activeItems[id])
  : fetchItem(http, path, id, {
    http: http, 
    path: path,
    id: id
  })
}

export function FETCH_DETAIL ({commit, state, getters}, { http, path, key}) {
  return state.lists[key].length > 0
  ? Promise.all(getters.activeIds.map(id => Promise.resolve(state.lists[key][id.id])))
  : Promise.all(getters.activeIds.map(id => fetchDetail(http, path, id.id, key)))
    .then(val => {
      commit('SET_LIST', {type: key, ids: val})
    })
}

export function FETCH_USER ({commit, state},{http, authUrl, authParams}) {
  return state.user[0]
  ? Promise.resolve(state.user[0])
  : authenticateUser(http, authUrl, authParams)
}

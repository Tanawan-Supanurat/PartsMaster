/**
 * ルート(store)
 */

/** 状態 */
export const state = () => ({
  /** システム権限有無 */
  authority: true,
  /** SSO有無 */
  isSso: false,
})

/** 状態変更 */
export const mutations = {
  /** システム権限セット */
  SET_AUTHORITY(state, val) {
    state.authority = !!val
  },
  /** システム権限セット */
  SET_IS_SSO(state, val) {
    state.isSso = !!val
  },
}

/** 処理 */
export const actions = {
  /** SSO初期セット(権限なし、SSOあり) */
  initSso({ commit }) {
    commit('SET_AUTHORITY', false)
    commit('SET_IS_SSO', true)
  },
  /** 権限なし */
  noAuthority({ commit }) {
    commit('SET_AUTHORITY', false)
  },
  /** 権限あり */
  authorized({ commit }) {
    commit('SET_AUTHORITY', true)
  },
}

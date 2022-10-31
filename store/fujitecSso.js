/**
 * シングルサインオン(store)
 */

// インポート
import axios from 'axios'

/** 状態 */
export const state = () => ({
  /** グローバルSSOを有効にするか */
  enablesGsso: false,
  /** 強制的にグローバルSSOを利用するか */
  usesGssoByForce: false,
  /**
   * 認証ベースURL
   *  intranet-gatewayは多段プロキシ回避のため、httpを利用
   */
  baseUrl: 'http://fj0n0106.fujitec.co.jp/',
  /** ログインチェックURL */
  loginCheckUrl: 'oauth2-google/C_client_logincheck_json.aspx',
  /** ログアウトURL */
  logoutUrl: 'C_logout.aspx',
  /** ログインURL */
  loginUrl: 'http://fj0n0106.fujitec.co.jp/C_login.aspx',
  /** 現URL(SID除去。hashについている場合もあるのでその場合も除去) */
  currentUrl:
    location.origin +
    location.pathname +
    location.search.replace(/[?&]SID=[^&]+($|&.*)/g, '$1') +
    location.hash.replace(/[?&]SID=[^&]+($|&.*)/g, '$1'),
  /** SSO期限(秒)
   *  ※システムに応じてセットください。
   *  ※期限が切れると SSO のチェックを行います。
   *  ※SSOの期限が切れていない限り、再認証されて続けて処理できます。
   */
  expireSecond: 10 * 60,
  /** 認証SID */
  sid: null,
  /** ユーザID(兼ログイン確認) */
  userId: null,
  /** ユーザ名 */
  userName: null,
  /** 部課名 */
  departmentId: null,
  /** 部課名 */
  departmentName: null,
  /** 管理職 */
  manager: null,
  /** 期限 */
  expire: null,
  /** 認証済みSID */
  authedSid: null,
  /** クライアントIP */
  ip: null,
  /** クライアント種類 */
  clientKind: '0',
})

/** 状態変更 */
export const mutations = {
  /** localStorage から読み込み */
  READ_STORAGE(state) {
    state.sid = !localStorage.getItem('ssoSid')
      ? null
      : localStorage.getItem('ssoSid')
    state.userId = !localStorage.getItem('ssoUserId')
      ? null
      : localStorage.getItem('ssoUserId')
    state.userName = !localStorage.getItem('ssoUserName')
      ? null
      : localStorage.getItem('ssoUserName')
    state.departmentId = !localStorage.getItem('ssoDepartmentId')
      ? null
      : localStorage.getItem('ssoDepartmentId')
    state.departmentName = !localStorage.getItem('ssoDepartmentName')
      ? null
      : localStorage.getItem('ssoDepartmentName')
    state.manager = !localStorage.getItem('ssoManager')
      ? null
      : localStorage.getItem('ssoManager')
    state.expire = !localStorage.getItem('ssoExpire')
      ? 0
      : parseInt(localStorage.getItem('ssoExpire'))
    state.authedSid = !localStorage.getItem('ssoAuthedSid')
      ? null
      : localStorage.getItem('ssoAuthedSid')
  },
  /** localStorage に保存 */
  SAVE_STORAGE(state) {
    localStorage.setItem('ssoSid', !state.sid ? '' : state.sid)
    localStorage.setItem('ssoUserId', !state.userId ? '' : state.userId)
    localStorage.setItem('ssoUserName', !state.userName ? '' : state.userName)
    localStorage.setItem(
      'ssoDepartmentId',
      !state.departmentId ? '' : state.departmentId
    )
    localStorage.setItem(
      'ssoDepartmentName',
      !state.departmentName ? '' : state.departmentName
    )
    localStorage.setItem('ssoManager', !state.manager ? '' : state.manager)
    localStorage.setItem('ssoExpire', !state.expire ? '' : state.expire)
    localStorage.setItem(
      'ssoAuthedSid',
      !state.authedSid ? '' : state.authedSid
    )
  },
  /** SID セット(localStorageにも保存) */
  SET_SID(state, sid) {
    state.sid = !sid ? null : sid
    localStorage.setItem('ssoSid', !state.sid ? '' : state.sid)
  },
  /** 期限切れをセット(秒でセット)(localStorageにも保存) */
  SET_EXPIRE(state) {
    state.expire = new Date().getTime() + state.expireSecond * 1000
    localStorage.setItem('ssoExpire', !state.expire ? '' : state.expire)
  },
  /** ログイン情報セット */
  SET_LOGIN(state, sso) {
    state.userId = !sso.USERID ? null : sso.USERID
    state.userName = !sso.USERNAME ? null : sso.USERNAME
    state.departmentId = !sso.BUKAID ? null : sso.BUKAID
    state.departmentName = !sso.BUKANAME ? null : sso.BUKANAME
    state.manager = !sso.KANBU ? null : sso.KANBU
    state.authedSid = !sso.SID ? null : sso.SID
  },
  SET_BASE_URL(state, val) {
    state.baseUrl = val
  },
  SET_LOGIN_URL(state, val) {
    state.loginUrl = val
  },
  SET_LOGOUT_URL(state, val) {
    state.logoutUrl = val
  },
  SET_IPINFO(state, ipinfo) {
    state.ip = ipinfo.ip
    state.clientKind = ipinfo.clientKind || '2'
  },
  CLEAR_IPINFO(state) {
    state.ip = null
    state.clientKind = '2'
  },
  /** ログイン情報クリア */
  CLEAR_LOGIN(state) {
    state.sid = null
    state.userId = null
    state.userName = null
    state.departmentId = null
    state.departmentName = null
    state.manager = null
    state.expire = 0
    state.authedSid = null
  },
}

/** 処理 */
export const actions = {
  /** 初期処理(localStrageから戻す) */
  async initial({ state, commit }) {
    commit('READ_STORAGE')
    if (!state.ip) {
      // IP情報取得
      const url = 'https://sbappg.fujitec.co.jp/ip-api/v1/ipinfo/mine'
      await axios
        .get(url)
        .then((res) => {
          // 正常に取得
          if (res && res.data) {
            commit('SET_IPINFO', res.data)
          } else {
            commit('CLEAR_IPINFO')
          }
        })
        .catch((err) => {
          window.console.log(err)
          commit('CLEAR_IPINFO')
        })
      // SSOのhttps時
      if (
        !/[/]nop[/]/.test(location.pathname) &&
        /^https:$/.test(location.protocol)
      ) {
        commit('SET_BASE_URL', 'https://fj0n0106-s.fujitec.co.jp/')
      }
      // GSSOの判定
      if (state.enablesGsso) {
        // GSSO有効の時
        if (state.usesGssoByForce || state.clientKind === '1') {
          commit('SET_LOGIN_URL', 'http://sa0037.fujitec.co.jp/GO_login.aspx')
          commit('SET_LOGOUT_URL', 'GO_logout.aspx')
          if (
            !/[/]nop[/]/.test(location.pathname) &&
            /^https:$/.test(location.protocol)
          ) {
            commit('SET_BASE_URL', 'https://sbappg.fujitec.co.jp/')
          } else {
            commit('SET_BASE_URL', 'http://sa0037.fujitec.co.jp/')
          }
        }
      }
    }
  },
  /** 期限を延長する */
  extendExpire({ commit }) {
    commit('SET_EXPIRE')
  },
  /** 権限チェック(バックエンドから) */
  async checkLogin({ state, commit }, sid) {
    // sid保存
    if (sid) {
      commit('SET_SID', sid)
    }
    // query をパラメータに
    const param = {}
    if (state.sid) {
      param.SID = state.sid
    }
    // ログインチェック
    const res = await axios.get(state.loginCheckUrl, {
      baseURL: state.baseUrl,
      withCredentials: true,
      params: param,
    })
    if (res && res.status === 200 && res.data && res.data.USERID) {
      // ログイン済み
      commit('SET_LOGIN', res.data)
      commit('SAVE_STORAGE')
      commit('SET_EXPIRE')
      return true
    } else {
      // 未ログイン
      commit('CLEAR_LOGIN')
      commit('SAVE_STORAGE')
      return false
    }
  },
  /** ログアウト */
  async logout({ state, commit }) {
    // SID をセット(あるとき)
    const query = {}
    if (state.sid) {
      query.SID = state.sid
    }
    // ログアウト
    try {
      await axios.get(state.logoutUrl, {
        baseURL: state.baseUrl,
        withCredentials: true,
        params: query,
      })
    } catch(e) {
      // http://sa0037.fujitec.co.jp/GO_logout.aspx が CORSエラーになる
      // ただし、ログアウトはされているので、try catchでエラー対応.
    }
    // ログイン情報クリア
    commit('CLEAR_LOGIN')
    commit('SAVE_STORAGE')
  },
}

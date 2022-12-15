/**
 * シングルサインオン(middleware)
 */
export default async ({ store, route, redirect }) => { 
  if (process.browser) {
  //console.log("BROWER",location.hash);
  // SSO初期セット(権限なし. SSOあり)
  store.dispatch('initSso')
  // 初期処理(localStrageから戻す)
  await store.dispatch('fujitecSso/initial')
  // ログアウトページは権限不要
  if (route.path.match(/^[/]logout[/]?$/)) return true
  // ログイン情報なし 又は 期限切れ
  if (
    store.state.fujitecSso.userId === null ||
    store.state.fujitecSso.expire <= new Date().getTime()
  ) {
    // query から SID を読み取る
    let sid = !route.query ? null : route.query.SID
    console.log("MID SID :",sid);
    // SSO は hash 未対応のため、hash に SID がついていたら読み取る
    if (!sid && location.hash.match(/[?&]SID=([^&]+)$/)) {
      sid = location.hash.match(/[?&]SID=([^&]+)$/)[1]
    }
    // ログイン情報取得
    const result = await store.dispatch('fujitecSso/checkLogin', sid);
    console.log("MID SID",sid);
    console.log("MID RESULT :",result);
    
    if (!result) {
      console.log("MID !RESULT:",!result)
      
      // 未ログイン時、ログイン
      const url = store.state.fujitecSso.loginUrl
      // リダイレクト(currentUrlは SID が除去されている)
      // 20210428 リダイレクトだとencodeした文字列を変な値にするようになったので、location.href に変えた.
      console.log("MID URL :",url+ encodeURIComponent(store.state.fujitecSso.currentUrl));
      console.log("AFTHER DEST :",encodeURIComponent(store.state.fujitecSso.currentUrl))
      /*
      location.href =
        url + '?dest=' + encodeURIComponent(store.state.fujitecSso.currentUrl)
      */
        
      return false
    } else if (sid) {
      /*
      // クエリーにSIDが存在
      // クエリーのSIDを除去
      const query = {}
      Object.assign(query, route.query)
      delete query.SID
      // リダイレクト(再読み込みしない?)
      redirect(route.path, query)
      */
      console.log(" MID SID:",sid)
      return false
    }
  }
  
  // ログイン済. 権限OKをセット
  store.dispatch('authorized')
  // SSO有効期限延長(無効にすると規定時間でSSO認証が必要となる)
  store.dispatch('fujitecSso/extendExpire')
  
  }
  return true
}

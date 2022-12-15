/**
 * ミドルウェア(ダークモードの読み込みとセット)
 * ※ページ処理の前に実行するカスタム定義
 */
export default ({ app }) => {

  if (process.client) {
    const dark = localStorage.getItem('vuetify_theme_dark')
    // darkが保存されていれば読み込み
    if (dark) {
      app.context.$vuetify.theme.dark = dark === '1'
    }
  }
}

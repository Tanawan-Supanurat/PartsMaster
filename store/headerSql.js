import Vuex from 'vuex'
import axios from 'axios'

/** 状態 */
export const state = () => ({
    headerItem:[],
})
/** 状態変更 */
export const mutations = {
    setHeader (state,{headerItem}){
        state.headerItem = headerItem
    }
}
/** 処理 */
export const actions ={
    async fetchItems({commit},req){
        //const url = "http://sa0392.cad.fujitec.co.jp/pmserver/api/KensakuBtnGet?Table_Id="+req.id;//テスト用本番環境用
        const url = "http://localhost:59272/api/KensakuBtnGet?Table_Id="+req.id;//テスト用
        await axios.get(url).then(res=>
        {
            commit('setHeader',{headerItem: res.data})
        }).catch(err=>{

        })
    }
}
import Vuex from 'vuex'
import axios from 'axios'


export const state = () => ({
    headerItem:[],
})

export const mutations = {
    setHeader (state,{headerItem}){
        state.headerItem = headerItem
    }
}

export const actions ={
    async fetchItems({commit},req){
        const url = "http://localhost:59272/api/KensakuBtnGet?Table_Id="+req.id;
        await axios.get(url).then(res=>
        {
            commit('setHeader',{headerItem: res.data})
        }).catch(err=>{

        })
    }
}
export default async ({ store, route })=>{
    //IDのページだけ対応
    if(route.name =='searchpage-id')
    {
        await store.dispatch('headerSql/fetchItems',{id :route.params.id});
    }
    return true
}
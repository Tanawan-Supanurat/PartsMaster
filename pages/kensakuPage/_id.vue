<template>
    <div>
    </div> 
</template>

<script>
import { mapState } from 'vuex'
export default {
data:()=>({
    header:{
        showHeader : true,
    }
}),
mounted(){
    this.Initial_Id_Page();
},
computed:{
    ...mapState('headerSql',['headerItem']),
},
methods:{
    Initial_Id_Page(){
        this.$nuxt.$emit('updateHeader',this.header.showHeader)
    }
},
}
</script>

<style>
.v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
    font-size:0.8em;
    height: 25px;
}
p {
    margin-bottom: -4pt !important ;
    font-size:0.8em;
}
.v-radio label {
    font-size:0.8em;
}
.left-input input {
    text-align: left;
    }

    .center-input input {
    text-align: center;
    }

    .right-input input {
    text-align: right;
    }
</style>


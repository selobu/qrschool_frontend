<template>
    <EasyDataTable
        buttons-pagination
        show-index
        :rows-per-page="rowsPerPage"
        :headers="headers"
        :items="rows"
        table-height='500px'>
    </EasyDataTable>
</template>
<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {datatable} from '../../tools/fake' 

export default {
    props: {
        'modelValue':{type:Object, required:false},
        'headers': {default: datatable.headers_easy, type:Array },
        'rows': {default: datatable.items_easy, type:Array },
        'height': {default: '500px', type:String},
        'rowsPerPage': {default:10, required:false},
    },
    emits: ['update:modelValue'],
    data:()=>({
        table:null,
    }),
    components:{
        EasyDataTable: Vue3EasyDataTable
    },
    mounted(){
        this.$emit('update:modelValue', this.table)
    }
}
</script>
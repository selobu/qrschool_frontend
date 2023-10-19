<template>
    <EasyDataTable
        buttons-pagination
        show-index
        :rows-per-page="rowsPerPage"
        :headers="headers"
        :items="newrows"
        :table-height="height"
        :table-class-name="$vuetify.theme.name === 'dark' ? 'default table-darkmode':'default' "
        @click-row="$emit('clickRow',$event)"
        >
    </EasyDataTable>
</template>
<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import {datatable} from '../../tools/fake' 
import {mask} from '../../tools' 

export default {
    props: {
        'modelValue':{type:Object, required:false},
        'headers': {default: datatable.headers_easy, type:Array },
        'rows': {default: datatable.items_easy, type:Array },
        'height': {default: 400, type:String},
        'rowsPerPage': {default:10, required:false},
        'maskcolumns': {default:[], required: false, type:Array},
    },
    emits: ['update:modelValue','clickRow'],
    data:()=>({
        table:null,
    }),
    components:{
        EasyDataTable: Vue3EasyDataTable
    },
    mounted(){
        this.$emit('update:modelValue', this.table)
    },
    computed:{
        newrows(){
            if (this.maskcolumns.length === 0){
                return this.rows
            }
            var result = this.rows
            for (const key of this.maskcolumns){
                result.forEach((value,index,array)=>{
                    array[index][key] = mask(value[key])
                })
            }
            return result
        }
    }
}
</script>
<style>
.table-darkmode {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #2d3a4f;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #4c5d7a;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #2d3a4f;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;


  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
.default{

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;


  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;
}
</style>
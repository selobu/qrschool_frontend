<template>
    <div :id="elementid" style="height: 300px;"></div>
</template>
<script>
import "frappe-datatable/dist/frappe-datatable.min.css";

import DataTable from "frappe-datatable";
import getSampleData from "./data.js";
import { v4 as uuidv4 } from 'uuid';

export default {
    data:()=>{
        const { columns, data } = getSampleData();
        return {
            elementid: uuidv4(),
            el: null,
            columns,
            data,
            table:  null}
    },
    mounted(){
        this.createTable()
    },
    methods:{
        createTable(){
            this.el = document.getElementById(this.elementid)
            this.table = new DataTable(this.el, {
                columns: this.columns,
                data: this.data,
                checkboxColumn: true,
                inlineFilters: true,
                layout: "fluid"
                });
        },
        getcsv(){

        }
    }

}
</script>
<template>
    <div :id="elementid" style="height: 300px;"></div>
</template>
<script>
import "frappe-datatable/dist/frappe-datatable.min.css";

import DataTable from "frappe-datatable";
import getSampleData from "./data.js";
import { v4 as uuidv4 } from 'uuid';

export default {
    data:()=>({
        elementid: uuidv4().slice(-12,-1),
        el: null,
        columns:[],
        data:[],
        table:  null
    }),
    mounted(){
        const { columns, data } = getSampleData();
        this.columns = columns
        this.data = data
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
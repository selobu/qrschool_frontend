<template>
    <div :id="element" style="height: 300px;"></div>
</template>
<script>
import "frappe-datatable/dist/frappe-datatable.min.css";

import DataTable from "frappe-datatable";
import getSampleData from "./data.js";
import { v4 as uuidv4 } from 'uuid';

export default {
    data:()=>({
        element: uuidv4(),
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
            this.el = document.getElementById(this.element)
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
<template>
    <div id="wrapper" :style="`height: ${height}`"></div>
</template>
<script>
import "gridjs/dist/theme/mermaid.css";
import { RowSelection } from "gridjs/plugins/selection";
import {Grid} from 'gridjs'
import {datatable} from '../../tools/fake.js'

export default {
    name:'vtabulator',
    props: {
        modelValue: Object,
        rowsSelected: Array,
        height:{type: String, default:'300px', required:false}
    },
    emits: ['update:modelValue','update:rowsSelected'],
    computed: {
        tabulator: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        selected:{
            get(){
                return this.rowsSelected
            },
            set(value){
                this.$emit('update:rowsSelected', value)
            }
        }
    },
    data:()=>({
        itemsPerPage: datatable.itemsPerPage,
        selectedItems: [],
        grid: null,
        headers: datatable.headers,
        asistencia: datatable.asistencia,
        headersausentes: datatable.headersausentes,
        estudiantes: datatable.estudiantes,
        tableData: datatable.tabulatordata
    }),
    mounted() {
      //instantiate Tabulator when element is mounted

      this.grid = new Grid({
        columns: [
                {
                    id: 'myCheckbox',
                    name: 'Select',
                    plugin: {
                        // install the RowSelection plugin
                        component: RowSelection,
                    }
                },
                { 
                    name: 'Name',
                    formatter: (cell) => `Name: ${cell}`
                },
                'email',
                'Phone Number',
            ],
        data: [
            ['John', 'john@example.com', '(353) 01 222 3333'],
            ['Mark', 'mark@gmail.com',   '(01) 22 888 4444']
        ],
        sort: true,
        pagination: true,
        fixedHeader: true,
        search: true,
        height: this.height,
        })

        this.grid.render(document.getElementById("wrapper"))
        const nuevo = this
        this.grid.config.store.subscribe(function (state) {
            nuevo.updateSelected(state);
        })
        this.tabulator = this.grid
    },
    methods:{
        exportcsv(){
            this.tabulator.download("csv", "data.csv")
        },
        updateSelected(state){
            if ( state.rowSelection === undefined){
                return
            }
            this.selectedItems = state.rowSelection.rowIds
            this.selected = this.selectedItems
        }
    }
}
</script>
<template>
    <v-container fluid class="px-0 py-0">
        <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
            >
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Registrar</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                    variant="text"
                    @click="dialog = false"
                    >
                    Grabar
                    </v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" >
                            <v-card max-height="500px" elevation="3">
                                <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-warning'">Listado</v-card-title>
                                <v-card-text>
                                    <p><br/><strong>Total registrados: 8</strong></p>
                                    <v-data-table
                                        height="360px"
                                        v-model:items-per-page="itemsPerPage"
                                        :headers="headersausentes"
                                        :items="estudiantes"
                                        item-value="grado"
                                        class="elevation-2"
                                    ></v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            
        </v-dialog>
        <v-row>
            <v-toolbar density="compact">
                <v-btn icon @click="dialog=true" title="Agregar">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon title="Exportar" @click="exportcsv">
                    <v-icon>mdi-file-delimited-outline</v-icon>
                </v-btn>
                <v-divider :vertical="true" class="border-opacity-75"></v-divider>
                <p class="mx-2">Filtros:</p>
                <v-autocomplete
                    label="Rol"
                    :items="['All', 'Estudiante', 'Docente', 'Acudiente']"
                    style="max-width: 200px;"
                    class="mx-1"
                    >
                </v-autocomplete>
                <v-autocomplete
                    label="Grupo"
                    :items="['8','7','6']"
                    style="max-width: 200px;"
                    class="mx-1"
                    >
                </v-autocomplete>
            </v-toolbar>
            <v-col cols="12">
                <div ref="table" id="tabulator"></div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import {datatable} from '../../tools/fake.js'
import { VDatePicker } from 'vuetify/labs/VDatePicker'

import  "tabulator-tables/dist/css/tabulator.min.css";
import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library

export default {
    data:() => ({
        dialog: false,
        userslist: [],
        escanear: false,
        itemsPerPage: datatable.itemsPerPage,
        headers: datatable.headers,
        asistencia: datatable.asistencia,
        headersausentes: datatable.headersausentes,
        estudiantes: datatable.estudiantes,
        fromDateVal: null,
        minDate: "2019-07-04",
        maxDate: "2019-08-30",
        tabulator: null, //variable to hold your table
        tableData: [
                    {id:1, name:"Billy Bob", age:12, gender:"male", height:95, col:"red", dob:"14/05/2010"},
                    {id:2, name:"Jenny Jane", age:42, gender:"female", height:142, col:"blue", dob:"30/07/1954"},
                    {id:3, name:"Steve McAlistaire", age:35, gender:"male", height:176, col:"green", dob:"04/11/1982"},
                ], //data for table to display
    }),
    components:{
        VDataTable,
        VDatePicker
    },
    mounted() {
      //instantiate Tabulator when element is mounted
      this.tabulator = new Tabulator(this.$refs.table, {
        data: this.tableData, //link data to table
        reactiveData:true, //enable data reactivity
        autoColumns:true,
        layout:"fitDataStretch",
        selectable:true,
      });
    },
    methods:{
        exportcsv(){
            this.tabulator.download("csv", "data.csv")
        }
    }
}
</script>
<style scoped>
#tabulator{
    height: 400px;
}
</style>
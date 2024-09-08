<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="6">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0': 'bg-primary py-0'">Asistencia</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart :labels="asistencialabels" :datasets="asistenciadatasets"/>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0' : 'bg-info  py-0'">Ausentismo</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart :labels="ausencialabels" :datasets="ausenciadatasets" />
                    </v-card-text>
                </v-card>
            </v-col>
            <!-- <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0': 'bg-primary  py-0'">Desempeño</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
                    </v-card-text>
                </v-card>
            </v-col> -->
            <v-col cols="12" lg="6" >
                <v-card height="400px">
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 text-left py-0':'py-0 text-left bg-warning'">Estudiantes ausentes</v-card-title>
                    <v-card-text>
                        <v-data-table
                            height="300px"
                            v-model:items-per-page="itemsPerPage"
                            :headers="headersausentes"
                            :items="estudiantes"
                            item-value="grado"
                            class="elevation-2"
                        ></v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card height="400px">
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0': 'py-0 bg-info'"> Asistencia por grado</v-card-title>
                    <v-card-text>
                        <v-data-table
                            height="300px"
                            v-model:items-per-page="itemsPerPage"
                            :headers="headers"
                            :items="asistencia"
                            item-value="grado"
                            class="elevation-2"
                        >
                        <template v-slot:item.asistencia="{ item }">
                            <v-chip :color="getColor(item.columns.asistencia)"> 
                                {{ item.columns.asistencia }}
                            </v-chip>
                        </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import BarChart from '../components/charts/barchart.vue'
import { VDataTable } from "vuetify/labs/VDataTable";
import {datatable} from '../tools/fake.js'
import { get } from '../tools/requests';

export default {
    data:()=>({
        itemsPerPage: datatable.itemsPerPage,
        headers: datatable.headers,
        asistencia: [],
        headersausentes: datatable.headersausentes,
        estudiantes: [],
        chartOptions: [],
        asistenciadatasets: [],
        asistencialabels: [],
        ausencialabels: [],
        ausenciadatasets: [],
    }),
    components:{
        BarChart,
        VDataTable
    },
    methods:{
        getColor: datatable.getColor,
        async readAsistencia(){
            let response = await get('dashboard/dailyattendance', 5, true,  true)
            let fechas = []
            let cantidades = []
            for (const key in response.data){
                var {Date, Count} = response.data[key]
                fechas.push(Date)
                cantidades.push(Count)
            }
            this.asistencialabels = fechas
            this.asistenciadatasets = [{ data: cantidades,
                label:'Asistencia',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.7)'}]

        },
        async readAusentismo(){
            let response = await get('dashboard/dailyabscent',  5, true,  false)
            let fechas = []
            let cantidades = []
            for (const key in response.data){
                var {Date, Count} = response.data[key]
                fechas.push(Date)
                cantidades.push(Count)
            }
            this.ausencialabels = fechas
            this.ausenciadatasets = [{ data: cantidades,
                label:'Ausencia',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.7)'}]
        },
        async readTodaysAbscent(){
            let response = await get('dashboard/todayabscent',  1, true,  false)
            let estudiantes = []
            for (const key in response.data){
                var {Date, grade, name, last_name } = response.data[key]
                estudiantes.push({date: Date, grade, name, lastname:last_name})
            }
            this.estudiantes = estudiantes
        },
        async attendancePerGrade(){
            let response = await get('dashboard/attendancepergradetoday', 5, true, false)
            let asistencia = []
            for (const key in response.data){
                var {Date, gradeid, grade, attendance } = response.data[key]
                asistencia.push({Date, gradeid, grade, attendance})
            }
            this.asistencia = asistencia
        }
    },
    async mounted(){
        this.readAsistencia()
        this.readAusentismo()
        this.readTodaysAbscent()
        this.attendancePerGrade()
    }
}
</script>
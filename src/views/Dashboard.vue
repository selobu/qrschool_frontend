<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0': 'bg-primary py-0'">Asistencia</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart :labels="asistencialabels" :datasets="asistenciadatasets"/>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0' : 'bg-info  py-0'">Asentismo</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0': 'bg-primary  py-0'">Desempeño</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
                    </v-card-text>
                </v-card>
            </v-col>
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
        asistencia: datatable.asistencia,
        headersausentes:datatable.headersausentes,
        estudiantes:datatable.estudiantes,
        chartOptions:[],
        asistenciadatasets:[]
    }),
    components:{
        BarChart,
        VDataTable
    },
    methods:{
        getColor: datatable.getColor
    },
    async mounted(){
        let response = await get('asistencia/last7/', 20)
        var fechas = []
        var cantidades = []
        for (const key in response.data){
            var {fecha, cantidad} = response.data[key]
            fechas.push(fecha.split('T')[0])
            cantidades.push(cantidad)
        }
        this.asistencialabels = fechas
        this.asistenciadatasets = [{ data: cantidades,
            label:'Asistencia',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.7)'}]
    }
}
</script>
<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3 py-0': 'bg-primary py-0'">Estudiantes</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
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
                <v-card height="400">
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
                <v-card height="400">
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

export default {
    data:()=>({
        itemsPerPage:15,
        headersausentes: [{ title: 'Nombre', align: 'center', key: 'name', sortable: true, },
          { title: 'grado', align: 'center', key: 'grado', sortable: true, }
        ],
        headers: [
          { title: 'grado', align: 'end', key: 'grado', sortable: true, },
          { title: 'asistencia', align: 'end', key: 'asistencia', sortable: true, }
        ],
        asistencia:[
            {grado:8, asistencia: 70},
            {grado:9, asistencia: 85},
            {grado:10, asistencia: 95},
            {grado:7, asistencia: 100},
            {grado:5, asistencia: 40},
            {grado:4, asistencia: 80},
            {grado:11, asistencia: 85},
            ],
        estudiantes:[
            {name:'Sebastian', grado:9},
            {name:'Maria', grado:9},
            {name:'Pedro', grado:11},
            {name:'Pablo', grado:10},
            {name:'Pepito', grado:6},
            {name:'Lucas', grado:7},
            {name:'Eduardo', grado:8},
            {name:'Cristian', grado:9},
            {name:'Andrea', grado:9},
        ]
    }),
    components:{
        BarChart,
        VDataTable
    },
    methods:{
        getColor(asistencia){
            if (asistencia <= 70) return 'red'
            else if (asistencia <= 85) return 'orange'
            else return 'green'            
        }
    }
}
</script>
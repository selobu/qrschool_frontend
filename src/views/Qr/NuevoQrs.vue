<template>
    <v-container fluid>
        Generar carnet nuevo
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
    </v-container>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
    data:()=>({
        tab:'one',
        itemsPerPage:15,
        headersausentes: [{ title: 'Nombre', align: 'center', key: 'name', sortable: true, },
          { title: 'grado', align: 'center', key: 'grado', sortable: true, }
        ],
        headers: [
          { title: 'Grado', align: 'end', key: 'grado', sortable: true, },
          { title: '% Asistencia', align: 'end', key: 'asistencia', sortable: true, }
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
    }),
    components:{
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
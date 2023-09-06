<template>
    <v-container fluid>
        <v-data-table
            height="400px"
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
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import {datatable} from '../tools/fake.js'

export default {
    data:()=>({
        itemsPerPage: datatable.itemsPerPage,
        headers: datatable.headers,
        asistencia: datatable.asistencia
    }),
    components:{
        VDataTable
    },
    methods:{
        getColor: datatable.getColor
    }
}
</script>
<template>
    <v-container fluid class="px-0 py-0">
        <v-row>
            <v-col cols="12" lg="6">
                <v-card v-if="!escanear" :height="escanear ? '500px': '150px'" elevation="3" class="px-0">
                    <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-info'"> Registrar códigos </v-card-title>
                    <br/>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn variant="outlined" color="primary" @click="escanear=true">Escanear</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                <qr-reader v-else :multiple="true" v-model="userslist" height="500">
                    <template v-slot:actions>
                        <v-btn variant="outlined" color="error" @click="escanear=false">
                            Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn variant="outlined" color="success">
                            Registrar
                        </v-btn>
                    </template>
                </qr-reader>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card height="500" elevation="3">
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
    </v-container>
</template>
<script>
import QrReader from '../../components/core/QrReader.vue'
import { VDataTable } from "vuetify/labs/VDataTable";
export default {
    data:() => ({
        userslist:[],
        escanear: false,
        itemsPerPage:15,
        headersausentes: [{ title: 'Nombre', align: 'center', key: 'name', sortable: true, },
          { title: 'grado', align: 'center', key: 'grado', sortable: true, }
        ],
        headers: [
          { title: 'grado', align: 'end', key: 'grado', sortable: true, },
          { title: 'asistencia', align: 'end', key: 'asistencia', sortable: true, }
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
        QrReader,
        VDataTable
    }
}
</script>
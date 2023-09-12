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
                <v-toolbar-title><v-icon>mdi-account-group</v-icon> Asistencia</v-toolbar-title>
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
                        <v-col cols="12" lg="6">
                            <qr-reader 
                                :multiple="true" 
                                v-model="userslist"
                                max-height="400px">
                                <template v-slot:actions>
                                </template>
                            </qr-reader>
                        </v-col>
                        <v-col cols="12" lg="6">
                            <v-card elevation="3">
                                <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-warning'">Listado</v-card-title>
                                <v-card-text>
                                    <p><br/><strong>Total registrados: {{ rows.length }}</strong></p>
                                    <easy-data-table :rows="rows" :headers="headers"></easy-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="12">
                <v-toolbar density="compact" class="toolbarmenu">
                    <v-btn icon @click="dialog=true" title="Agregar">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon title="Exportar"
                        @click="generarcsv">
                        <v-icon>mdi-file-delimited-outline</v-icon>
                    </v-btn>
                </v-toolbar>
                <easy-data-table v-model="table"></easy-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import QrReader from '../../components/core/QrReader.vue'
import EasyDataTable from "../../components/core/EasyDataTable.vue"
import {datatable} from '../../tools/fake.js'

export default {
    data:() => ({
        table:null,
        dialog: false,
        userslist: [],
        escanear: false,
        headers: [{ text: "Código QR", value: "qr" }],
        itemsPerPage: datatable.itemsPerPage,
        asistencia: datatable.asistencia,
        headersausentes: datatable.headersausentes,
        estudiantes: datatable.estudiantes,
    }),
    computed:{
        rows(){
            var result= []
            for (const element of this.userslist){
                result.push({qr: element})
            }
            return result
        }
    },
    components:{
        QrReader,
        EasyDataTable
        },
    methods:{
        generarcsv(){
            'Generar csvdata'
        }
    }
}
</script>
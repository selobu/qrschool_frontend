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
                            <v-card v-if="!escanear" :max-height="escanear ? '500px': '150px'" elevation="3" class="px-0">
                                <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-info'"> Registrar códigos </v-card-title>
                                <br/>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                        <v-btn variant="outlined" color="primary" @click="escanear=true">Escanear</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                            <qr-reader v-else :multiple="true" v-model="userslist" max-height="500px">
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
                            <v-card max-height="500px" elevation="3">
                                <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-warning'">Listado</v-card-title>
                                <v-card-text>
                                    <p><br/><strong>Total registrados: 8</strong></p>
                                    <frappe-table></frappe-table>
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
                    <v-btn icon title="Exportar">
                        <v-icon>mdi-file-delimited-outline</v-icon>
                    </v-btn>
                </v-toolbar>
                <frappe-table></frappe-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import QrReader from '../../components/core/QrReader.vue'
import FrappeTable from "../../components/core/Frappetable.vue"
import {datatable} from '../../tools/fake.js'

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
    }),
    components:{
        QrReader,
        FrappeTable
    }
}
</script>
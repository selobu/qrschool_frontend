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
                <v-btn icon @click="dialog=true" >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
            <v-col cols="12">
                <v-data-table
                    height="360px"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headersausentes"
                    :items="estudiantes"
                    item-value="grado"
                    class="elevation-2">
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import QrReader from '../../components/core/QrReader.vue'
import { VDataTable } from "vuetify/labs/VDataTable";
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
        VDataTable
    }
}
</script>
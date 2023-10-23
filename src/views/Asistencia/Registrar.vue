<template>
    <v-container fluid class="px-0 py-0">
        <v-dialog  v-model="exitoso"
            transition="dialog-bottom-transition"
            width="auto">
            <v-card>
                <v-toolbar
                :color="$vuetify.theme.name === 'dark' ? 'grey-darken-3' : 'success'"
                title="Opening from the bottom"
                ></v-toolbar>
                <v-card-text>
                    <div class="text-h4 pa-12">Registro exitoso!</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    variant="text"
                    @click="exitoso = false"
                >Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark :color="$vuetify.theme.name === 'dark' ? 'grey-darken-3' : 'primary'">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title><v-icon>mdi-account-group</v-icon> Asistencia</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    
                    <v-row>
                        <v-col cols="12" md="6" lg="6">
                            <qr-reader :multiple="true" v-model="qrlist" max-height="400px">
                                <template v-slot:actions>
                                    <div></div>
                                </template>
                            </qr-reader>
                        </v-col>
                        <v-col cols="12" md="6" lg="6">
                            <v-card elevation="3" max-height="400px">
                                <v-card-title
                                    :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-warning'">Qrs identificados
                                </v-card-title>
                                <v-card-text>
                                    <p><br /><strong>Total registrados: {{ rows.length }}</strong></p>
                                    <easy-data-table :rows="rows" :headers="headers"
                                        :maskcolumns="['qr']"></easy-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row class="justify-end">
                        <v-col cols="12" md="6" lg="6" >
                            <v-card elevation="3">
                                <v-card-actions>
                                    <v-btn block @click="save()" :loading="loadingSaveBtn" color="success" size="large"
                                        variant="elevated" title="Grabar">Grabar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="12">
                <v-toolbar density="compact" class="toolbarmenu">
                    <v-btn icon @click="dialog = true" title="Agregar">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon title="Exportar" @click="generarcsv">
                        <v-icon>mdi-file-delimited-outline</v-icon>
                    </v-btn>
                </v-toolbar>
                <table-by-url v-model="qrlist" :url="url" @click-row="clickedRow"></table-by-url>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar density="compact" class="toolbarmenu">
                    <v-toolbar-title> Asistentes {{ currdate }}</v-toolbar-title>
                </v-toolbar>
                <table-by-url v-model="asistentes" :url="urlasistentes" :memorize="false"></table-by-url>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import QrReader from '../../components/core/QrReader.vue'
import TableByUrl from '../../components/core/TableByUrl.vue'
import { datatable } from '../../tools/fake.js'
import { post } from '../../tools/requests'
import EasyDataTable from '../../components/core/EasyDataTable.vue'

export default {
    data: () => ({
        exitoso: false,
        table: null,
        dialog: false,
        loadingSaveBtn: false,
        asistenciaid: null, 
        qrlist: [],
        asistentes: [],
        urlasistentes: '',
        url: 'asistencia/',
        escanear: false,
        headers: [{ text: "Código QR", value: "qr" }],
        itemsPerPage: datatable.itemsPerPage,
        asistencia: datatable.asistencia,
        headersausentes: datatable.headersausentes,
        estudiantes: datatable.estudiantes,
        currdate: ''
    }),
    computed: {
        rows() {
            var result = []
            if (this.qrlist === null ) return result
            for (const element of this.qrlist) {
                result.push({ qr: element })
            }
            return result
        }
    },
    components: {
        QrReader,
        TableByUrl,
        EasyDataTable
    },
    methods: {
        generarcsv() {
            'Generar csvdata'
        },
        async save() {
            if (this.qrlist.length === 0) return
            const data = {qrs: this.qrlist}
            this.loadingSaveBtn = true
            const nuevo = this
            return post('/asistencia/', data).then((response) => {
                // TODO process response
                nuevo.qrlist = [];
                nuevo.exitoso = true;
            }).catch((error) => {
                console.log(error);
                alert(error)
            }).finally(() => {
                nuevo.loadingSaveBtn = false})
        },
        clickedRow(event){
            this.currdate=event.timestamp
            this.asistencia_id = event.asistenciaid
            if (this.asistencia_id === undefined) {
                this.urlasistentes = ''
                return
            }
            const url = `asistencia/${this.asistencia_id}/`
            this.urlasistentes = url
        }
    }
}
</script>
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
                                <v-toolbar density="compact"  v-if="qrlist?.length || 0 > 0">
                                    <v-spacer></v-spacer>
                                    <v-btn icon small @click="clear" title="Limpiar">
                                        <v-icon>mdi-eraser</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <p><br /><strong>Total registrados: {{ rows.length }}</strong></p>
                                    <easy-data-table :rows="rows" :headers="headers"
                                        :maskcolumns="['qr']"></easy-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row class="justify-end" v-if="qrlist?.length || 0 > 0">
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
                <v-alert v-if="pendientesenvio > 0"
                text="Hay envios pendientes  "
                type="warning"
                variant="outlined"
                border="top"
                closable
                >
                <v-btn v-if="isonline" rounded variant="outlined" :loading="loading" @click="enviarPendientes">
                    <v-icon>mdi-send</v-icon>enviar
                </v-btn>
                <v-chip v-else color="error">Sin internet</v-chip>
                </v-alert>
                <v-toolbar density="compact" class="toolbarmenu">
                    <v-btn icon @click="dialog = true" title="Agregar">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon title="Exportar" @click="generarcsv" :disabled="disablegeneratecsv">
                        <v-icon>mdi-file-delimited-outline</v-icon>
                    </v-btn>
                </v-toolbar>
                <table-by-url v-model="qrlist" 
                    :url="url" 
                    @click-row="clickedRow" 
                    :not2filter="not2filter" 
                    :memorize="false"
                    :showfilters="true">
                </table-by-url>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-toolbar density="compact" class="toolbarmenu">
                    <v-toolbar-title> Asistentes {{ currdate }}</v-toolbar-title>
                </v-toolbar>
                <table-by-url v-model="asistentes" 
                :url="urlasistentes" 
                :memorize="true" 
                :maxage="30"></table-by-url>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import QrReader from '../../components/core/QrReader.vue'
import TableByUrl from '../../components/core/TableByUrl.vue'
import { datatable } from '../../tools/fake.js'
import { post, _fixurl, download } from '../../tools/requests'
import EasyDataTable from '../../components/core/EasyDataTable.vue'
import { db } from '../../plugins/dexie.js'

export default {
    data: () => ({
        exitoso: false,
        table: null,
        dialog: false,
        loadingSaveBtn: false,
        loading: false,
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
        currdate: '',
        pendientesenvio: 0,
        disablegeneratecsv: false,
        not2filter:['total'],
    }),
    computed: {
        rows() {
            var result = []
            const len = this.qrlist?.length
            if (len === undefined) return result
            if (this.qrlist.length  === 0 ) return result
            for (const element of this.qrlist) {
                result.push({ qr: element })
            }
            return result
        },
        isonline(){
            return navigator.onLine
        }
    },
    components: {
        QrReader,
        TableByUrl,
        EasyDataTable
    },
    methods: {
        async generarcsv() {
            const args = ['page=1','per_page=200','format=csv']
            this.disablegeneratecsv = true
            try{
                await download(_fixurl(`${this.url}?${args.join('&')}`), 'qrschool.csv')
            } finally {
                this.disablegeneratecsv = false
            }
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
            this.asistencia_id = event.id
            if (this.asistencia_id === undefined) {
                this.urlasistentes = ''
                return
            }
            const url = `asistencia/${this.asistencia_id}/`
            this.urlasistentes = url
        },
        readposts(){
            const tofind = _fixurl('asistencia/')
            db['Post'].where("url").equalsIgnoreCase(tofind).count().then((result) => 
            this.pendientesenvio = result
        );
        },
        async enviarPendientes(){
            this.loading = true
            try {
                const tofind = _fixurl('asistencia/')
                await db['Post'].where("url").equalsIgnoreCase(tofind).toArray().then((results) => this._sendresults(results));
            } finally {
                this.loading = false
                this.readposts()
            }
        },
        async _sendresults(results){
            for (const data of results){
                const { id, url, jsondata} = data
                console.log(url)
                console.log(jsondata)
                await post(url, jsondata,  true,  false).then(
                    ()=>{
                        db['Post'].where({id}).delete()
                    }
                )
            }
        },
        clear(){
            this.qrlist = [];
            // closing scan dialog
            this.dialog = false
        }
    },
    beforeUpdate(){
        this.readposts()
    },
    beforeMount(){
        this.readposts()
    }
}
</script>
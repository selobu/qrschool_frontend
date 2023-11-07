<template>

    <v-container fluid class="px-0 py-0">
        <form-dialog 
        v-model="dialog" 
        title="Registrar ausencia" 
        cols="12"
        md="12"
        lg="12"
        :submit="onsubmit">
            <template v-slot:form>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <user-select v-model="userdata"/>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-card>
                        <v-card-title
                        :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-secondary'"
                        ><user-avatar :email="userdata?.correo || ''" :size="60"></user-avatar>
                            Seleccionado
                        </v-card-title>
                        <v-table>
                            <thead>
                            <tr>
                                <th class="text-left">
                                Propiedad
                                </th>
                                <th class="text-left">
                                Valor
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="[key, value] of Object.entries(userdata)"
                                :key="key"
                            >
                                <td>{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                        <v-row class="px-2 py-4">
                            <v-col class="d-flex align-center ">
                            <div class="px-2"> Fecha Reporte</div>
                            </v-col>
                            <v-col>
                                <v-text-field type="date" v-model="fecha"/>
                            </v-col>
                        </v-row>
                        
                        <v-textarea placeholder="Comentario ausencia" v-model="comentario">
                        </v-textarea>
                        <v-card-actions v-if="Object.keys(userdata).length > 0">
                            <v-btn :loading="loading" block color="success" size="large" type="submit"
                                variant="elevated">
                                Grabar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            </template>
            <template v-slot:actions>
                <div></div>
            </template>
        </form-dialog>
        <v-row>
            <v-col cols="12">
                <v-toolbar density="compact" border>
                    <v-btn icon @click="dialog=true" title="Agregar">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon title="Exportar" @click="exportcsv">
                        <v-icon>mdi-file-delimited-outline</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-toolbar border density="compact" v-if="false">
                    <v-icon aria-disabled="true" title="filtros">mdi-filter</v-icon>
                    <v-text-field
                        width="150px"
                        type="date"
                        hide-details
                        single-line
                        v-model="fechaTablaAusentismo"
                    ></v-text-field>
                    <v-text-field
                        hide-details
                        single-line
                        width="300px"
                        placeholder="Nombres"
                        v-model="nombres"
                        class="px-1"
                    ></v-text-field>
                    <v-text-field
                        hide-details
                        single-line
                        width="300px"
                        placeholder="Apellidos"
                        v-model="apellidos"
                    ></v-text-field>
                    <v-text-field
                        hide-details
                        single-line
                        width="300px"
                        placeholder="Numero identificacion"
                        v-model="numeroidentificacion"
                        class="px-1"
                    ></v-text-field>
                    <v-btn icon small @click="clearTablaAusentismo" title="Limpiar">
                        <v-icon>mdi-eraser</v-icon>
                    </v-btn>
                </v-toolbar>
                <table-by-url 
                :url="urlausencia" 
                :memorize="false" 
                :showfilters="true"></table-by-url>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import TableByUrl from "../../components/core/TableByUrl.vue"
import VTabulator from '../../components/core/Tabulator.vue'
import LoginRegister from '../../components/core/LoginRegister.vue'
import FormDialog from '../../components/core/formDialog.vue'
import UserSelect from "../../components/core/UserSelect.vue"
import UserAvatar from '../../components/core/UserAvatar.vue'
import {post, download} from '../../tools/requests.js'
import {today} from '../../tools'


export default {
    data:() => ({
        dialog: false,
        userslist: [],
        escanear: false,
        fromDateVal: null,
        minDate: "2019-07-04",
        maxDate: "2019-08-30",
        tabulator: null, //variable to hold your table
        userdata:{},
        valid: false,
        loading: false,
        comentario:'',
        fecha: today(),
        fechaTablaAusentismo: undefined,
        nombres: '',
        apellidos: '',
        numeroidentificacion: '',
        pendientesenvio:0
    }),
    components:{
        VTabulator,
        TableByUrl,
        FormDialog,
        LoginRegister,
        UserSelect,
        UserAvatar
    },
    methods:{
        exportcsv(){
            const filters = ['page=1','per_page=500', 'format=csv']
            download(this._get_url_ausencia(filters), "data.csv", false)
        },
        async onsubmit(){
            this.loading= true
            const id = this.userdata['id']
            var data = {ids:[id], comentario:this.comentario, fecha: this.fecha}
            try{
                let response = await post('ausencia/', data)
                if (response.status === 200){
                    alert('exitoso')
                    this.userdata={}
                }
            }
            finally{
                this.loading = false
            }
        },
        clearTablaAusentismo(){
            this.fechaTablaAusentismo = undefined
            this.nombres = ''
            this.apellidos = ''
            this.numeroidentificacion = ''
        },
        _get_url_ausencia(filters=[]){
            var url= 'ausencia/'
            if (this.nombres.length > 2) filters.push(`nombres=${this.nombres}`)
            if (this.apellidos.length > 2) filters.push(`apellidos=${this.apellidos}`)
            if (this.numeroidentificacion.length > 2) filters.push(`numeroidentificacion=${this.numeroidentificacion}`)
            if (this.fechaTablaAusentismo !== undefined ) filters.push(`fecha=${this.fechaTablaAusentismo.replaceAll('-','')}`)
            if (filters.length > 0){
                url += '?'+filters.join('&')
            }
            return url
        }
    },
    computed:{
        urlausencia(){
            const filters = ['page=1','per_page=50']
            return this._get_url_ausencia(filters)
        }
    }
}
</script>

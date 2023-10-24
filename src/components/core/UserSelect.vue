<template>
    <v-card>
        <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-primary'">
            Seleccione un usuario
        </v-card-title>
        <v-toolbar border density="compact">
            <v-icon aria-disabled="true" title="filtros">mdi-filter</v-icon>
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
                class="px-1"
            ></v-text-field>
            <v-text-field
                hide-details
                single-line
                width="300px"
                placeholder="Numero identificacion"
                v-model="numeroidentificacion"
                class="px-1"
            ></v-text-field>
            <v-btn icon small @click="clear" title="Limpiar">
                <v-icon>mdi-eraser</v-icon>
            </v-btn>
    </v-toolbar>
        <table-by-url
        :url="url" 
        :hidefields="hidefields"
        :responsefield="responsefield"
        @click-row="userSelected"
        :memorize="false">
        </table-by-url>
    </v-card>
</template>
<script>
import TableByUrl from '../core/TableByUrl.vue'
export default {
    data: () => ({
        hidefields: ['timestamp', 'fechaNacimiento', 'rh',
            'telefonocontacto', 'perfil_nombre',
            'grado_id', 'grupoetnico_id', 'direccion', 'is_active',
            'telefono', 'telefonoContacto'],
        responsefield: 'usrs',
        nombres:'',
        apellidos: '',
        numeroidentificacion:''
    }),
    components: {
        TableByUrl
    },
    methods:{
        userSelected(event){
            // filter event based hidden fields
            const newhidden = [...this.hidefields, 'indexInCurrentPage']
            var response = {}
            for (const [key, value] of Object.entries(event)){
                if (newhidden.includes(key)) continue
                response[key] = value
            }
            this.$emit('update:modelValue', response)
        },
        clear(){
            this.$emit('update:modelValue', {})
        }
    },
    computed:{
        url(){
            var url= 'usuario/'
            var filters= []
            if (this.nombres.length > 2) filters.push(`nombres=${this.nombres}`)
            if (this.apellidos.length > 2) filters.push(`apellidos=${this.apellidos}`)
            if (this.numeroidentificacion.length > 2) filters.push(`numeroidentificacion=${this.numeroidentificacion}`)
            if (filters.length > 0){
                url += '?'+filters.join('&')
            }
            return url
        }
    }
}
</script>
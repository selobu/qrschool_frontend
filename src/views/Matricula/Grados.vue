<template>
    <v-container fluid class="px-0 py-0">
        <v-dialog v-model="showAdd"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar
                dark
                :color="$vuetify.theme.name === 'dark' ? 'grey-darken-3': 'primary'"
                >
                    <v-btn
                    icon
                    dark
                    @click="showAdd = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Proceso de matrícula</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text class="text-center">
                    <v-container class="d-flex justify-center flex-column align-center">
                        <v-row>
                        <v-col cols="12" md="6" lg="4">
                            <LoginRegister 
                            title="Apertura Grado"
                            subtitle="Nuevo grado para el proceso de matrícula"
                            maxwidth="600px"
                            :submit="submit"
                            >
                            <template v-slot:form>
                                <v-text-field
                                v-model="nombre"
                                :readonly="loading"
                                :rules="[required]"
                                class="mb-2"
                                clearable
                                placeholder="Ingrese el nombre"
                                label="Nombre del grado"
                                ></v-text-field>
                                <v-text-field
                                v-model="cupomaximo"
                                :readonly="loading"
                                :rules="[required]"
                                clearable
                                label="Cupo máximo"
                                placeholder="Ingrese el cupo máximo"
                                ></v-text-field>
                                <v-text-field
                                v-model="matricula"
                                :readonly="loading"
                                :rules="[required]"
                                clearable
                                label="Identificador de matrícula"
                                placeholder="Ingrese el identificador de matrícula"
                                ></v-text-field>
                            </template>
                            <template v-slot:actions>
                                <v-btn
                                :loading="loading"
                                block
                                color="success"
                                size="large"
                                type="submit"
                                variant="elevated"
                                >
                                Grabar
                                </v-btn>
                            </template>
                            </LoginRegister>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="12">
            <v-card>
            <v-toolbar density="compact">
                <v-btn icon  @click="showAdd=true"><v-icon>mdi-plus</v-icon></v-btn>
            </v-toolbar>
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
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import {datatable} from '../../tools/fake.js'
import LoginRegister from '../../components/core/LoginRegister.vue'


export default {
    data:()=>({
        showAdd: false,
        itemsPerPage: datatable.itemsPerPage,
        headers: datatable.headers,
        asistencia: datatable.asistencia,
        valid:false,
        loading: false,
        nombre: null,
        matricula: null,
        cupomaximo: null,
        required: v=> !!v || 'Requerido'
    }),
    components:{
        VDataTable,
        LoginRegister
    },
    methods:{
        getColor: datatable.getColor,
        onSubmit(){
            
        }
    }
}
</script>
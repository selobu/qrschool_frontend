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
                    <v-toolbar-title>Matrícula</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text class="text-center">
                    <v-container class="d-flex justify-center">
                        <v-col cols="12" md="6" lg="4">
                            <LoginRegister 
                            title="Matrícula"
                            subtitle="Registre un nuevo proceso de matrícula"
                            maxwidth="700px"
                            width="400px"
                            :submit="submit"
                            >
                            <template v-slot:form>
                                <v-text-field
                                v-model="grado"
                                :readonly="loading"
                                :rules="[v => !!v || 'Requerido']"
                                class="mb-2"
                                clearable
                                placeholder="Ingrese el grado"
                                label="Grado"
                                ></v-text-field>

                                <v-text-field
                                v-model="anio"
                                :readonly="loading"
                                :rules="[v => !!v || 'Requerido']"
                                clearable
                                label="Año"
                                placeholder="Ingrese el año"
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
        grado: null,
        anio: null,
        required: true
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
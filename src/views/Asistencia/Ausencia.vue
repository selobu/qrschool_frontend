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
                :color="$vuetify.theme.name === 'dark' ? 'grey-darken-3': 'primary'"
                >
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title><v-icon>mdi-account-minus-outline</v-icon>Ausentismo</v-toolbar-title>
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
                        <v-col cols="12" >
                            <v-card max-height="500px" elevation="3">
                                <v-card-title :class="$vuetify.theme.name === 'dark' ? 'bg-grey-darken-3 py-0' : 'py-0 bg-warning'">Listado</v-card-title>
                                <v-card-text>
                                    <p><br/><strong>Total registrados: 8</strong></p>
                                    <easy-data-table></easy-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            
        </v-dialog>
        <v-row>
            <v-col cols="12">
                <v-toolbar density="compact" >
                <v-btn icon @click="dialog=true" title="Agregar">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon title="Exportar" @click="exportcsv">
                    <v-icon>mdi-file-delimited-outline</v-icon>
                </v-btn>
                <v-divider :vertical="true" class="border-opacity-75"></v-divider>
                <p class="mx-2">Filtros:</p>
                <v-autocomplete
                    label="Rol"
                    :items="['All', 'Estudiante', 'Docente', 'Acudiente']"
                    style="max-width: 200px;"
                    class="mx-1"
                    >
                </v-autocomplete>
                <v-autocomplete
                    label="Grupo"
                    :items="['8','7','6']"
                    style="max-width: 200px;"
                    class="mx-1"
                    >
                </v-autocomplete>
            </v-toolbar>
                <easy-data-table></easy-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import EasyDataTable from "../../components/core/EasyDataTable.vue"
import VTabulator from '../../components/core/Tabulator.vue'

export default {
    data:() => ({
        dialog: false,
        userslist: [],
        escanear: false,
        fromDateVal: null,
        minDate: "2019-07-04",
        maxDate: "2019-08-30",
        tabulator: null, //variable to hold your table
    }),
    components:{
        VTabulator,
        EasyDataTable
    },
    methods:{
        exportcsv(){
            this.tabulator.download("csv", "data.csv")
        }
    }
}
</script>

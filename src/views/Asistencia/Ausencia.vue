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
                        >
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
                        <v-textarea placeholder="Comentario ausencia">
                            hello
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
                <v-toolbar density="compact" >
                <v-btn icon @click="dialog=true" title="Agregar">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon title="Exportar" @click="exportcsv">
                    <v-icon>mdi-file-delimited-outline</v-icon>
                </v-btn>
                <v-divider :vertical="true" class="border-opacity-75"></v-divider>
                <v-autocomplete
                    label="Rol"
                    :items="['All', 'Estudiante', 'Docente', 'Acudiente']"
                    style="max-width: 170px;"
                    class="mx-1"
                    variant="underlined"
                    >
                </v-autocomplete>
                <v-autocomplete
                    label="Grupo"
                    :items="['8','7','6']"
                    style="max-width: 170px;"
                    class="mx-1"
                    variant="underlined"
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
import LoginRegister from '../../components/core/LoginRegister.vue'
import FormDialog from '../../components/core/formDialog.vue'
import UserSelect from "../../components/core/UserSelect.vue"


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
        loading: false
    }),
    components:{
        VTabulator,
        EasyDataTable,
        FormDialog,
        LoginRegister,
        UserSelect
    },
    methods:{
        exportcsv(){
            this.tabulator.download("csv", "data.csv")
        },
        onsubmit(){
            this.loading= true
            const id = this.userdata['id']
            alert(`user id:${id}`)
            this.loading = false
        }
    }
}
</script>

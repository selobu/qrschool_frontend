<template>
    <v-container fluid>
        <v-toolbar density="compact">
            <v-btn icon title="Consultar"><v-icon>mdi-file-search</v-icon>
            </v-btn>
            <v-btn icon title="Exportar" @click="exportcsv">
                <v-icon>mdi-file-delimited-outline</v-icon>
            </v-btn>
            <v-divider :vertical="true"></v-divider>
            <v-btn icon title="Generar QR nuevo"><v-icon>mdi-compost</v-icon></v-btn>
        </v-toolbar>
        <v-row>
            <v-col cols="12">
                <v-tabulator height="400px" v-model="tabulator"></v-tabulator>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import VTabulator from '../../components/core/Tabulator.vue'
export default {
    data:()=>({
        tabulator: null
    }),
    components:{
        VTabulator
    },
    methods:{
        exportcsv(){
            this.tabulator.download("csv", "data.csv")
        }
    }
}
</script>
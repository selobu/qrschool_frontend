<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title class="bg-primary py-0">Estudiantes</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title class="bg-info  py-0">Asentismo</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="4">
                <v-card>
                    <v-card-title class="bg-primary  py-0">Desempeño</v-card-title>
                    <v-card-text class="py-0">
                        <BarChart />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6" >
                <v-card height="400">
                    <v-card-title class="py-0 text-left bg-warning">Estudiantes ausentes</v-card-title>
                    <v-card-text class="py-0">
                        <v-table>
                            <thead>
                            <tr>
                                <th class="text-left">
                                Name
                                </th>
                                <th class="text-left">
                                Grado
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="item in estudiantes"
                                :key="item.name"
                            >
                                <td>{{ item.name }}</td>
                                <td>{{ item.grado }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6">
                <v-card height="400">
                    <v-card-title class="bg-info py-0"> Asistencia por grado</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <td>Grado</td>
                                    <td>% Asistencia</td>
                                </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="item in asistencia"
                                :key="item.grado"
                            >
                                <td>{{ item.grado }}</td>
                                <td>{{ item.asistencia }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import BarChart from '../components/charts/barchart.vue'
export default {
    data:()=>({
        asistencia:[
            {grado:8, asistencia: 80},
            {grado:9, asistencia: 85},
            {grado:10, asistencia: 95},
            {grado:7, asistencia: 100},
            {grado:5, asistencia: 100},
            {grado:4, asistencia: 80},
            {grado:11, asistencia: 85},
            ],
        estudiantes:[
            {name:'Sebastian', grado:9},
            {name:'Maria', grado:9},
            {name:'Pedro', grado:9},
            {name:'Pablo', grado:9},
            {name:'Pepito', grado:9},
            {name:'Lucas', grado:9},
            {name:'Eduardo', grado:9},
            {name:'Cristian', grado:9},
            {name:'Andrea', grado:9},
        ]
    }),
    components:{
        BarChart
    }
}
</script>
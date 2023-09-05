<template>
    <v-container fluid class="px-0 py-0">
        <v-row>
            <v-col cols="12">
                <v-card elevation="4" height="600">
                    <v-tabs v-model="tab" 
                        :bg-color="$vuetify.theme.name === 'dark' ? 'bg-grey' :  'primary'"
                        >
                        <v-tab value="one" @click="$router.push({name:'registrarasistencia'})">Asistencia</v-tab>
                        <v-tab value="two" @click="$router.push({name:'registrarausencia'})">Ausentismo</v-tab>
                        <v-tab value="three" @click="$router.push({name:''})">Resumen</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <template v-if="tab === 'three'">
                            <v-window v-model="tab">
                                <v-window-item value="three">
                                    Here is the resume data
                                </v-window-item>
                            </v-window>
                        </template>
                        <template v-else>
                            <router-view ></router-view>
                        </template>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data:()=>({
        tab:'three'
    })
}
</script>
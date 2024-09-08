<template>
    <v-container fluid class="px-0 py-0">
        <v-row>
            <v-col cols="12">
                <v-card elevation="4">
                    <v-tabs v-model="tab" 
                        color="deep-purple-accent-4"
                        >
                        
                        <v-tab value="one" @click="$router.push({name:'registrarasistencia'})">
                            <v-icon color="green">mdi-account-group</v-icon>
                            Asistencia 
                            <v-badge v-if="pendientesenvio>0"
                            color="warning"
                            :content="pendientesenvio"
                            inline
                            ></v-badge>
                        </v-tab>
                        <v-tab value="two" @click="$router.push({name:'registrarausencia'})">
                            <v-icon color="orange">mdi-account-minus-outline</v-icon>Ausentismo
                        </v-tab>
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
import {db} from '../../plugins/dexie.js'
import {_fixurl} from '../../tools/requests'
export default {
    data:()=>({
        tab:'one',
        pendientesenvio:0
    }),
    beforeUpdate(){
        this.readposts()
    },
    beforeMount(){
        this.readposts()
    },
    methods:{
        readposts(){
            const tofind = _fixurl('asistencia/')
            let screen = this
            db['Post'].where("url").equalsIgnoreCase(tofind).count().then((result) => 
            screen.pendientesenvio = result
        );
        },

    }
}
</script>
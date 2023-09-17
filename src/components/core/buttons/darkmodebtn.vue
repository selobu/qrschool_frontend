<template>
    <v-btn icon rounded @click="switchDarkTheme">
        <v-icon v-if="$vuetify.theme.name === 'dark'">
            mdi-brightness-7
        </v-icon>
        <v-icon v-else>
            mdi-brightness-3
        </v-icon>
    </v-btn>
</template>
<script>
import {configStore} from '../../../stores/configStore'
export default {
    data: ()=>({
        configstore: configStore(),
    }),
    methods:{
      switchDarkTheme(){
        this.configstore.switchDarkTheme()
      }
    }
}
</script>
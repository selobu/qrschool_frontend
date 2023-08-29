<template>
    <v-container>
        <v-row>
          <v-col
            v-for="(module, index) in modules"  
            :key="module.title"
            cols="xs-12 md-6 lg-4"
          >
            <v-card height="200" elevation="4">
              <v-card-title :class="getindex(index)"> <v-icon> {{ module.icon }} </v-icon>{{ module.title }}</v-card-title>
              <v-card-subtitle>{{ module.subtitle }}</v-card-subtitle>
              <v-card-text>{{ module.description  }}
                <div> {{ index }} </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  data:() => ({
    modules:[
    {
      title:'Asitencia',
      subtitle: 'subtitle',
      icon: 'mdi-check',
      description: 'Module description'
    },
    {
      title:'Ausentismo',
      subtitle: 'subtitle',
      icon: 'mdi-hospital',
      description: 'Module description'
    },
    {
      title:'Gestion Qr',
      subtitle: 'subtitle',
      icon: 'mdi-qrcode',
      description: 'Module description'
    },
    {
      title:'Matricula',
      subtitle: 'subtitle',
      icon: 'mdi-format-list-bulleted',
      description: 'Module description'
    },
    {
      title:'Usuarios',
      subtitle: 'subtitle',
      icon: 'mdi-account-multiple',
      description: 'Module description'
    }]
  }),
  methods:{
    getindex(indice){
      const colors = ['bg-primary', 'bg-secondary', 'bg-blue','bg-orange'];
      const index = Math.floor(indice%4) == 0 ? 3: Math.floor(indice%3) == 0 ? 0 : Math.floor(indice%2) == 0 ? 2 : 1;
      return colors[index]
    }
  }
}
</script>
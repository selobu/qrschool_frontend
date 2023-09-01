<template>
    <v-container>
        <v-row>
          <v-col
            v-for="(module, index) in modules"  
            :key="module.title"
            cols="xs-12 md-6 lg-4"
          >
            <v-card height="200" elevation="4">
              <v-card-title :class="module.color"> <v-icon> {{ module.icon }} </v-icon>{{ module.title }}</v-card-title>
              <v-card-subtitle>{{ module.subtitle }}</v-card-subtitle>
              <v-card-text>{{ module.description  }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template v-for="action in module.actions">
                  <v-btn 
                    variant="outlined"
                    :class="action.color"
                    :href="this.$router.push({name: action.href}).href"
                  >{{ action.title }}
                  </v-btn>
                  <v-spacer></v-spacer>
                </template>
              </v-card-actions>
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
      actions: [],
      description: 'Module description',
      color:'bg-primary'
    },
    {
      title:'Ausentismo',
      subtitle: 'subtitle',
      icon: 'mdi-account-minus',
      actions:[],
      description: 'Module description',
      color: 'bg-warning'
    },
    {
      title:'Gestion Qr',
      subtitle: 'subtitle',
      actions: [{title:'Leer', href:'leerqrs', color:'green'},
        {title:'Mostrar Qr', href:'mostrarmiqr', color:'blue'}],
      icon: 'mdi-qrcode',
      description: 'Module description',
      color : 'bg-info'
    },
    {
      title:'Matricula',
      subtitle: 'subtitle',
      actions: [],
      icon: 'mdi-format-list-bulleted',
      description: 'Module description',
      color: 'bg-success'
    },
    {
      title:'Usuarios',
      subtitle: 'subtitle',
      actions: [],
      icon: 'mdi-account-multiple',
      description: 'Module description',
      color: 'bg-primary-darken-1',
    }]
  }),
  methods:{
    getindex(indice){
      console.log(indice)
      const colors = ['bg-primary', 'bg-primary-darken-1','bg-success','bg-warning', 'bg-info'];
      const index = Math.floor(indice%5) == 0 ? 0 : 
                    Math.floor(indice%4) == 0 ? 1 :
                    Math.floor(indice%3) == 0 ? 2 :
                    Math.floor(indice%2) == 0 ? 3 : 4;
      return colors[index]
    }
  }
}
</script>
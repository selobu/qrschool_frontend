export const datatable = {
    itemsPerPage:15,
    headersausentes: [{ title: 'Nombre', align: 'center', key: 'name', sortable: true, },
        { title: 'grado', align: 'center', key: 'grado', sortable: true, }
    ],
    headers: [
        { title: 'Grado', align: 'end', key: 'grado', sortable: true, },
        { title: '% Asistencia', align: 'end', key: 'asistencia', sortable: true, }
    ],
    asistencia:[
        {grado:8, asistencia: 70},
        {grado:9, asistencia: 85},
        {grado:10, asistencia: 95},
        {grado:7, asistencia: 100},
        {grado:5, asistencia: 40},
        {grado:4, asistencia: 80},
        {grado:11, asistencia: 85},
        ],
    estudiantes:[
        {name:'Sebastian', grado:9},
        {name:'Maria', grado:9},
        {name:'Pedro', grado:11},
        {name:'Pablo', grado:10},
        {name:'Pepito', grado:6},
        {name:'Lucas', grado:7},
        {name:'Eduardo', grado:8},
        {name:'Cristian', grado:9},
        {name:'Andrea', grado:9},
    ],
    getColor: function(asistencia){
        if (asistencia <= 70) return 'red'
        else if (asistencia <= 85) return 'orange'
        else return 'green'            
    }
}
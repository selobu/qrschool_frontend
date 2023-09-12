export const datatable = {
    itemsPerPage:15,
    headersausentes: [{ title: 'Nombre', align: 'center', key: 'name', sortable: true, },
        { title: 'grado', align: 'center', key: 'grado', sortable: true, }
    ],
    headers: [
        { title: 'Grado', align: 'end', key: 'grado', sortable: true, },
        { title: '% Asistencia', align: 'end', key: 'asistencia', sortable: true, }
    ],
    headers_easy: [
        { text: "PLAYER", value: "player" },
        { text: "TEAM", value: "team"},
        { text: "NUMBER", value: "number"},
        { text: "POSITION", value: "position"},
        { text: "HEIGHT", value: "indicator.height"},
        { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true},
        { text: "LAST ATTENDED", value: "lastAttended", width: 200},
        { text: "COUNTRY", value: "country"},
        ],
    items_easy: [
        { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"},
        { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: {"height": '6-9', "weight": 250}, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA"},
        { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: {"height": '6-10', "weight": 240}, lastAttended: "Texas-Austin", country: "USA"},
        { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: {"height": '6-11', "weight": 242}, lastAttended: "Filathlitikos", country: "Greece"},
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
    },
    tabulatordata: [
        {id:1, name:"Billy Bob", age:12, gender:"male", height:95, col:"red", dob:"14/05/2010"},
        {id:2, name:"Jenny Jane", age:42, gender:"female", height:142, col:"blue", dob:"30/07/1954"},
        {id:3, name:"Steve McAlistaire", age:35, gender:"male", height:176, col:"green", dob:"04/11/1982"},
    ],
}

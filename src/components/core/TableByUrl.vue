        <template>
    <easy-data-table :rows="rows" :headers="headers">

    </easy-data-table>
</template>
<script>
import EasyDataTable from "../../components/core/EasyDataTable.vue"
import {get} from '../../tools/requests'
export default {
    data:() =>({
        page: 1,
        perpage: 20,
        rows: [],
        headers:[]
    }),
    props:{ url:{type: String, required: true}},
    emits: ['update:modelValue'],
    components:{
        EasyDataTable
    },
    beforeMount(){
        this.loaddata();
    }, 
    methods:{ 
        async loaddata(page=1, per_page=20){
            const url = this.url+`?page=${page}&per_page=${per_page}`
            console.log('URL get request')
            console.log(url)
            let response = await get(url, 10) // six minutes
            console.log(response)
            this.rows = response.data
            this.headers = [
                {text: 'Fecha', value: 'timestamp'},
                {text: 'Total', value: 'total'},
                {text: 'Id', value:'asistenciaid'}
                ]
        }
    }
}
</script>
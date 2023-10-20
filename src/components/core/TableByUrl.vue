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
    props:{ url:{type: String, required: true},
            memorize: {type: Boolean, required:false, default:true}
        },
    watch:{
        url(){
            this.loaddata(1, 20)
        }
    },
    emits: ['update:modelValue'],
    components:{
        EasyDataTable
    },
    beforeMount(){
        this.loaddata();
    }, 
    methods:{ 
        async loaddata(page=1, per_page=20){
            if (this.url === '') return
            const _url = this.url+`?page=${page}&per_page=${per_page}`
            let response = await get(_url, 10, true, this.memorize)
            this.rows = response.data
            var res = []
            for (let row of Object.keys(this.rows[0])){
                res.push({text: row, value: row},)
            }
            this.headers = res
        }
    }
}
</script>
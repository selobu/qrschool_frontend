<template>
    <easy-data-table :rows="rows" :headers="headers"
        :table-class-name="$vuetify.theme.name === 'dark' ? 'default table-darkmode' : 'default'"
        >
    </easy-data-table>
</template>
<script>
import EasyDataTable from "../../components/core/EasyDataTable.vue"
import { get } from '../../tools/requests'
export default {
    data: () => ({
        page: 1,
        perpage: 20,
        rows: [],
        headers: [],
    }),
    props: {
        url: { type: String, required: true },
        memorize: { type: Boolean, required: false, default: true },
        hidefields: { required: false, default: [], type: Array },
        responsefield: { default: undefined, type:String}
    },
    watch: {
        url() {
            this.loaddata(1, 20)
        }
    },
    components: {
        EasyDataTable
    },
    beforeMount() {
        this.loaddata();
    },
    methods: {
        async loaddata(page = 1, per_page = 50) {
            if (this.url === '') return
            var joinchar = '?'
            if (this.url.includes('?')) joinchar = '&'
            const _url = this.url + `${joinchar}page=${page}&per_page=${per_page}`
            let response = await get(_url, 20, true, this.memorize)
            this.rows = response.data
            if (this.responsefield !== undefined) this.rows= this.rows[this.responsefield]
            var res = []
            if (this.rows.length > 0) {
                for (let row of Object.keys(this.rows[0])) {
                    if (this.hidefields.includes(row)) continue
                    res.push({ text: row, value: row },)
                }
            }
            else {
                res = [{ text: 'nodata', value: 'nodata' }]
            }
            this.headers = res
        }
    }
}
</script>
<template>
    <v-toolbar density="compact" border v-if="showfilters">
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props"><v-icon>mdi-filter</v-icon></v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in headers" :key="index" :value="item.value">
                    <v-list-item-title @click="addfilter(item)">{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <template v-for="(item, index) in filters">
            <v-btn @click="filters.splice(index, 1); entries[item.value]['value'] = '';loaddata()" prepend-icon="mdi-close">
                {{ item.value }}
            </v-btn>
            <v-text-field width="150px" v-model="entries[item.value]['value']"></v-text-field>
        </template>
        <v-spacer></v-spacer>
        <v-btn v-if="filters.length>0" @click="loaddata()"> apply</v-btn>

    </v-toolbar>
    <easy-data-table :rows="rows" :headers="headers"
        :table-class-name="$vuetify.theme.name === 'dark' ? 'default table-darkmode' : 'default'"
        @click-row="$emit('clickRow',$event)">
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
        filters: [],
        filteroptions: ['==', '!=', '>', '<', 'empty', 'like'],
        entries: {}
    }),
    props: {
        url: { type: String, required: true },
        memorize: { type: Boolean, required: false, default: true },
        hidefields: { required: false, default: [], type: Array },
        responsefield: { default: undefined, type: String },
        maxage: { required: false, type: Number, default: 20 },
        showfilters: { type: Boolean, default: false },
        not2filter:{ type:Array, default:[]}
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
        this.loaddata().then(()=>{
            this.entries = {}
            this.headers.forEach((value, index, array) => {
                this.entries[value.text] = { value: '' }
            })
        });
        
    },
    methods: {
        async loaddata(page = 1, per_page = 50) {
            if (this.url === '') return
            var joinchar = '?'
            if (this.url.includes('?')) joinchar = '&'
            const _url = this.url + `${joinchar}page=${page}&per_page=${per_page}`
            // adding filters if any
            var aditionalfilter = ''
            Object.keys(this.entries).forEach((value)=>{
                if (this.entries[value]['value'] != '')  aditionalfilter += `&${value}=${this.entries[value]['value']}`
            })
            console.log(_url+aditionalfilter)
            let response = await get(_url+aditionalfilter, this.maxage, true, this.memorize)
            this.rows = response.data
            if (this.responsefield !== undefined) this.rows = this.rows[this.responsefield]
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
            var resp = []
            res.forEach((value,index, array)=>{
                if (!this.not2filter.includes(value.text)){
                    resp.push(value)
                }
            })
            this.headers = resp
            
        },
        addfilter(item) {
            this.filters.push(item)

        }
    }
}
</script>
<template>
    <v-dialog v-model="showAdd" fullscreen :scrim="false" :transition="transition">
        <v-card>
            <slot name="toolbar">
                <v-toolbar dark :color="$vuetify.theme.name === 'dark' ? 'grey-darken-3' : 'primary'">
                    <v-btn icon dark @click="hidedialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </slot>
            <v-form v-model="valid"
                validate-on="input lazy" 
                @submit.prevent="submit">
                <v-card-text>
                    <slot name="form">
                        <v-text-field v-model="grado" :readonly="loading" :rules="[v => !!v || 'Requerido']"
                            class="mb-2" clearable placeholder="Ingrese el grado"
                            label="Grado"></v-text-field>

                        <v-text-field v-model="anio" :readonly="loading" :rules="[v => !!v || 'Requerido']"
                            clearable label="Año" placeholder="Ingrese el año"></v-text-field>
                    </slot>
                </v-card-text>
            </v-form>
            <v-card-actions>
                <slot name="actions">
                </slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data: () => ({ showAdd: false, valid:false }),
    props: {
        cols: { type: String, required: false, default: '6' },
        lg: { type: String, required: false, default: '4' },
        md: { type: String, required: false, default: '6' },
        title: { type: String, required: false, default: '' },
        subtitle: { type: String, required: false, default: '' },
        transition: { type: String, required: false, default: 'dialog-bottom-transition' },
        modelValue: { type: Boolean, required: true },
        submit: { required: true },
        loading: false
    },
    beforeMount() {
        this.showAdd = this.modelValue
    },
    watch: {
        modelValue(newvalue) {
            this.showAdd = newvalue
        }
    },
    methods: {
        hidedialog() {
            this.showAdd = false
            this.$emit('update:modelValue', this.showAdd)
        }
    }
}
</script>
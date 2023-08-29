<template>
    <v-card  elevation="4">
        <v-card-title class="bg-blue">QrCode Readers</v-card-title>
        <v-card-subtitle>Lee múltiples códigos QR</v-card-subtitle>
        <v-card-text>
            <v-container fluid class="px-0 py-2">
            Track function:
            <!-- check if is possible to transform this
             <v-select v-model="selected" :items="options"
                 item-title="text"
                 item-value="value">
            </v-select>
            -->
            <v-btn rounded>
                <select v-model="selected">
                    <option v-for="option in options" :key="option.text" :value="option">
                    {{ option.text }}
                    </option>
                </select>
            </v-btn>
            </v-container>
            <qrcode-stream 
            @detect="onDetect" id="qrcodestream"
            :track="selected.value">
            </qrcode-stream>
        </v-card-text>
        <v-card-actions>
            <v-btn variant="outlined" color="red">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="green">Aceptar</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components: {
        QrcodeStream
    },
    data() {
        var detected = [];
        const options = [
            { text: 'nothing (default)', value: undefined },
            { text: 'outline', value: this.paintOutline },
            { text: 'centered text', value: this.paintCenterText },
            { text: 'bounding box', value: this.paintBoundingBox }
        ]
        const selected = options[1]

        return { selected, options, detected }
    },
    methods: {
        onDetect (detectedCodes) {
            for(const code of detectedCodes){
                console.log(code.rawValue)
            }
        },
        paintOutline(detectedCodes, ctx) {
        for (const detectedCode of detectedCodes) {
            const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

            ctx.strokeStyle = 'red'

            ctx.beginPath()
            ctx.moveTo(firstPoint.x, firstPoint.y)
            for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y)
            }
            ctx.lineTo(firstPoint.x, firstPoint.y)
            ctx.closePath()
            ctx.stroke()
        }
        },

        paintBoundingBox(detectedCodes, ctx) {
        for (const detectedCode of detectedCodes) {
            const {
            boundingBox: { x, y, width, height }
            } = detectedCode

            ctx.lineWidth = 2
            ctx.strokeStyle = '#007bff'
            ctx.strokeRect(x, y, width, height)
        }
        },

        paintCenterText(detectedCodes, ctx) {
        for (const detectedCode of detectedCodes) {
            const { boundingBox, rawValue } = detectedCode

            const centerX = boundingBox.x + boundingBox.width / 2
            const centerY = boundingBox.y + boundingBox.height / 2

            const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
            console.log(boundingBox.width, ctx.canvas.width)

            ctx.font = `bold ${fontSize}px sans-serif`
            ctx.textAlign = 'center'

            ctx.lineWidth = 3
            ctx.strokeStyle = '#35495e'
            ctx.strokeText(detectedCode.rawValue, centerX, centerY)

            ctx.fillStyle = '#5cb984'
            ctx.fillText(rawValue, centerX, centerY)
        }
        },
        logErrors: console.error
        },
    }
</script>
<style scoped>
#qrcodestream {
    max-width: 250px;
    max-height: 250px;
}
</style>
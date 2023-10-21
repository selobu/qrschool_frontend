<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {labels:{required:true}, datasets:{required:true}},
  data:()=>({
      chartOptions: {
        responsive: true
      }
  }),
  computed:{
    chartData(){
      return {
        labels: this.labels || [ 'January', 'February', 'March' ],
        datasets: this.datasets || [ { data: [40, 20, 12] } ]
      }
    }
  }
}
</script>
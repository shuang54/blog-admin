<script setup>
import * as echarts from 'echarts';
import {onMounted,onUnmounted} from 'vue'
// import { GridComponent } from 'echarts/components';
// import { BarChart } from 'echarts/charts';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([GridComponent, BarChart, CanvasRenderer]);

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [120, 200, 150, 80, 70, 110, 130],
//       type: 'bar'
//     }
//   ]
// };

// option && myChart.setOption(option);
// console.log(chartDom);
  /// 声明定义一下echart
    // let echart = echarts;

    onMounted(() => {
      initChart();
      initPieChart();
    });

    onUnmounted(() => {
      echarts.dispose;
    });
	
    // 基础配置一下Echarts
    function initChart() {
      let chart = echarts.init(document.getElementById("myEcharts"));
      // 把配置和数据放这里
      chart.setOption({
          title: {
    text: '文章提交统计',
    subtext: 'Fake Data',
    left: 'center'
  },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              801,
              102,
              230,
              4321,
              4129
            ],
            type: "line",
            smooth: true
          }
        ]
      });
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }
    //饼状图
      function initPieChart() {

      let piechart = echarts.init(document.getElementById("pieChart"));
      // 把配置和数据放这里
      piechart.setOption({
  title: {
    text: '文章分类统计',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 10,
    left: 'center',
    data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: [
       
        { value: 1548, name: 'CityE' },
        { value: 735, name: 'CityC' },
        { value: 510, name: 'CityD' },
        { value: 434, name: 'CityB' },
        { value: 335, name: 'CityA' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
      window.onresize = function() {
        //自适应大小
        piechart.resize();
      };
    }

</script>
<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '300px' }"></div>
    <div id="pieChart" :style="{ width: '900px', height: '300px' }"></div>
    </div>
</template>
<style scoped>
.echarts-box{
 display: flex;
 flex-direction: column;

}
</style>
<script  setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeMount, onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue'
import { useArticle, useCategory } from '../../store';
import {
  Histogram,
  Position
} from '@element-plus/icons-vue'
let { articleTotalData } = useArticle()
let { categoryTotalData } = useCategory()
// // 文章统计数量
//   let articaleTotalvalue=reactive([])
// // 文章统计时间
//   let articleTotalDates=reactive([])

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
  document.getElementById('myEcharts').setAttribute('_echarts_instance_', '');
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: '文章提交统计',
      subtext: '每月上传的文章数',
      left: 'center'
    },
    xAxis: {
      type: "category",
      data: articleTotalData[0]
    },
    tooltip: {
      trigger: "axis"
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: articleTotalData[1],
        type: "line",
        smooth: true
      }
    ]
  });
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
}
//饼状图
function initPieChart() {
  let piechart = echarts.init(document.getElementById("pieChart"));
  document.getElementById('pieChart').setAttribute('_echarts_instance_', '');
  // 把配置和数据放这里
  piechart.setOption({
    title: {
      text: '文章分类统计',
      subtext: '每种分类的文章数',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
      data: categoryTotalData[0]
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: categoryTotalData[1],
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
  window.onresize = function () {
    //自适应大小
    piechart.resize();
  };
}


</script>
<template>
  <div id="admin-container">
    <div class="title">
      <el-icon class="histogram" :size="50" color="white">
        <Histogram />
      </el-icon>
      数据统计
    </div>
    <div class="echarts-box">
      <div id="myEcharts" :style="{ width: '900px', height: '300px' }"></div>
      <div id="pieChart" :style="{ width: '900px', height: '300px' }"></div>
    </div>
    <div class="title">
      <el-icon class="histogram a" :size="50" color="white">
        <Position />
      </el-icon>
      快捷跳转
    </div>
    <div class="item-box">
      <div class="item">
        <router-link to="/article">文章管理</router-link>
      </div>
      <div class="item">
        <router-link to="/category">分类管理</router-link>
      </div>
      <div class="item">
        <router-link to="/personal">个人信息管理</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
#admin-container {}

.title {
  font-size: 24px;
  margin-left: 80px;
  display: flex;
  width: 180px;
  align-items: center;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 12%);
  text-align: center;

  .histogram {
    background-color: gold;
    height: 50px;
    display: block;
    margin-right: 10px;
  }

  .a {
    background-color: #2d8cf0;
  }
}

.item-box {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;

  .item {
    background-color: white;
    width: 300px;
    height: 200px;
    margin-left: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    transition: .3s;

    &:hover {
      transform: translateY(-10px);
    }

    a {
      width: 100%;
      height: 100%;
      display: block;
      font-size: 24px;
      line-height: 184px;

      &:hover {
        color: #000;
      }
    }
  }
}

.echarts-box {
  display: flex;
  flex-direction: row;

}

@media screen and (max-width:1500px) {
  .echarts-box {
    flex-direction: column;
    align-items: center;
  }
}
</style>
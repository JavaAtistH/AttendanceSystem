<template>
  <div class="container">
    <div class="header">
      <h1 class="title">数据可视化中心</h1>
    </div>
    
    <div class="charts-container">
      <!-- 柱状图 -->
      <div class="chart-section">
        <div class="chart-title">签到统计</div>
        <qiun-data-charts
          type="column" 
          :opts="barChartOpts"
          :chartData="barChartData"
          canvasId="barChart"
        />
      </div>

      <!-- 饼图 -->
      <div class="chart-section">
        <div class="chart-title">部门人数占比</div>
        <qiun-data-charts
          type="pie" 
          :opts="pieChartOpts"
          :chartData="pieChartData"
          canvasId="pieChart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';

export default {
  components: {
    QiunDataCharts,
  },
  data() {
    return {
      barChartData: {},
      barChartOpts: {
        color: ['#00FFFF', '#FF00FF', '#FFFF00'],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {
          show: true,
          position: 'bottom',
          lineHeight: 25,
        },
        xAxis: {
          disableGrid: true,
          fontColor: '#cccccc',
        },
        yAxis: {
          data: [{ min: 0 }],
          splitNumber: 4,
          gridType: 'dash',
          dashLength: 4,
          gridColor: '#333333',
          fontColor: '#cccccc',
        },
        extra: {
          column: {
            type: 'group',
            width: 30,
            activeBgColor: '#000000',
            activeBgOpacity: 0.08,
          },
        },
      },

      pieChartData: {},
      pieChartOpts: {
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'],
        padding: [5, 5, 5, 5],
        enableScroll: false,
        legend: {
          show: true,
          position: 'right',
          lineHeight: 25,
          fontSize: 12,
          fontColor: '#cccccc',
        },
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: '#000000',
          },
        },
      },
    };
  },
  onReady() {
    this.fetchBarChartData();
    this.fetchPieChartData();
  },
  methods: {
    fetchBarChartData() {
      uni.request({
        url: 'http://localhost:8081/attend/countSignedInCount',
        method: 'GET',
        success: (res) => {
          console.log('柱状图数据：', res.data);
          const data = res.data;

          this.barChartData = {
            categories: ['已签到', '未签到', '请假'],
            series: [
              {
                name: '人数',
                data: [
                  data.signedInCount,
                  data.notSignedInCount,
                  data.leaveCount,
                ],
              },
            ],
          };
        },
        fail: (err) => {
          console.error('柱状图数据获取失败：', err);
        },
      });
    },

    fetchPieChartData() {
      uni.request({
        url: 'http://localhost:8081/information/allData',
        method: 'GET',
        success: (res) => {
          console.log('饼图数据：', res.data);
          const data = res.data;

          this.pieChartData = {
            series: [
              { name: '技术部', data: data.technologyDepartmentNumber },
              { name: 'CEO', data: data.ceonumber },
              { name: 'CEO秘书', data: data.ceosecretary },
              { name: 'HR', data: data.hrnumber },
              { name: '财务部', data: data.financeNumber },
            ],
          };
        },
        fail: (err) => {
          console.error('饼图数据获取失败：', err);
        },
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #111;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.header {
  width: 100%;
  padding: 20px 0;
  background: linear-gradient(45deg, #00FFFF, #FF00FF);
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.charts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0 20px;
}

.chart-section {
  width: 100%;
  max-width: 750rpx;
  height: 500rpx;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); /* Updated box-shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 30px rgba(0, 255, 255, 0.5); /* Updated box-shadow */
}

.chart-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  background: rgba(0, 255, 255, 0.1);
  color: #00FFFF; /* Updated color */
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5); /* Added text-shadow */
}

/* Neon glow effect for chart borders */
.chart-section::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00FFFF, #FF00FF, #FFFF00, #00FFFF);
  z-index: -1;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.chart-section:hover::before {
  opacity: 1;
}

/* Animation for chart load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.chart-section {
  animation: fadeIn 0.5s ease-out forwards;
}

.chart-section:nth-child(2) {
  animation-delay: 0.2s;
}

/* Responsive design */
@media (min-width: 768px) {
  .charts-container {
    flex-direction: row;
  }

  .chart-section {
    width: calc(50% - 10px);
  }
}

/* Remove selection background */
::selection {
  background: transparent;
  color: #00FFFF;
}

::-moz-selection {
  background: transparent;
  color: #00FFFF;
}
</style>


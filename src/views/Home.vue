<template>
  <el-row :gutter="12">
    <el-col :span="24" :md="12">
      <el-card shadow="never">
        <template #header>后台 版本日志</template>
        <el-skeleton
          animated
          :rows="5"
          :loading="loading"
          style="height: 268px"
        >
          <template #default>
            <el-scrollbar height="268px">
              <el-timeline v-show="list?.length > 0" style="padding: 4px">
                <el-timeline-item
                  v-for="(item, index) in list"
                  :key="index"
                  color="#0bbd87"
                  :timestamp="item.timestamp"
                >
                  <div>{{ item.content }}</div>
                </el-timeline-item>
              </el-timeline>
              <el-empty v-show="list?.length === 0" />
            </el-scrollbar>
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
    <el-col :span="24" :md="12">
      <el-card shadow="never">
        <template #header>后台 版本日志</template>
        <el-skeleton
          animated
          :rows="5"
          :loading="loading"
          style="height: 268px"
        >
          <template #default>
            <el-scrollbar height="268px">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="时间">
                  <template #default="{ row }">
                    <div v-copy:click="row.date" style="user-select: none">
                      {{ row.date }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="address" label="地址" />
                <el-table-column prop="count">
                  <template #default="{ row }">
                    <TcCountTo :end-val="row.count"></TcCountTo>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-show="list?.length === 0" />
            </el-scrollbar>
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <el-col :span="24" :md="8">
      <el-card shadow="never">
        <template #header>折线图标</template>
        <TcEchart style="height: 360px" :options="lineOptions"></TcEchart>
      </el-card>
    </el-col>
    <el-col :span="24" :md="8">
      <el-card shadow="never">
        <template #header>柱状图</template>
        <TcEchart style="height: 360px" :options="barOptions"></TcEchart>
      </el-card>
    </el-col>
    <el-col :span="24" :md="8">
      <el-card shadow="never">
        <template #header>饼图</template>
        <TcEchart style="height: 360px" :options="pieOptions"></TcEchart>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import Loading from '@/utils/loading'
import TcEchart from '@/components/echart/index.vue'
import TcCountTo from '@/components/count-to/index.vue'
import { delay } from '@/utils/util'
import { usePageVisibility } from '@/hooks/usePageVisibility'

defineOptions({
  name: 'HomePage'
})
console.log('========Home初始化=========')
const loading = ref(false)
const list = ref()
const lineOptions = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
const barOptions = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}
const pieOptions = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
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
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    count: 2000
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    count: -2000
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    count: 1212
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    count: -290
  }
]
async function getData() {
  Loading.show()
  loading.value = true
  await delay()
  list.value = [1, 2, 3, 4, 5, 6].map(() => {
    return {
      content:
        '路由 meta 添加 activePath 属性，可将某个菜单激活（主要用于通过 query 或 params 传参的路由，当它们通过配置 showLink: false 后不在菜单中显示，就不会有任何菜单高亮，而通过设置 activePath 指定激活菜单即可获得高亮，activePath 为指定激活菜单的 path 查看详情）',
      timestamp: '2023-06-08',
      icon: ''
    }
  })
  Loading.hide()
  loading.value = false
}
getData()

const isVisibility = usePageVisibility()
watch(isVisibility, value => {
  console.log(value, '=========是否显示')
})
</script>
<style lang="scss" scoped>
.el-card {
  margin-bottom: 12px;
}
</style>

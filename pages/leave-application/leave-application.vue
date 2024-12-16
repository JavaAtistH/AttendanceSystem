<template>
  <view class="leave-records">
    <view class="record" v-for="(record, index) in leaveRecords" :key="index">
      <view class="record-header">
        <text class="employee-name">{{ record.name }}</text>
        <text class="apply-date">{{ record.applyDate }}</text>
      </view>
      <view class="record-body">
        <view class="record-item">
          <text class="label">请假原因：</text>
          <text class="value">{{ record.reason }}</text>
        </view>
        <view class="record-item">
          <text class="label">请假时间：</text>
          <text class="value">{{ record.startTime }} 至 {{ record.endTime }}</text>
        </view>
      </view>
      <view class="record-footer">
        <text class="status" :class="{'approved': record.status === '已批准', 'pending': record.status === '待审批', 'rejected': record.status === '已拒绝'}">
          {{ record.status }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      leaveRecords: [
        {
          name: "张三",
          reason: "身体不适",
          startTime: "2024-12-20 09:00",
          endTime: "2024-12-21 18:00",
          applyDate: "2024-12-16",
          status: "已批准"
        },
        {
          name: "李四",
          reason: "家中有事",
          startTime: "2024-12-25 08:30",
          endTime: "2024-12-26 17:30",
          applyDate: "2024-12-15",
          status: "待审批"
        },
        {
          name: "王五",
          reason: "外出旅游",
          startTime: "2024-12-22 12:00",
          endTime: "2024-12-24 12:00",
          applyDate: "2024-12-14",
          status: "已拒绝"
        }
      ]
    };
  }
};
</script>

<style>
.leave-records {
  padding: 20px;
  background-color: #f8f8f8;
}
.record {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.employee-name {
  font-weight: bold;
  font-size: 16px;
}
.apply-date {
  font-size: 14px;
  color: #888;
}
.record-body {
  margin-bottom: 10px;
}
.record-item {
  margin-bottom: 8px;
}
.label {
  font-weight: bold;
  color: #555;
}
.value {
  color: #333;
}
.record-footer {
  text-align: right;
}
.status {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
}
.status.approved {
  background-color: #d4edda;
  color: #155724;
}
.status.pending {
  background-color: #fff3cd;
  color: #856404;
}
.status.rejected {
  background-color: #f8d7da;
  color: #721c24;
}
</style>

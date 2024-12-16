<template>
  <view class="form-container container">
    <view class="form-title">新增员工信息</view>
    <form class="employee-form">
      <view class="form-group">
        <label for="userId">员工工号</label>
        <input
          id="userId"
          v-model="formData.userId"
          type="text"
          required
          placeholder="请输入员工工号"
        />
      </view>

      <view class="form-group">
        <label for="name">姓名</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          placeholder="请输入姓名"
        />
      </view>

      <view class="form-group">
        <label for="age">年龄</label>
        <input
          id="age"
          v-model="formData.age"
          type="number"
          required
          min="18"
          max="100"
          placeholder="请输入年龄"
        />
      </view>

      <view class="form-group">
        <label for="sex">性别</label>
        <picker mode="selector" :range="sexOptions" @change="onSexChange">
          <view>{{ formData.sex || "请选择性别" }}</view>
        </picker>
      </view>

      <view class="form-group">
        <label for="department">部门</label>
        <picker :range="departments" @change="onDepartmentChange">
          <view>{{ formData.department || "请选择部门" }}</view>
        </picker>
      </view>

     <button @click="submitForm" type="button" class="submit-btn">提交</button>
    </form>
  </view>
</template>

<script setup>
import { ref } from "vue";

// 表单数据
const formData = ref({
  userId: "",
  name: "",
  age: null,
  sex: "",
  department: "",
});

// 性别选项
const sexOptions = ["男", "女"];

// 部门选项
const departments = ["人力资源", "财务", "技术", "市场", "销售"];

// 性别选择事件
const onSexChange = (e) => {
  formData.value.sex = sexOptions[e.detail.value];
};

// 部门选择事件
const onDepartmentChange = (e) => {
  formData.value.department = departments[e.detail.value];
};

// 提交表单
const submitForm = () => {
  if (!formData.value.userId || !formData.value.name || !formData.value.age || !formData.value.sex || !formData.value.department) {
    uni.showToast({
      title: "请完整填写表单",
      icon: "none",
    });
    return;
  }

  // 发送请求
  uni.request({
    url: "http://localhost:8081/user/add",
    method: "POST",
    data: formData.value,
    header: {
      "Content-Type": "application/json",
    },
    success: (res) => {
      if (res.statusCode === 200) {
        uni.showToast({
          title: "新增员工成功！",
          icon: "success",
        });
        clearForm();
      } else {
        uni.showToast({
          title: res.data || "提交失败",
          icon: "error",
        });
      }
    },
    fail: (err) => {
      uni.showToast({
        title: "请求失败",
        icon: "none",
      });
      console.error("请求错误:", err);
    },
  });
};

// 清空表单
const clearForm = () => {
  formData.value = {
    userId: "",
    name: "",
    age: null,
    sex: "",
    department: "",
  };
};
</script>

<style scoped>
.form-container {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
}

.form-title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="number"],
picker {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button.submit-btn:hover {
  background-color: #45a049;
}
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0;
	background: linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%);
	min-height: 100vh;
	color: #fff;
}
</style>

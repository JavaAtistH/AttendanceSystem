<template>
  <view class="container">
    <view class="register-box">
      <text class="title">用户注册</text>
      
      <input 
        class="input" 
        type="text" 
        v-model="username" 
        placeholder="请输入用户名"
      />
      <input 
        class="input" 
        type="password" 
        v-model="password" 
        placeholder="请输入密码"
      />
      <input 
        class="input" 
        type="password" 
        v-model="confirmPassword" 
        placeholder="请确认密码"
      />
      
      <button class="register-btn" @click="handleRegister">注册</button>
      
      <text class="login-link" @click="goToLogin">已有账号？返回登录</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (!username.value || !password.value || !confirmPassword.value) {
    uni.showToast({
      title: '请填写所有字段',
      icon: 'none'
    })
    return
  }

  if (password.value !== confirmPassword.value) {
    uni.showToast({
      title: '两次输入的密码不一致',
      icon: 'none'
    })
    return
  }

  // 这里添加注册逻辑
  console.log('用户名:', username.value)
  console.log('密码:', password.value)
  
  // 可以在这里调用注册API
  uni.showToast({
    title: '注册功能待实现',
    icon: 'none'
  })
}

const goToLogin = () => {
  // 返回登录页面
  uni.navigateBack()
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.register-box {
  width: 80%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  padding: 0 10px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  font-size: 14px;
}

.register-btn {
  width: 100%;
  height: 40px;
  background-color: #007aff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #007aff;
  font-size: 14px;
}
</style>
<template>
  <div class="container">
    <div class="register-box">
      <h1 class="title">用户注册</h1>
      
      <div class="input-group">
        <input 
          class="input" 
          type="text" 
          v-model="registerData.adminname" 
          placeholder="请输入用户名"
        />
        <span class="input-border"></span>
      </div>
      
      <div class="input-group">
        <input 
          class="input" 
          type="password" 
          v-model="registerData.password" 
          placeholder="请输入密码"
        />
        <span class="input-border"></span>
      </div>
      
      <div class="input-group">
        <input 
          class="input" 
          type="password" 
          v-model="registerData.confirmPassword" 
          placeholder="请确认密码"
        />
        <span class="input-border"></span>
      </div>
      
      <button class="register-btn" @click="handleRegister">
        <span>注册</span>
      </button>
      
      <p class="login-link" @click="goToLogin">已有账号？返回登录</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const registerData = ref({
  adminname: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = () => {
  if (!registerData.value.adminname || !registerData.value.password) {
    uni.showToast({
      title: '用户名和密码不能为空',
      icon: 'none'
    })
    return
  }

  uni.request({
    url: 'http://localhost:8081/admin/add',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      adminname: registerData.value.adminname,
      password: registerData.value.password
    },
    success: (res) => {
      console.log('注册成功:', res.data);
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      });
    },
    fail: (err) => {
      console.error('请求失败:', err);
      uni.showToast({
        title: '添加失败，请重试',
        icon: 'none'
      });
    }
  });
}

const goToLogin = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
  font-family: 'Arial', sans-serif;
}

.register-box {
  width: 90%;
  max-width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  font-size: 28px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

.input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #ffffff;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  transition: 0.3s;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ffffff;
  transition: 0.3s;
}

.input:focus ~ .input-border,
.input:valid ~ .input-border {
  width: 100%;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  border-radius: 25px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
  position: relative;
}

.register-btn span {
  position: relative;
  z-index: 1;
}

.register-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #feca57, #ff6b6b);
  transition: 0.5s;
  z-index: 0;
}

.register-btn:hover::before {
  left: 0;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
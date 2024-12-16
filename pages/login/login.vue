<template>
	<view class="container">
		<view class="login-box">
			<text class="title">欢迎登录员工考勤管理系统</text>

			<view class="switch-box">
				<button :class="['switch-btn', { active: loginType === 'admin' }]" @click="handleAdminLogin">
					管理员登录
				</button>
				<button :class="['switch-btn', { active: loginType === 'employee' }]" @click="loginType = 'employee'">
					员工登录
				</button>
			</view>

			<view class="input-group">
				<text class="input-label">用户名</text>
				<input class="input" type="text" v-model="username" placeholder="请输入用户名" />
			</view>
			
			<view class="input-group">
				<text class="input-label">密码</text>
				<input class="input" type="password" v-model="password" placeholder="请输入密码" />
			</view>

			<button class="login-btn" @click="handleLogin">登录</button>

			<text class="register-link" @click="goToRegister">没有账号？去注册</text>
		</view>
	</view>
</template> 

<script setup>
import { ref } from 'vue'

const loginType = ref('employee')
const username = ref('')
const password = ref('')

const handleAdminLogin = () => {
	console.log('切换为管理员登录');
	loginType.value = 'admin';
	console.log(loginType.value);
};

const handleLogin = () => {
	console.log('登录类型:', loginType.value)
	console.log('用户名:', username.value)
	console.log('密码:', password.value)
	// 验证输入是否为空
	if (!username.value || !password.value) {
		uni.showToast({
			title: '用户名或密码不能为空',
			icon: 'none'
		});
		return;
	}
	// 根据登录类型调用不同的后端接口
	let apiUrl = '';
	if (loginType.value === 'admin') {
		apiUrl = 'http://localhost:8081/admin/login';
	} else {
		apiUrl = 'http://localhost:8081/employee/login'; 
	}

	uni.request({
		url: apiUrl,
		method: 'POST',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {
			name: username.value,
			password: password.value
		},
		success: (res) => {
			if (res.statusCode === 200) {
				// 保存用户信息到本地存储
				uni.setStorageSync('userInfo', JSON.stringify({
					username: username.value,
					avatar: '/static/p1.jpg' // 默认头像
				}));

				uni.showToast({
					title: '登录成功',
					icon: 'success'
				});

				// 跳转到不同的页面
				if (loginType.value === 'admin') {
					uni.switchTab({
						url: '/pages/attendanceManagement/attendanceManagement'
					});
				} else {
					uni.switchTab({
						url: '/pages/singIn/singIn'
					});
				}
			} else {
				uni.showToast({
					title: res.data,
					icon: 'none'
				});
			}
		},
		fail: (err) => {
			console.error('请求失败:', err);
			uni.showToast({
				title: '账号或密码有误，请稍后再试',
				icon: 'none'
			});
		}
	});
};

const goToRegister = () => {
	// 跳转到注册页面
	uni.navigateTo({
		url: '/pages/login/register'
	})
}
</script>

<style>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
	padding: 20px;
}

.login-box {
	width: 100%;
	max-width: 400px;
	padding: 30px;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 20px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.title {
	font-size: 28px;
	font-weight: bold;
	text-align: center;
	margin-bottom: 30px;
	color: #333;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.switch-box {
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
	background-color: #f0f0f0;
	border-radius: 15px;
	padding: 5px;
}

.switch-btn {
	flex: 1;
	padding: 12px;
	border: none;
	font-size: 16px;
	font-weight: bold;
	border-radius: 10px;
	transition: all 0.3s ease;
}

.switch-btn.active {
	background-color: #ff6b6b;
	color: #ffffff;
	box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
}

.input-group {
	margin-bottom: 20px;
}

.input-label {
	display: block;
	font-size: 14px;
	color: #666;
	margin-bottom: 5px;
}

.input {
	width: 100%;
	height: 45px;
	padding: 0 15px;
	border: 2px solid #dcdcdc;
	border-radius: 10px;
	font-size: 16px;
	transition: border-color 0.3s ease;
}

.input:focus {
	border-color: #ff6b6b;
	outline: none;
}

.login-btn {
	width: 100%;
	height: 50px;
	background-color: #ff6b6b;
	color: #ffffff;
	border: none;
	border-radius: 10px;
	font-size: 18px;
	font-weight: bold;
	margin-top: 20px;
	transition: all 0.3s ease;
	box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
}

.login-btn:active {
	transform: translateY(2px);
	box-shadow: 0 2px 5px rgba(255, 107, 107, 0.3);
}

.register-link {
	display: block;
	text-align: center;
	margin-top: 20px;
	color: #ff6b6b;
	font-size: 16px;
	text-decoration: underline;
}
</style>


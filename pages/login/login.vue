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

			<input class="input" type="text" v-model="username" placeholder="请输入用户名" />
			<input class="input" type="password" v-model="password" placeholder="请输入密码" />

			<button class="login-btn" @click="handleLogin">登录</button>

			<text class="register-link" @click="goToRegister">没有账号？去注册</text>
		</view>
	</view>
</template> 

<script setup>
	import {
		ref
	} from 'vue'

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
		//和stichtab的区别
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
		height: 100vh;
		background-color: #f0f0f0;
	}

	.login-box {
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

	.switch-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.switch-btn {
		flex: 1;
		padding: 10px;
		background-color: #f0f0f0;
		border: none;
		font-size: 14px;
	}

	.switch-btn.active {
		background-color: #007aff;
		color: #ffffff;
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

	.login-btn {
		width: 100%;
		height: 40px;
		background-color: #007aff;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		margin-top: 10px;
	}

	.register-link {
		display: block;
		text-align: center;
		margin-top: 15px;
		color: #007aff;
		font-size: 14px;
	}
</style>
<template>
	<view class="container">
		<view class="user-info">
			<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
			<text>hot-fix==>baranch</text>
			<text class="username">{{ userInfo.username }}</text>
		</view>
		
		<view class="action-buttons">
			<button class="btn edit-btn" @click="editUserInfo">修改用户信息</button>
			<button class="btn logout-btn" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: '/static/p1.jpg', // 默认头像路径，请确保此文件存在
					username: '用户名'
				}
			}
		},
		onLoad() {
			// 这里可以从本地存储或API获取用户信息
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				// 从本地存储获取用户信息的示例
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo) {
					this.userInfo = JSON.parse(userInfo)
				}
				// 如果需要从API获取，可以使用类似下面的代码
				// uni.request({
				//     url: 'your_api_url',
				//     method: 'GET',
				//     success: (res) => {
				//         this.userInfo = res.data
				//     }
				// })
			},
			editUserInfo() {
				// 跳转到编辑用户信息页面
				uni.navigateTo({
					url: '/pages/edit-profile/edit-profile'
				})
			},
			logout() {
				// 清除用户信息
				uni.removeStorageSync('userInfo')
				// 清除登录状态
				uni.removeStorageSync('token')
				
				// 显示退出成功提示
				uni.showToast({
					title: '退出登录成功',
					icon: 'success',
					duration: 2000
				})
				
				// 延迟跳转到登录页面，给用户一些时间看到提示
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}, 2000)
			}
		}
	}
</script>

<style>
.container {
	padding: 20px;
}

.user-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30px;
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 10px;
}

.username {
	font-size: 18px;
	font-weight: bold;
}

.action-buttons {
	display: flex;
	flex-direction: column;
}

.btn {
	margin-bottom: 15px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-radius: 5px;
	font-size: 16px;
}

.edit-btn {
	background-color: #007aff;
	color: #ffffff;
}

.logout-btn {
	background-color: #ff3b30;
	color: #ffffff;
}
</style>
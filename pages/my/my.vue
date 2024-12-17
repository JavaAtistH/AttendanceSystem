<template>
	<view class="container">
		<view class="user-info">
			<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
			<text class="username">欢迎{{ userInfo.username }}</text>
		</view>
		
		<view class="action-buttons">
			<button class="btn edit-btn" @click="editUserInfo">修改用户信息</button>
			<button class="btn logout-btn" @click="logout">退出登录</button>
		</view>
		<view class="additional-info">
			<button class="info-btn" @click="showAboutAuthor">关于作者</button>
			<button class="info-btn" @click="showMyTeam">我的团队</button>
			<button class="info-btn" @click="showVersionInfo">版本信息</button>
			<button class="info-btn" @click="goToSettings">设置</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				avatar: '/static/default-avatar.png',
				username: '用户名'
			}
		}
	},
	onLoad() {
		this.getUserInfo()
	},
	methods: {
		getUserInfo() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.userInfo = JSON.parse(userInfo)
			}
		},
		editUserInfo() {
			uni.navigateTo({
				url: '/pages/edit-profile/edit-profile'
			})
		},
		logout() {
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
			
			uni.showToast({
				title: '退出登录成功',
				icon: 'success',
				duration: 2000
			})
			
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}, 2000)
		},
		showAboutAuthor() {
			uni.showModal({
				title: '关于作者',
				content: '黄科钦',
				showCancel: false
			})
		},
		showMyTeam() {
			uni.showModal({
				title: '我的团队',
				content: '黄科钦666',
				showCancel: false
			})
		},
		showVersionInfo() {
			uni.showModal({
				title: '版本信息',
				content: '当前版本: 1.0.0',
				showCancel: false
			})
		},
		goToSettings() {
			uni.navigateTo({
				url: '/pages/settings/settings'
			})
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
	padding: 20px;
}
.user-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;
}

.avatar {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	margin-bottom: 20px;
	border: 4px solid #ffffff;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.username {
	font-size: 24px;
	font-weight: bold;
	color: #333333;
	text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

.action-buttons, .additional-info {
	width: 100%;
	max-width: 300px;
}

.btn, .info-btn {
	width: 100%;
	margin-bottom: 15px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	border-radius: 25px;
	font-size: 16px;
	font-weight: bold;
	transition: all 0.3s ease;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.edit-btn {
	background-color: #4CAF50;
	color: #ffffff;
}

.logout-btn {
	background-color: #FF5722;
	color: #ffffff;
}

.info-btn {
	background-color: rgba(255, 255, 255, 0.8);
	color: #333333;
}

.btn:active, .info-btn:active {
	transform: translateY(2px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.additional-info {
	margin-top: 30px;
}
</style>
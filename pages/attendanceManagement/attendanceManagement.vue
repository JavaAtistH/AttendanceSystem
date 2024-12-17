<template>
	<view class="container">
		<view class="header">
			<text class="time">{{ currentTime }}</text>
		</view>
		<view class="content">
			<text class="welcome-text">欢迎使用考勤管理系统！</text>
			<text class="welcome-text">开启牛马生活的一天！从打卡开始</text>
			<view class="card-container">
				<view class="card attendance-card" @click="checkAttendance">
					<view class="card-icon">
						<text class="iconfont icon-calendar"></text>
					</view>
					<view class="card-content">
						<text class="card-title">今日签到情况</text>
						<view class="attendance-stats">
							<view class="stat-item">
								<text class="stat-number">{{ signedInCount }}</text>
								<text class="stat-label">已签到</text>
							</view>
							<view class="stat-item">
								<text class="stat-number">{{ notSignedInCount }}</text>
								<text class="stat-label">未签到</text>
							</view>
						</view>
					</view>
				</view>
				<view class="card leave-card" @click="applyLeave">
					<view class="card-icon">
						<text class="iconfont icon-leave"></text>
					</view>
					<view class="card-content">
						<text class="card-title">员工请假申请</text>
					</view>
				</view>
				<view class="card employee-info-card" @click="enterEmployeeInfo">
					<view class="card-icon">
						<text class="iconfont icon-user-add"></text>
					</view>
					<view class="card-content">
						<text class="card-title">录入员工信息</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTime: '',
			signedInCount: 0,
			notSignedInCount: 0
		};
	},
	onLoad() {
		this.updateTime();
		this.fetchAttendanceData();
		this.timer = setInterval(this.updateTime, 1000);
	},
	onUnload() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
	methods: {
		updateTime() {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');

			this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		},
		async fetchAttendanceData() {
			try {
				const res = await uni.request({
					url: 'http://localhost:8081/attend/countSignedInCount',
					method: 'GET',
				});
				if (res.statusCode === 200 && res.data) {
					this.signedInCount = res.data.signedInCount;
					this.notSignedInCount = res.data.notSignedInCount;
				} else {
					console.error('获取签到数据失败', res);
				}
			} catch (error) {
				console.error('请求签到数据出错', error);
			}
		},
		checkAttendance() {
			uni.navigateTo({
				url: '/pages/attendance-status/attendance-status'
			});
		},
		applyLeave() {
			uni.navigateTo({
				url: '/pages/leave-application/leave-application'
			});
		},
		enterEmployeeInfo() {
			uni.navigateTo({
				url: '/pages/employee-info/employee-info'
			});
		}
	}
};
</script>

<style scoped>
@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1234567_abcdefg.ttf') format('truetype');
}

.iconfont {
	font-family: "iconfont" !important;
	font-size: 32px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-calendar:before {
	content: "\e6b6";
}

.icon-leave:before {
	content: "\e8b4";
}

.icon-user-add:before {
	content: "\e7fc";
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
	padding: 20px;
}

.header {
	width: 100%;
	text-align: center;
	padding: 20px 0;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
}

.time {
	font-size: 24px;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.content {
	margin-top: 40px;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.welcome-text {
	font-size: 28px;
	margin-bottom: 30px;
	color: #fff;
	text-align: center;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.card-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

.card {
	width: 100%;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 16px;
	padding: 24px;
	display: flex;
	align-items: center;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
}

.card:active {
	transform: translateY(4px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-icon {
	width: 70px;
	height: 70px;
	border-radius: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 24px;
	font-size: 36px;
}

.attendance-card .card-icon {
	background-color: #e6f7ff;
	color: #1890ff;
}

.leave-card .card-icon {
	background-color: #fff7e6;
	color: #fa8c16;
}

.employee-info-card .card-icon {
	background-color: #f6ffed;
	color: #52c41a;
}

.card-content {
	flex: 1;
}

.card-title {
	font-size: 22px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
}

.card-description {
	font-size: 16px;
	color: #666;
	margin-bottom: 12px;
}

.attendance-stats {
	display: flex;
	justify-content: space-between;
	margin-top: 16px;
}

.stat-item {
	text-align: center;
}

.stat-number {
	font-size: 24px;
	font-weight: bold;
	color: #1890ff;
	display: block;
}

.stat-label {
	font-size: 14px;
	color: #666;
}

@media screen and (min-width: 768px) {
	.card-container {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.card {
		width: calc(50% - 10px);
	}

	.attendance-card {
		width: 100%;
	}
}

@media screen and (min-width: 1024px) {
	.card {
		width: calc(33.33% - 14px);
	}

	.attendance-card {
		width: calc(66.66% - 7px);
	}
}
</style>


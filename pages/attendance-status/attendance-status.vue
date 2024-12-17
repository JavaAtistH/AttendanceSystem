<template>
	<view class="container">
		<view class="header">
			<text class="title">考勤列表</text>
		</view>
		
		<!-- 数据列表 -->
		<view class="user-list">
			<view v-for="(user, index) in users" :key="index" class="user-card">
				<view class="user-info">
					<view class="user-avatar">{{ user.name.charAt(0) }}</view>
					<view class="user-details">
						<text class="user-name">{{ user.name }}</text>
						<text class="user-department">{{ user.department }}</text>
					</view>
				</view>
				<view class="user-status">
					<text class="user-age">{{ user.age }}岁</text>
					<view :class="['status-badge', {'attended': user.isAttend === 1, 'not-attended': user.isAttend === 0}]">
						{{ user.isAttend === 1 ? '已签到' : '未签到' }}
					</view>
				</view>
				<!-- 编辑和删除按钮 -->
				<view class="user-actions">
					<button class="edit-btn" @click="editUser(user.id)">编辑</button>
					<button class="delete-btn" @click="confirmDelete(user.id)">删除</button>
				</view>
			</view>
		</view>

		<!-- 分页导航 -->
		<view class="pagination">
			<button @click="getPage(pageNum - 1)" :disabled="pageNum === 1" class="pagination-btn">
				<text class="iconfont icon-left"></text>
			</button>
			<text class="page-info">第 {{ pageNum }} 页 / 共 {{ pages }} 页</text>
			<button @click="getPage(pageNum + 1)" :disabled="pageNum === pages" class="pagination-btn">
				<text class="iconfont icon-right"></text>
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			users: [], // 用户列表
			pageNum: 1, // 当前页码
			pageSize: 5, // 每页显示条数
			pages: 1, // 总页数
		};
	},
	methods: {
		// 获取分页数据
		getPage(page) {
			if (page < 1 || page > this.pages) return;

			uni.request({
				url: "http://localhost:8081/user/page",
				method: "GET",
				data: {
					pageNum: page,
					pageSize: this.pageSize,
				},
				success: (res) => {
					if (res.statusCode === 200) {
						const data = res.data;
						this.users = data.list; // 更新用户列表
						this.pageNum = data.pageNum; // 更新当前页码
						this.pages = data.pages; // 更新总页数
					} else {
						uni.showToast({
							title: "数据加载失败",
							icon: "none",
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: "请求失败，请检查网络",
						icon: "none",
					});
				},
			});
		},
		// 跳转到编辑页面
		editUser(userId) {
			uni.navigateTo({
				url: `/pages/edit-user/edit-user?id=${userId}`, // 替换为你的编辑页面路径
			});
		},
		// 确认删除
		confirmDelete(userId) {
			uni.showModal({
				title: "确认删除",
				content: "确定要删除该用户吗？",
				success: (res) => {
					if (res.confirm) {
						this.deleteUser(userId);
					}
				},
			});
		},
		// 删除用户
		deleteUser(userId) {
			uni.request({
				url: `http://localhost:8081/user/${userId}`,
				method: "DELETE",
				success: (res) => {
					if (res.statusCode === 200) {
						uni.showToast({
							title: "删除成功",
							icon: "success",
						});
						this.getPage(this.pageNum); // 重新加载当前页数据
					} else {
						uni.showToast({
							title: "删除失败",
							icon: "none",
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: "请求失败，请检查网络",
						icon: "none",
					});
				},
			});
		},
	},
	// 页面加载时获取第一页数据
	onLoad() {
		this.getPage(1);
	},
};
</script>

<style scoped>
@font-face {
	font-family: 'iconfont';
	src: url('//at.alicdn.com/t/font_1234567_abcdefg.ttf') format('truetype');
}

.iconfont {
	font-family: "iconfont" !important;
	font-size: 24px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.icon-left:before {
	content: "\e6ef";
}

.icon-right:before {
	content: "\e6ed";
}

.container {
	background-color: #f0f2f5;
	min-height: 100vh;
	padding: 20px;
}

.header {
	margin-bottom: 20px;
}

.title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
}

.user-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.user-card {
	background-color: #fff;
	border-radius: 10px;
	padding: 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:active {
	transform: translateY(2px);
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.user-info {
	display: flex;
	align-items: center;
	gap: 15px;
}

.user-avatar {
	width: 50px;
	height: 50px;
	background-color: #007aff;
	color: #fff;
	border-radius: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	font-weight: bold;
}

.user-details {
	display: flex;
	flex-direction: column;
}

.user-name {
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.user-department {
	font-size: 14px;
	color: #666;
}

.user-status {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 5px;
}

.user-age {
	font-size: 14px;
	color: #666;
}

.status-badge {
	padding: 5px 10px;
	border-radius: 15px;
	font-size: 12px;
	font-weight: bold;
}

.attended {
	background-color: #e6f7ff;
	color: #1890ff;
}

.not-attended {
	background-color: #fff1f0;
	color: #ff4d4f;
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	gap: 15px;
}

.pagination-btn {
	width: 40px;
	height: 40px;
	border-radius: 20px;
	background-color: #007aff;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	transition: background-color 0.3s ease;
}

.pagination-btn:disabled {
	background-color: #ccc;
}

.pagination-btn:active {
	background-color: #0056b3;
}

.page-info {
	font-size: 14px;
	color: #666;
}

@media (min-width: 768px) {
	.container {
		padding: 40px;
	}

	.user-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}
}
.user-actions {
	display: flex;
	gap: 10px;
	margin-top: 10px;
}

.edit-btn {
	background-color: #4caf50;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 14px;
}

.delete-btn {
	background-color: #f44336;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 14px;
}
</style>


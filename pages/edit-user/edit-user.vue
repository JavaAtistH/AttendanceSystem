<template>
	<view class="container">
		<view class="form-header">
			<text class="form-title">员工信息表</text>
		</view>
		<view class="form-content">
			<view class="form-item">
				<text class="label">员工ID</text>
				<input v-model="formData.id" type="text" disabled class="input" />
			</view>

			<view class="form-item">
				<text class="label">员工工号</text>
				<input v-model="formData.userId" type="text" class="input" />
			</view>

			<view class="form-item">
				<text class="label">员工姓名</text>
				<input v-model="formData.name" type="text" class="input" />
			</view>

			<view class="form-item">
				<text class="label">员工年龄</text>
				<input v-model="formData.age" type="number" class="input" />
			</view>

			<view class="form-item">
				<text class="label">性别</text>
				<picker v-model="formData.sex" mode="selector" :range="['男', '女']" class="input picker">
					<view class="picker-text">
						{{ formData.sex || '请选择性别' }}
					</view>
				</picker>
			</view>

			<view class="form-item">
				<text class="label">员工部门</text>
				<input v-model="formData.department" type="text" class="input" />
			</view>

			<view class="form-item switch-item">
				<text class="label">是否签到</text>
				<switch v-model="formData.isAttend" color="#007AFF" />
			</view>

			<view class="button-container">
				<button @click="submitForm" type="button" class="submit-btn">提交信息</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				id: 0,
				userId: '',
				name: '',
				age: '',
				sex: '',
				department: '',
				isAttend: false,
			}
		};
	},
	onLoad(options) {
		const userId = options.id;
		this.formData.id = userId;
		this.fetchUserData(userId);
	},
	methods: {
		fetchUserData(userId) {
			uni.showLoading({
				title: '加载中...'
			});
			uni.request({
				url: `http://localhost:8081/user/${userId}`,
				method: 'GET',
				success: (res) => {
					uni.hideLoading();
					if (res.data) {
						this.formData = {
							...this.formData,
							userId: res.data.userId,
							name: res.data.name,
							age: res.data.age,
							sex: res.data.sex,
							department: res.data.department,
							isAttend: res.data.isAttend === 1
						};
					} else {
						this.showToast('获取数据失败');
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error(err);
					this.showToast('请求失败');
				}
			});
		},
		submitForm() {
			uni.showLoading({
				title: '提交中...'
			});
			const submitData = {
				...this.formData,
				isAttend: this.formData.isAttend ? 1 : 0
			};
			uni.request({
				url: `http://localhost:8081/user/update`,
				method: 'PUT',
				data: submitData,
				header: {
					'Content-Type': 'application/json'
				},
				success: (res) => {
					uni.hideLoading();
					if (res.data === '修改员工成功') {
						this.showToast('保存成功', 'success');
					} else {
						this.showToast('保存失败');
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error(err);
					this.showToast('保存失败');
				}
			});
		},
		showToast(title, icon = 'none') {
			uni.showToast({
				title,
				icon
			});
		}
	}
};
</script>

<style>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding: 20px;
}

.form-header {
	background-color: #007AFF;
	padding: 20px;
	border-radius: 10px 10px 0 0;
	margin-bottom: 20px;
}

.form-title {
	color: #ffffff;
	font-size: 24px;
	font-weight: bold;
	text-align: center;
}

.form-content {
	background-color: #ffffff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-item {
	margin-bottom: 20px;
}

.label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
	color: #333;
}

.input {
	width: 100%;
	height: 40px;
	padding: 5px 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	font-size: 16px;
	transition: border-color 0.3s;
}

.input:focus {
	border-color: #007AFF;
}

.picker {
	position: relative;
}

.picker-text {
	height: 40px;
	line-height: 40px;
	padding: 0 10px;
}

.switch-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.submit-btn {
	width: 100%;
	height: 45px;
	line-height: 45px;
	background-color: #007AFF;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 18px;
	font-weight: bold;
	transition: background-color 0.3s;
}

.submit-btn:active {
	background-color: #0056b3;
}

/* 添加一些动画效果 */
@keyframes fadeIn {
	from { opacity: 0; transform: translateY(20px); }
	to { opacity: 1; transform: translateY(0); }
}

.form-item {
	animation: fadeIn 0.5s ease-out forwards;
}

.form-item:nth-child(1) { animation-delay: 0.1s; }
.form-item:nth-child(2) { animation-delay: 0.2s; }
.form-item:nth-child(3) { animation-delay: 0.3s; }
.form-item:nth-child(4) { animation-delay: 0.4s; }
.form-item:nth-child(5) { animation-delay: 0.5s; }
.form-item:nth-child(6) { animation-delay: 0.6s; }
.form-item:nth-child(7) { animation-delay: 0.7s; }

.button-container {
	animation: fadeIn 0.5s ease-out 0.8s forwards;
	opacity: 0;
}
</style>
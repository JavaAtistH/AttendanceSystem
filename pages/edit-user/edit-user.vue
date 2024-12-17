<template>
	<view class="container">
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
			<picker v-model="formData.sex" mode="selector" :range="['男', '女']" class="input">
				<view class="picker">
					{{ formData.sex }}
				</view>
			</picker>
		</view>

		<view class="form-item">
			<text class="label">员工部门</text>
			<input v-model="formData.department" type="text" class="input" />
		</view>

		<view class="form-item">
			<text class="label">是否签到</text>
			<switch v-model="formData.isAttend" />
		</view>

		<!-- 提交按钮 -->
		<view class="button-container">
			<button @click="submitForm" type="button" class="submit-btn">提交信息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					id: 0, // 员工ID
					userId: '', // 员工工号
					name: '', // 员工姓名
					age: '', // 员工年龄
					sex: '', // 性别
					department: '', // 员工部门
					isAttend: false, // 是否签到
				}
			};
		},
		onLoad(options) {
			const userId = options.id;
			this.formData.id = userId;// 获取传递的员工ID
			this.fetchUserData(userId); // 调用获取数据的方法
		},
		methods: {
			// 获取员工信息
			fetchUserData(userId) {
				uni.request({
					url: `http://localhost:8081/user/${userId}`,
					method: 'GET',
					success: (res) => {
						if (res.data) {
							this.formData.userId = res.data.userId;
							this.formData.name = res.data.name;
							this.formData.age = res.data.age;
							this.formData.sex = res.data.sex;
							this.formData.department = res.data.department;
							this.formData.isAttend = res.data.isAttend === 1; // 转换为布尔值
						} else {
							uni.showToast({
								title: '获取数据失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.error(err);
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
					}
				});
			},
			// 提交表单数据
			submitForm() {
				// 将 isAttend 转换为 0 或 1
				this.formData.isAttend = this.formData.isAttend ? 1 : 0;
				uni.request({
					url: `http://localhost:8081/user/update`,
					method: 'PUT',
					data: this.formData, // 提交整个formData
					header: {
						'Content-Type': 'application/json'
					},
					success: (res) => {
						if (res.data === '修改员工成功') {
							uni.showToast({
								title: '保存成功',
								icon: 'success'
							});
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						});
						console.error(err);
					}
				});
			}


		}
	};
</script>

<style scoped>
	.container {
		padding: 20px;
	}

	.form-item {
		margin-bottom: 20px;
	}

	.label {
		display: block;
		margin-bottom: 5px;
	}

	.input {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.picker {
		display: inline-block;
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.switch {
		display: inline-block;
		margin-left: 10px;
	}

	.submit-btn {
		width: 100%;
		padding: 12px;
		background-color: #007AFF;
		color: white;
		border: none;
		border-radius: 5px;
	}
</style>
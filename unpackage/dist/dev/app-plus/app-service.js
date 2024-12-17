if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$b = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const loginType = vue.ref("employee");
      const username = vue.ref("");
      const password = vue.ref("");
      const handleAdminLogin = () => {
        formatAppLog("log", "at pages/login/login.vue:40", "切换为管理员登录");
        loginType.value = "admin";
        formatAppLog("log", "at pages/login/login.vue:42", loginType.value);
      };
      const handleLogin = () => {
        formatAppLog("log", "at pages/login/login.vue:46", "登录类型:", loginType.value);
        formatAppLog("log", "at pages/login/login.vue:47", "用户名:", username.value);
        formatAppLog("log", "at pages/login/login.vue:48", "密码:", password.value);
        if (!username.value || !password.value) {
          uni.showToast({
            title: "用户名或密码不能为空",
            icon: "none"
          });
          return;
        }
        let apiUrl = "";
        if (loginType.value === "admin") {
          apiUrl = "http://localhost:8081/admin/login";
        } else {
          apiUrl = "http://localhost:8081/employee/login";
        }
        uni.request({
          url: apiUrl,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            name: username.value,
            password: password.value
          },
          success: (res) => {
            if (res.statusCode === 200) {
              uni.setStorageSync("userInfo", JSON.stringify({
                username: username.value,
                avatar: "/static/p1.jpg"
                // 默认头像
              }));
              uni.showToast({
                title: "登录成功",
                icon: "success"
              });
              if (loginType.value === "admin") {
                uni.switchTab({
                  url: "/pages/attendanceManagement/attendanceManagement"
                });
              } else {
                uni.switchTab({
                  url: "/pages/singIn/singIn"
                });
              }
            } else {
              uni.showToast({
                title: res.data,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/login/login.vue:106", "请求失败:", err);
            uni.showToast({
              title: "账号或密码有误，请稍后再试",
              icon: "none"
            });
          }
        });
      };
      const goToRegister = () => {
        uni.navigateTo({
          url: "/pages/login/register"
        });
      };
      const __returned__ = { loginType, username, password, handleAdminLogin, handleLogin, goToRegister, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "login-box" }, [
        vue.createElementVNode("text", { class: "title" }, "欢迎登录员工考勤管理系统"),
        vue.createElementVNode("view", { class: "switch-box" }, [
          vue.createElementVNode(
            "button",
            {
              class: vue.normalizeClass(["switch-btn", { active: $setup.loginType === "admin" }]),
              onClick: $setup.handleAdminLogin
            },
            " 管理员登录 ",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "button",
            {
              class: vue.normalizeClass(["switch-btn", { active: $setup.loginType === "employee" }]),
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.loginType = "employee")
            },
            " 员工登录 ",
            2
            /* CLASS */
          )
        ]),
        vue.createElementVNode("view", { class: "input-group" }, [
          vue.createElementVNode("text", { class: "input-label" }, "用户名"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.username = $event),
              placeholder: "请输入用户名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.username]
          ])
        ]),
        vue.createElementVNode("view", { class: "input-group" }, [
          vue.createElementVNode("text", { class: "input-label" }, "密码"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.password = $event),
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.password]
          ])
        ]),
        vue.createElementVNode("button", {
          class: "login-btn",
          onClick: $setup.handleLogin
        }, "登录"),
        vue.createElementVNode("text", {
          class: "register-link",
          onClick: $setup.goToRegister
        }, "没有账号？去注册")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/login/login.vue"]]);
  const _sfc_main$a = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("text", null, "签到了吗")
    ]);
  }
  const PagesSingInSingIn = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/singIn/singIn.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("text", null, "签到记录")
    ]);
  }
  const PagesSingInRecordSingInRecord = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/singInRecord/singInRecord.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        userInfo: {
          avatar: "/static/default-avatar.png",
          username: "用户名"
        }
      };
    },
    onLoad() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        const userInfo = uni.getStorageSync("userInfo");
        if (userInfo) {
          this.userInfo = JSON.parse(userInfo);
        }
      },
      editUserInfo() {
        uni.navigateTo({
          url: "/pages/edit-profile/edit-profile"
        });
      },
      logout() {
        uni.removeStorageSync("userInfo");
        uni.removeStorageSync("token");
        uni.showToast({
          title: "退出登录成功",
          icon: "success",
          duration: 2e3
        });
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/login/login"
          });
        }, 2e3);
      },
      showAboutAuthor() {
        uni.showModal({
          title: "关于作者",
          content: "黄科钦",
          showCancel: false
        });
      },
      showMyTeam() {
        uni.showModal({
          title: "我的团队",
          content: "黄科钦666",
          showCancel: false
        });
      },
      showVersionInfo() {
        uni.showModal({
          title: "版本信息",
          content: "当前版本: 1.0.0",
          showCancel: false
        });
      },
      goToSettings() {
        uni.navigateTo({
          url: "/pages/settings/settings"
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "user-info" }, [
        vue.createElementVNode("image", {
          class: "avatar",
          src: $data.userInfo.avatar,
          mode: "aspectFill"
        }, null, 8, ["src"]),
        vue.createElementVNode(
          "text",
          { class: "username" },
          "欢迎" + vue.toDisplayString($data.userInfo.username),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "action-buttons" }, [
        vue.createElementVNode("button", {
          class: "btn edit-btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.editUserInfo && $options.editUserInfo(...args))
        }, "修改用户信息"),
        vue.createElementVNode("button", {
          class: "btn logout-btn",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.logout && $options.logout(...args))
        }, "退出登录")
      ]),
      vue.createElementVNode("view", { class: "additional-info" }, [
        vue.createElementVNode("button", {
          class: "info-btn",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.showAboutAuthor && $options.showAboutAuthor(...args))
        }, "关于作者"),
        vue.createElementVNode("button", {
          class: "info-btn",
          onClick: _cache[3] || (_cache[3] = (...args) => $options.showMyTeam && $options.showMyTeam(...args))
        }, "我的团队"),
        vue.createElementVNode("button", {
          class: "info-btn",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.showVersionInfo && $options.showVersionInfo(...args))
        }, "版本信息"),
        vue.createElementVNode("button", {
          class: "info-btn",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.goToSettings && $options.goToSettings(...args))
        }, "设置")
      ])
    ]);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/my/my.vue"]]);
  const _sfc_main$7 = {
    __name: "register",
    setup(__props, { expose: __expose }) {
      __expose();
      const registerData = vue.ref({
        adminname: "",
        password: "",
        confirmPassword: ""
      });
      const handleRegister = () => {
        if (!registerData.value.adminname || !registerData.value.password) {
          uni.showToast({
            title: "用户名和密码不能为空",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://localhost:8081/admin/add",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            adminname: registerData.value.adminname,
            password: registerData.value.password
          },
          success: (res) => {
            formatAppLog("log", "at pages/login/register.vue:74", "注册成功:", res.data);
            uni.showToast({
              title: "添加成功",
              icon: "success"
            });
          },
          fail: (err) => {
            formatAppLog("error", "at pages/login/register.vue:81", "请求失败:", err);
            uni.showToast({
              title: "添加失败，请重试",
              icon: "none"
            });
          }
        });
      };
      const goToLogin = () => {
        uni.navigateBack();
      };
      const __returned__ = { registerData, handleRegister, goToLogin, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "container" }, [
      vue.createElementVNode("div", { class: "register-box" }, [
        vue.createElementVNode("h1", { class: "title" }, "用户注册"),
        vue.createElementVNode("div", { class: "input-group" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "text",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.registerData.adminname = $event),
              placeholder: "请输入用户名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.registerData.adminname]
          ]),
          vue.createElementVNode("span", { class: "input-border" })
        ]),
        vue.createElementVNode("div", { class: "input-group" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.registerData.password = $event),
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.registerData.password]
          ]),
          vue.createElementVNode("span", { class: "input-border" })
        ]),
        vue.createElementVNode("div", { class: "input-group" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "input",
              type: "password",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.registerData.confirmPassword = $event),
              placeholder: "请确认密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.registerData.confirmPassword]
          ]),
          vue.createElementVNode("span", { class: "input-border" })
        ]),
        vue.createElementVNode("button", {
          class: "register-btn",
          onClick: $setup.handleRegister
        }, [
          vue.createElementVNode("span", null, "注册")
        ]),
        vue.createElementVNode("p", {
          class: "login-link",
          onClick: $setup.goToLogin
        }, "已有账号？返回登录")
      ])
    ]);
  }
  const PagesLoginRegister = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-838b72c9"], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/login/register.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        currentTime: "",
        signedInCount: 0,
        notSignedInCount: 0
      };
    },
    onLoad() {
      this.updateTime();
      this.fetchAttendanceData();
      this.timer = setInterval(this.updateTime, 1e3);
    },
    onUnload() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    methods: {
      updateTime() {
        const now = /* @__PURE__ */ new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      },
      async fetchAttendanceData() {
        try {
          const res = await uni.request({
            url: "http://localhost:8081/attend/countSignedInCount",
            method: "GET"
          });
          if (res.statusCode === 200 && res.data) {
            this.signedInCount = res.data.signedInCount;
            this.notSignedInCount = res.data.notSignedInCount;
          } else {
            formatAppLog("error", "at pages/attendanceManagement/attendanceManagement.vue:89", "获取签到数据失败", res);
          }
        } catch (error) {
          formatAppLog("error", "at pages/attendanceManagement/attendanceManagement.vue:92", "请求签到数据出错", error);
        }
      },
      checkAttendance() {
        uni.navigateTo({
          url: "/pages/attendance-status/attendance-status"
        });
      },
      applyLeave() {
        uni.navigateTo({
          url: "/pages/leave-application/leave-application"
        });
      },
      enterEmployeeInfo() {
        uni.navigateTo({
          url: "/pages/employee-info/employee-info"
        });
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode(
          "text",
          { class: "time" },
          vue.toDisplayString($data.currentTime),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("text", { class: "welcome-text" }, "欢迎使用考勤管理系统！"),
        vue.createElementVNode("view", { class: "card-container" }, [
          vue.createElementVNode("view", {
            class: "card attendance-card",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.checkAttendance && $options.checkAttendance(...args))
          }, [
            vue.createElementVNode("view", { class: "card-icon" }, [
              vue.createElementVNode("text", { class: "iconfont icon-calendar" })
            ]),
            vue.createElementVNode("view", { class: "card-content" }, [
              vue.createElementVNode("text", { class: "card-title" }, "今日签到情况"),
              vue.createElementVNode("view", { class: "attendance-stats" }, [
                vue.createElementVNode("view", { class: "stat-item" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "stat-number" },
                    vue.toDisplayString($data.signedInCount),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "stat-label" }, "已签到")
                ]),
                vue.createElementVNode("view", { class: "stat-item" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "stat-number" },
                    vue.toDisplayString($data.notSignedInCount),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "stat-label" }, "未签到")
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", {
            class: "card leave-card",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.applyLeave && $options.applyLeave(...args))
          }, [
            vue.createElementVNode("view", { class: "card-icon" }, [
              vue.createElementVNode("text", { class: "iconfont icon-leave" })
            ]),
            vue.createElementVNode("view", { class: "card-content" }, [
              vue.createElementVNode("text", { class: "card-title" }, "员工请假申请")
            ])
          ]),
          vue.createElementVNode("view", {
            class: "card employee-info-card",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.enterEmployeeInfo && $options.enterEmployeeInfo(...args))
          }, [
            vue.createElementVNode("view", { class: "card-icon" }, [
              vue.createElementVNode("text", { class: "iconfont icon-user-add" })
            ]),
            vue.createElementVNode("view", { class: "card-content" }, [
              vue.createElementVNode("text", { class: "card-title" }, "录入员工信息")
            ])
          ])
        ])
      ])
    ]);
  }
  const PagesAttendanceManagementAttendanceManagement = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/attendanceManagement/attendanceManagement.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesDataAnalysisDataAnalysis = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/dataAnalysis/dataAnalysis.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesEditProfileEditProfile = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/edit-profile/edit-profile.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        users: [],
        // 用户列表
        pageNum: 1,
        // 当前页码
        pageSize: 5,
        // 每页显示条数
        pages: 1
        // 总页数
      };
    },
    methods: {
      // 获取分页数据
      getPage(page) {
        if (page < 1 || page > this.pages)
          return;
        uni.request({
          url: "http://localhost:8081/user/page",
          method: "GET",
          data: {
            pageNum: page,
            pageSize: this.pageSize
          },
          success: (res) => {
            if (res.statusCode === 200) {
              const data = res.data;
              this.users = data.list;
              this.pageNum = data.pageNum;
              this.pages = data.pages;
            } else {
              uni.showToast({
                title: "数据加载失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络",
              icon: "none"
            });
          }
        });
      },
      // 跳转到编辑页面
      editUser(userId) {
        uni.navigateTo({
          url: `/pages/edit-user/edit-user?id=${userId}`
          // 替换为你的编辑页面路径
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
          }
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
                icon: "success"
              });
              this.getPage(this.pageNum);
            } else {
              uni.showToast({
                title: "删除失败",
                icon: "none"
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "请求失败，请检查网络",
              icon: "none"
            });
          }
        });
      }
    },
    // 页面加载时获取第一页数据
    onLoad() {
      this.getPage(1);
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("text", { class: "title" }, "考勤列表")
      ]),
      vue.createCommentVNode(" 数据列表 "),
      vue.createElementVNode("view", { class: "user-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.users, (user, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "user-card"
            }, [
              vue.createElementVNode("view", { class: "user-info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "user-avatar" },
                  vue.toDisplayString(user.name.charAt(0)),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "user-details" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "user-name" },
                    vue.toDisplayString(user.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "user-department" },
                    vue.toDisplayString(user.department),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "user-status" }, [
                vue.createElementVNode(
                  "text",
                  { class: "user-age" },
                  vue.toDisplayString(user.age) + "岁",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["status-badge", { "attended": user.isAttend === 1, "not-attended": user.isAttend === 0 }])
                  },
                  vue.toDisplayString(user.isAttend === 1 ? "已签到" : "未签到"),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createCommentVNode(" 编辑和删除按钮 "),
              vue.createElementVNode("view", { class: "user-actions" }, [
                vue.createElementVNode("button", {
                  class: "edit-btn",
                  onClick: ($event) => $options.editUser(user.id)
                }, "编辑", 8, ["onClick"]),
                vue.createElementVNode("button", {
                  class: "delete-btn",
                  onClick: ($event) => $options.confirmDelete(user.id)
                }, "删除", 8, ["onClick"])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 分页导航 "),
      vue.createElementVNode("view", { class: "pagination" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.getPage($data.pageNum - 1)),
          disabled: $data.pageNum === 1,
          class: "pagination-btn"
        }, [
          vue.createElementVNode("text", { class: "iconfont icon-left" })
        ], 8, ["disabled"]),
        vue.createElementVNode(
          "text",
          { class: "page-info" },
          "第 " + vue.toDisplayString($data.pageNum) + " 页 / 共 " + vue.toDisplayString($data.pages) + " 页",
          1
          /* TEXT */
        ),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = ($event) => $options.getPage($data.pageNum + 1)),
          disabled: $data.pageNum === $data.pages,
          class: "pagination-btn"
        }, [
          vue.createElementVNode("text", { class: "iconfont icon-right" })
        ], 8, ["disabled"])
      ])
    ]);
  }
  const PagesAttendanceStatusAttendanceStatus = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-19377750"], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/attendance-status/attendance-status.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        leaveRecords: [
          {
            name: "张三",
            reason: "身体不适",
            startTime: "2024-12-20 09:00",
            endTime: "2024-12-21 18:00",
            applyDate: "2024-12-16",
            status: "已批准"
          },
          {
            name: "李四",
            reason: "家中有事",
            startTime: "2024-12-25 08:30",
            endTime: "2024-12-26 17:30",
            applyDate: "2024-12-15",
            status: "待审批"
          },
          {
            name: "王五",
            reason: "外出旅游",
            startTime: "2024-12-22 12:00",
            endTime: "2024-12-24 12:00",
            applyDate: "2024-12-14",
            status: "已拒绝"
          }
        ]
      };
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "leave-records" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.leaveRecords, (record, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "record",
            key: index
          }, [
            vue.createElementVNode("view", { class: "record-header" }, [
              vue.createElementVNode(
                "text",
                { class: "employee-name" },
                vue.toDisplayString(record.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { class: "apply-date" },
                vue.toDisplayString(record.applyDate),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "record-body" }, [
              vue.createElementVNode("view", { class: "record-item" }, [
                vue.createElementVNode("text", { class: "label" }, "请假原因："),
                vue.createElementVNode(
                  "text",
                  { class: "value" },
                  vue.toDisplayString(record.reason),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "record-item" }, [
                vue.createElementVNode("text", { class: "label" }, "请假时间："),
                vue.createElementVNode(
                  "text",
                  { class: "value" },
                  vue.toDisplayString(record.startTime) + " 至 " + vue.toDisplayString(record.endTime),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "record-footer" }, [
              vue.createElementVNode(
                "text",
                {
                  class: vue.normalizeClass(["status", { "approved": record.status === "已批准", "pending": record.status === "待审批", "rejected": record.status === "已拒绝" }])
                },
                vue.toDisplayString(record.status),
                3
                /* TEXT, CLASS */
              )
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesLeaveApplicationLeaveApplication = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/leave-application/leave-application.vue"]]);
  const _sfc_main$1 = {
    __name: "employee-info",
    setup(__props, { expose: __expose }) {
      __expose();
      const formData = vue.ref({
        userId: "",
        name: "",
        age: null,
        sex: "",
        department: ""
      });
      const sexOptions = ["男", "女"];
      const departments = ["人力资源", "财务", "技术", "市场", "销售"];
      const onSexChange = (e) => {
        formData.value.sex = sexOptions[e.detail.value];
      };
      const onDepartmentChange = (e) => {
        formData.value.department = departments[e.detail.value];
      };
      const submitForm = () => {
        if (!formData.value.userId || !formData.value.name || !formData.value.age || !formData.value.sex || !formData.value.department) {
          uni.showToast({
            title: "请完整填写表单",
            icon: "none"
          });
          return;
        }
        uni.request({
          url: "http://localhost:8081/user/add",
          method: "POST",
          data: formData.value,
          header: {
            "Content-Type": "application/json"
          },
          success: (res) => {
            if (res.statusCode === 200) {
              uni.showToast({
                title: "新增员工成功！",
                icon: "success"
              });
              clearForm();
            } else {
              uni.showToast({
                title: res.data || "提交失败",
                icon: "error"
              });
            }
          },
          fail: (err) => {
            uni.showToast({
              title: "请求失败",
              icon: "none"
            });
            formatAppLog("error", "at pages/employee-info/employee-info.vue:124", "请求错误:", err);
          }
        });
      };
      const clearForm = () => {
        formData.value = {
          userId: "",
          name: "",
          age: null,
          sex: "",
          department: ""
        };
      };
      const __returned__ = { formData, sexOptions, departments, onSexChange, onDepartmentChange, submitForm, clearForm, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "form-container container" }, [
      vue.createElementVNode("view", { class: "form-title" }, "新增员工信息"),
      vue.createElementVNode("form", { class: "employee-form" }, [
        vue.createElementVNode("view", { class: "form-group" }, [
          vue.createElementVNode("label", { for: "userId" }, "员工工号"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              id: "userId",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.formData.userId = $event),
              type: "text",
              required: "",
              placeholder: "请输入员工工号"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.formData.userId]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-group" }, [
          vue.createElementVNode("label", { for: "name" }, "姓名"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              id: "name",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.formData.name = $event),
              type: "text",
              required: "",
              placeholder: "请输入姓名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.formData.name]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-group" }, [
          vue.createElementVNode("label", { for: "age" }, "年龄"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              id: "age",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.formData.age = $event),
              type: "number",
              required: "",
              min: "18",
              max: "100",
              placeholder: "请输入年龄"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.formData.age]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-group" }, [
          vue.createElementVNode("label", { for: "sex" }, "性别"),
          vue.createElementVNode(
            "picker",
            {
              mode: "selector",
              range: $setup.sexOptions,
              onChange: $setup.onSexChange
            },
            [
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString($setup.formData.sex || "请选择性别"),
                1
                /* TEXT */
              )
            ],
            32
            /* NEED_HYDRATION */
          )
        ]),
        vue.createElementVNode("view", { class: "form-group" }, [
          vue.createElementVNode("label", { for: "department" }, "部门"),
          vue.createElementVNode(
            "picker",
            {
              range: $setup.departments,
              onChange: $setup.onDepartmentChange
            },
            [
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString($setup.formData.department || "请选择部门"),
                1
                /* TEXT */
              )
            ],
            32
            /* NEED_HYDRATION */
          )
        ]),
        vue.createElementVNode("button", {
          onClick: $setup.submitForm,
          type: "button",
          class: "submit-btn"
        }, "提交")
      ])
    ]);
  }
  const PagesEmployeeInfoEmployeeInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-927fe0d8"], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/employee-info/employee-info.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/singIn/singIn", PagesSingInSingIn);
  __definePage("pages/singInRecord/singInRecord", PagesSingInRecordSingInRecord);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/login/register", PagesLoginRegister);
  __definePage("pages/attendanceManagement/attendanceManagement", PagesAttendanceManagementAttendanceManagement);
  __definePage("pages/dataAnalysis/dataAnalysis", PagesDataAnalysisDataAnalysis);
  __definePage("pages/edit-profile/edit-profile", PagesEditProfileEditProfile);
  __definePage("pages/attendance-status/attendance-status", PagesAttendanceStatusAttendanceStatus);
  __definePage("pages/leave-application/leave-application", PagesLeaveApplicationLeaveApplication);
  __definePage("pages/employee-info/employee-info", PagesEmployeeInfoEmployeeInfo);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:8", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:11", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:14", "App Hide");
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return null;
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);

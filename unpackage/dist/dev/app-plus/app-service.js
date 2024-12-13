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
  const _sfc_main$7 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const loginType = vue.ref("employee");
      const username = vue.ref("");
      const password = vue.ref("");
      const handleAdminLogin = () => {
        formatAppLog("log", "at pages/login/login.vue:35", "切换为管理员登录");
        loginType.value = "admin";
        formatAppLog("log", "at pages/login/login.vue:37", loginType.value);
      };
      const handleLogin = () => {
        formatAppLog("log", "at pages/login/login.vue:42", "登录类型:", loginType.value);
        formatAppLog("log", "at pages/login/login.vue:43", "用户名:", username.value);
        formatAppLog("log", "at pages/login/login.vue:44", "密码:", password.value);
        if (loginType.value === "admin") {
          formatAppLog("log", "at pages/login/login.vue:51", "当前登录类型:", loginType.value);
          uni.switchTab({
            url: "/pages/attendanceManagement/attendanceManagement"
            // 管理员的主页面
          });
        } else {
          uni.switchTab({
            url: "/pages/singIn/singIn"
            // 员工的主页面
          });
        }
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
        ]),
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
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/login/login.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("text", null, "签到了吗")
    ]);
  }
  const PagesSingInSingIn = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/singIn/singIn.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("text", null, "签到记录")
    ]);
  }
  const PagesSingInRecordSingInRecord = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/singInRecord/singInRecord.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        userInfo: {
          avatar: "/static/p1.jpg",
          // 默认头像路径，请确保此文件存在
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
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
          vue.toDisplayString($data.userInfo.username),
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
      ])
    ]);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/my/my.vue"]]);
  const _sfc_main$3 = {
    __name: "register",
    setup(__props, { expose: __expose }) {
      __expose();
      const username = vue.ref("");
      const password = vue.ref("");
      const confirmPassword = vue.ref("");
      const handleRegister = () => {
        if (!username.value || !password.value || !confirmPassword.value) {
          uni.showToast({
            title: "请填写所有字段",
            icon: "none"
          });
          return;
        }
        if (password.value !== confirmPassword.value) {
          uni.showToast({
            title: "两次输入的密码不一致",
            icon: "none"
          });
          return;
        }
        formatAppLog("log", "at pages/login/register.vue:57", "用户名:", username.value);
        formatAppLog("log", "at pages/login/register.vue:58", "密码:", password.value);
        uni.showToast({
          title: "注册功能待实现",
          icon: "none"
        });
      };
      const goToLogin = () => {
        uni.navigateBack();
      };
      const __returned__ = { username, password, confirmPassword, handleRegister, goToLogin, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "register-box" }, [
        vue.createElementVNode("text", { class: "title" }, "用户注册"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input",
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
            placeholder: "请输入用户名"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.username]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input",
            type: "password",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
            placeholder: "请输入密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.password]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "input",
            type: "password",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.confirmPassword = $event),
            placeholder: "请确认密码"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.confirmPassword]
        ]),
        vue.createElementVNode("button", {
          class: "register-btn",
          onClick: $setup.handleRegister
        }, "注册"),
        vue.createElementVNode("text", {
          class: "login-link",
          onClick: $setup.goToLogin
        }, "已有账号？返回登录")
      ])
    ]);
  }
  const PagesLoginRegister = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/login/register.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesAttendanceManagementAttendanceManagement = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/attendanceManagement/attendanceManagement.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("text", null, "考勤数据分析")
    ]);
  }
  const PagesDataAnalysisDataAnalysis = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "E:/HbuilderProject/uni-appProject/AttendanceSystem/pages/dataAnalysis/dataAnalysis.vue"]]);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/singIn/singIn", PagesSingInSingIn);
  __definePage("pages/singInRecord/singInRecord", PagesSingInRecordSingInRecord);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/login/register", PagesLoginRegister);
  __definePage("pages/attendanceManagement/attendanceManagement", PagesAttendanceManagementAttendanceManagement);
  __definePage("pages/dataAnalysis/dataAnalysis", PagesDataAnalysisDataAnalysis);
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

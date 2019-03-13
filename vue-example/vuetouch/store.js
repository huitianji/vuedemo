

// 生成 mutations 方法
function generate(name) {
  return function(state, value) {
    state[name] = value || state[name];
  };
}

const options = {
  // 多页面共享数据
  state: {
    message: "",

    busiId: localStorage.getItem("busiId"),
    busiName: localStorage.getItem("busiName"),
    token: localStorage.getItem("token"),
    menuIndex: "0",
    crumb: [],
    title: "",
    voucherArr: [],

    isCurrent:"0"//手机页面（mobile）menu -(选中)
  },

  // 操作
  actions: {
      logout() {
          $app.$store.commit("busiId", "");
          $app.$store.commit("busiName", "");
          $app.$store.commit("token", "");
          $app.$store.commit("voucherArr", "");
          localStorage.setItem("busiId", "");
          localStorage.setItem("busiName", "");
          localStorage.setItem("token", "");

          localStorage.setItem("saName", "null");
          localStorage.setItem("saMobile", "null");
          // localStorage.setItem("email", "null");
          localStorage.setItem("saEmplId", "null");

          $app.$router.replace({ name: "Login" });
      }
  },

  // 数据变更
  mutations: {}
};

// 为每个 state 字段生成对应的 mutations 方法
Object.keys(options.state).forEach(key => {
  options.mutations[key] = generate(key);
});

export default options;

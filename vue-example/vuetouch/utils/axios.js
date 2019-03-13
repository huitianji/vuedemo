

import axios from "vuedemo/vue-example/vuetouch/utils/axios";
// import { MessageBox } from "element-ui";
// import { Toast } from "mint-ui";
import { MessageBox } from 'mint-ui';

window.axios = axios;

axios.decorate = function(app, store, router) {
  function msg(response) {
    MessageBox.alert(response.data.message || "操作失败。").then(() => {
      if (response.data.code == "11114") {
        store.dispatch("logout");
      }
    });
  }

  axios.interceptors.request.use(config => {
    config.headers.Authorization = store.state.token;

    if (typeof config.data == "object") {
      Object.keys(config.data).forEach(key => {
        if (typeof config.data[key] == "string") {
          config.data[key] = config.data[key].trim();
        }
      });
    }

    return config;
  });

  axios.interceptors.response.use(
    response => {
      if (response.config.responseType == "blob") {
        return response;
      }
      else if (response.data.code == "00000") {
        return response.data;
      }
      else if(response.data.code == "11114"){
          MessageBox.alert(response.data.message || "操作失败。").then(() => {
              if (response.data.code == "11114") {
                  store.dispatch("logout");
              }
          });
      }
      else {
        return response.data;
         // msg(response);
        // return Promise.reject(response.data);
          //return response.data;
          // function f(response){
          //   return response.data;
          // }
      }

    },
    error => {
      let response = error.response;
      if (response) {
        msg(response);
      }
      return Promise.reject(error);
    }
  );
};

export default axios;

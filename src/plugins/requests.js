import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import App from "@/App.vue";
import router from "@/router";
axios.defaults.baseURL = "https://api.tambord.com/api/";
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    //you can have custom user frindly errors
    if (err.response.status === 401 || err.response.status === 403) {
      const authStore = useAuthStore();
      authStore.logout();
      router.push("/");
    }
    throw err;
  }
);
export default (context, resources, auth) => ({
  async setTag() {
    const response = await axios.post(resources, null, {
      headers: {
        Authorization: auth.isLogged ? auth.token : "",
      },
    });
    return response;
  },

  async setParams(params) {
    const response = await axios.post(resources, null, {
      headers: {
        Authorization: auth.isLogged ? auth.token : "",
      },
      params,
    });
    return response;
  },

  async setPayload(payload) {
    const response = await axios.post(resources, payload, {
      headers: {
        Authorization: auth.isLogged ? auth.token : "",
      },
    });
    return response;
  },
});

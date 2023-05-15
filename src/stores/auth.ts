import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore("auth", {
  persist: true,
  state: () => ({
    loggedIn: false,
    token: "",
    user: null,
  }),
  getters: {
    isLogged(): Boolean {
      return this.loggedIn;
    },
    getToken(): string {
      return this.token;
    },
    getUser(): Object | null {
      return this.user;
    },
  },
  actions: {
    logout() {
      this.loggedIn = false;
      this.token = "";
      this.user = null;
    },
    setUser(authenticationData: any) {
      this.loggedIn = true;
      this.token = authenticationData.token;
      this.user = authenticationData.user;
    },
    setUserFormSignIn(User: any,token:any) {
      this.loggedIn = true;
      this.token = token;
      this.user = User;
    },
  },
});

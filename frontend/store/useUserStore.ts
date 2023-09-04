import { defineStore } from "pinia";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  email_verified_at: string;
  isSuperUser: boolean;
  created_at: string;
  updated_at: string;
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    authUser(state) {
      return state.user;
    },
  },
  actions: {
    storeUser(data: User) {
      this.user = data;
    },
    logout() {
      this.user = null;
    },
  },
});

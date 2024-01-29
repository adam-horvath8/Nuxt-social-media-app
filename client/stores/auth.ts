import { defineStore } from "pinia";
import { ref } from "vue";
import type { currentUserType } from "~/types";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<currentUserType | null>(null);
  const isAuth = ref<boolean>(false);

  const login = async (userInfo: currentUserType, authRes: boolean) => {
    currentUser.value = userInfo || null;
    isAuth.value = authRes;
  };

  const logout = () => {
    isAuth.value = false;
    currentUser.value = null;
  };

  return { currentUser, login, logout, isAuth };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import type { currentUserType, errorMessageType } from "~/types";
import { url } from "~/utils/url";

interface LoginResponse {
  userInfo?: currentUserType;
  error?: string;
}

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<currentUserType | null>(null);
  const isAuth = ref<boolean>(false);
  const errorMessage = ref<errorMessageType>("");

  const login = async (username: string, password: string) => {
    try {
      const { data: response, error } = await useFetch<LoginResponse>(
        `${url}/auth/login`,
        {
          method: "post",
          body: { username, password },
        }
      );

      if (error.value) {
        errorMessage.value = error.value?.data.error;
        isAuth.value = false;
        console.log(isAuth.value);
        console.log(errorMessage.value);
      } else if (response.value) {
        currentUser.value = response.value.userInfo || null;
        isAuth.value = true;

        console.log(currentUser.value);
        console.log(isAuth.value);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    const { data: response, error } = await useFetch(
      `${url}/auth/logout`
    );
    if (error.value) {
      console.error("Logout error:", error.value);
      return;
    }

    console.log(response.value);

    if (response.value) {
      currentUser.value = null;
      isAuth.value = false;

      console.log(isAuth.value);
    }
  };

  return { currentUser, login, logout, isAuth, errorMessage };
});

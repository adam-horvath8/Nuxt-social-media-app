import type { currentUserType, errorMessageType } from "~/types";

interface LoginResponse {
  userInfo?: currentUserType;
  error?: string;
}

const useLoginUser = () => {
  const errorMessage = ref();

  const authStore = useAuthStore();

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await $fetch<LoginResponse>(`${url}/auth/login`, {
        method: "post",
        body: { username, password },
      });

      if (response.error) {
        errorMessage.value = response.error;
      }

      if (response.userInfo) {
        authStore.login(response.userInfo, true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { loginUser, errorMessage };
};

export default useLoginUser;

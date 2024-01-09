import { defineStore } from "pinia";
import { ref } from "vue";

type userType = {
  message: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null);

  const login = async (username: string, password: string) => {
    try {
      const { data: response } = await useFetch("/api/login", {
        method: "post",
        body: { username, password },
      });
      user.value = response.value;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    user.value = null;
    // Additional logout logic...
  };

  return { user, login, logout };
});

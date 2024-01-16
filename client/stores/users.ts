import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { usersType } from "~/types";

export const useUsersStore = defineStore("users", () => {
  const users = ref<usersType>([]);
  const searchInput = ref("");
  const errorMessage = ref<string | undefined>();

  const getUsers = async () => {
    if (users.value.length > 0) return;
    try {
      const { data: response, error } = await useFetch(
        "http://localhost:3004/auth/users"
      );

      if (error.value) {
        errorMessage.value = error.value?.data;
      } else if (response.value && Array.isArray(response.value)) {
        users.value = response.value;
      } else {
        users.value = []; // Ensure users.value is always an array
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSpecificUser = (userId: string) => {
    const foundUser = users.value.find((user) => user.id === userId);
    return foundUser;
  };

  const setSearchTerm = (input: string) => {
    searchInput.value = input;
  };

  const searchUsers = computed(() => {
    const searchTerm = searchInput.value.toLowerCase();

    return users.value.filter(
      (user) =>
        user.profile?.name?.toLowerCase().includes(searchTerm) ||
        user.profile?.surname?.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
  });

  return {
    users,
    errorMessage,
    getUsers,
    getSpecificUser,
    searchUsers,
    setSearchTerm,
  };
});

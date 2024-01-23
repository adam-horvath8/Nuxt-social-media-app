import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { profileType, usersType } from "~/types";
import { url } from "~/utils/url";

export const useUsersStore = defineStore("users", () => {
  const users = ref<usersType>([]);
  const searchInput = ref("");
  const errorMessage = ref<string | undefined>();

  const getUsers = async () => {
    if (users.value.length > 0) return;
    try {
      const { data: response, error } = await useFetch(
        `${url}/auth/users`
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

  const updateUser = (updatedProfile: profileType) => {
    const userIndex = users.value.findIndex(user => user.id === updatedProfile.userId);
    if (userIndex !== -1) {
      users.value[userIndex].profile = updatedProfile;
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
    updateUser
  };
});

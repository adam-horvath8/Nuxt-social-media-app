import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { profileType, usersType } from "~/types";
import { url } from "~/utils/url";

export const useUsersStore = defineStore("users", () => {
  const users = ref<usersType>([]);
  const searchInput = ref("");
  const errorMessage = ref<string | undefined>();

  const setUsers = (allUsers: usersType) => {
    if (users.value.length > 0) return;
    users.value = allUsers;
  };

  const updateUser = (updatedProfile: profileType) => {
    const userIndex = users.value.findIndex(
      (user) => user.id === updatedProfile.userId
    );
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

  const clearSearchInput = () => {
    searchInput.value = "";
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
    setUsers,
    getSpecificUser,
    searchUsers,
    setSearchTerm,
    updateUser,
    clearSearchInput,
  };
});

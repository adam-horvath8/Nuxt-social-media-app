import type { usersType } from "~/types";

interface fetchI {
  allUsers: usersType;
}

const useGetUsers = () => {
  const isLoading = ref(false);

  const usersStore = useUsersStore();
  
  const getUsers = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch<fetchI>(`${url}/auth/users`);

      if (response) {
        usersStore.setUsers(response.allUsers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  return { getUsers, isLoading };
};

export default useGetUsers;

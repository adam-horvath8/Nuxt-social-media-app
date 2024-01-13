import type { usersType } from "~/types";

export const useGetUsers = () => {
  const users = ref<usersType>([]);
  const errorMessage = ref<string | undefined>();

  const getUsers = async () => {
    try {
      const { data: response, error } = useFetch(
        "http://localhost:3004/auth/users"
      );

      if (error.value) {
        errorMessage.value = error.value?.data;
      } else if (response.value && Array.isArray(response.value)) {
        users.value = response.value; // Cast the response to usersType
      } else {
        users.value = []; // Ensure users.value is always an array
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { users, errorMessage, getUsers };
};

import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref();
  const errorMessage = ref();

  const toastStore = useToastStore();

  const updateProfile = async (userId: string, formData: FormData) => {
    try {
      const { data: response, error } = await useFetch(
        `http://localhost:3004/profile/${userId}`,
        {
          method: "put",
          body: formData,
        }
      );

      if (error.value) {
        toastStore.displayToast(error.value.data, false);
      } else if (response.value) {
        profile.value = response.value;
        // toastStore.displayToast(response.value , true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { profile, updateProfile };
});

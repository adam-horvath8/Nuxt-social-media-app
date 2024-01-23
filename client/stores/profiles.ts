import { defineStore } from "pinia";
import { ref } from "vue";
import type { profileType } from "~/types";
import { url } from "~/utils/url";

interface ProfileResponse {
  updatedProfile: profileType;
  usersProfile: profileType;
  // ... any other properties that might come in the response
}

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<profileType>({
    id: "",
    userId: "",
    name: "",
    surname: "",
    address: "",
    description: "",
    profileImg: "",
    email: "",
    telNumber: "",
  });

  const toastStore = useToastStore();
  const usersStore = useUsersStore();

  const updateProfile = async (userId: string, formData: FormData) => {
    try {
      const { data: response, error } = await useFetch<ProfileResponse>(
        `${url}/profile/${userId}`,
        {
          method: "put",
          body: formData,
        }
      );

      if (error.value) {
        toastStore.displayToast(error.value.data, false);
      } else if (response.value) {
        profile.value = sanitizeProfileData(response.value.updatedProfile);
        usersStore.updateUser(response.value.updatedProfile);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async (userId: string) => {
    try {
      const { data: response, error } = await useFetch<ProfileResponse>(
        `${url}/profile/${userId}`
      );
      if (error.value) {
        toastStore.displayToast(error.value.data, false);
      } else if (response.value) {
        profile.value = sanitizeProfileData(response.value.usersProfile);
        // toastStore.displayToast(response.value , true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { profile, updateProfile, getProfile };
});

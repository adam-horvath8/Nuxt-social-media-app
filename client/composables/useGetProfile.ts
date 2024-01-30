import type { profileType } from "~/types";

interface ProfileResponse {
  message: string;
  usersProfile: profileType;
}

const useGetProfile = () => {
  const isLoading = ref<boolean>(false);

  const profileStore = useProfileStore();


  const getProfile = async (userId: string) => {
    try {
      isLoading.value = true;

      const response = await $fetch<ProfileResponse>(
        `${url}/profile/${userId}`
      );

      if (response) {
        profileStore.setProfile(sanitizeProfileData(response.usersProfile));
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { getProfile, isLoading };
};

export default useGetProfile;

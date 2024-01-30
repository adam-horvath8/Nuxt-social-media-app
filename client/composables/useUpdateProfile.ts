import type { profileType } from "~/types";

interface ProfileResponse {
  updatedProfile: profileType;
  message: string;
}

const useUpdateProfile = () => {
  const profilesStore = useProfileStore();
  const toastStore = useToastStore();
  const usersStore = useUsersStore();

  const updateProfile = async (userId: string, formData: FormData) => {
    try {
      const response = await $fetch<ProfileResponse>(
        `${url}/profile/${userId}`,
        {
          method: "put",
          body: formData,
        }
      );

      if (response) {
        profilesStore.updateProfile(response.updatedProfile);
        usersStore.updateUser(response.updatedProfile);
        toastStore.displayToast(response.message, true);
      }
    } catch (error) {}
  };

  return { updateProfile };
};

export default useUpdateProfile;

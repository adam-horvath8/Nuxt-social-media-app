import { defineStore } from "pinia";
import { ref } from "vue";
import type { profileType } from "~/types";

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

  const updateProfile = async (updatedProfile: profileType) => {
    profile.value = updatedProfile;
  };

  const setProfile = (profileData: profileType) => {
    profile.value = profileData;
  };

  return { profile, updateProfile, setProfile };
});

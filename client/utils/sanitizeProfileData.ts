import type { profileType } from "~/types";

export function sanitizeProfileData(profile: profileType): profileType {
    return {
      id: profile.id || "",
      userId: profile.userId || "",
      name: profile.name || "",
      surname: profile.surname || "",
      address: profile.address || "",
      description: profile.description || "",
      profileImg: profile.profileImg || "",
      email: profile.email || "",
      telNumber: profile.telNumber || "",
    };
  }

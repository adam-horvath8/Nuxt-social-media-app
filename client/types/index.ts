export type errorMessageType = string | undefined;

export type loginValuesType = {
  username: string;
  password: string;
};

export type registerValuesType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type currentUserType = {
  id: string;
  username: string;
};

export type toastMessageType = {
  message: string;
};

export type postType = {
  id: string;
  text: string;
  imageSrc?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  replytoId: string;
};

export type postsType = postType[];

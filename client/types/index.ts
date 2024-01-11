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
  message: string 
};

import { APP_KEY, User, getAppData } from "../task/taskApi";

export enum AuthenticationMessages {
  USER_NOT_FOUND = "User not found",
  UNABLE_TO_FETCH_APP_DATA = "Unable to fetch application data",
  USER_LOGGED_IN = "Login Successful",
  USER_SIGNED_UP = "Signup Successful",
  DATA_FETCHED_SUCCESSFULLY = "Data has been fetched successfully",
  SOMETHING_WENT_WRONG = "Something went wrong",
  USERNAME_TAKEN = "This username is already taken",
}

export enum AuthenticationStatus {
  FAILED_INTERNALLY = 500,
  SUCCESS = 200,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export interface AuthenticationResponses {
  status: AuthenticationStatus;
  message: AuthenticationMessages;
  data?: {
    value?: User;
    list?: User[];
  };
}

export const getUsers = (): AuthenticationResponses => {
  const appData = getAppData();
  if (!appData)
    return {
      status: AuthenticationStatus.FAILED_INTERNALLY,
      message: AuthenticationMessages.UNABLE_TO_FETCH_APP_DATA,
    };

  return {
    data: { list: appData.users },
    message: AuthenticationMessages.DATA_FETCHED_SUCCESSFULLY,
    status: AuthenticationStatus.SUCCESS,
  };
};

export const signUp = (user: User): AuthenticationResponses => {
  try {
    const appData = getAppData();
    if (!appData)
      return {
        status: AuthenticationStatus.FAILED_INTERNALLY,
        message: AuthenticationMessages.UNABLE_TO_FETCH_APP_DATA,
      };

    const existingUser = appData.users.find(
      (existingUser) => existingUser.username === user.username
    );

    console.log(existingUser);

    if (existingUser)
      return {
        status: AuthenticationStatus.CONFLICT,
        message: AuthenticationMessages.USERNAME_TAKEN,
      };
    appData.users = [...appData.users, user];
    localStorage.setItem(APP_KEY, JSON.stringify(appData));
    return {
      status: AuthenticationStatus.SUCCESS,
      message: AuthenticationMessages.USER_SIGNED_UP,
      data: { value: user },
    };
  } catch (err) {
    return {
      status: AuthenticationStatus.FAILED_INTERNALLY,
      message: AuthenticationMessages.SOMETHING_WENT_WRONG,
    };
  }
};

export const signIn = (
  username: string,
  password: string
): AuthenticationResponses => {
  const response = getUsers();
  if (response.status !== AuthenticationStatus.SUCCESS) return response;
  const users = response.data?.list || [];
  const currentUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (currentUser)
    return {
      status: AuthenticationStatus.SUCCESS,
      message: AuthenticationMessages.USER_LOGGED_IN,
      data: { value: currentUser },
    };

  return {
    status: AuthenticationStatus.NOT_FOUND,
    message: AuthenticationMessages.USER_NOT_FOUND,
  };
};

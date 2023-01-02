import { axiosInstance, constants} from ".";

export const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post(`${constants.baseURL}/api/user/login`, user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterUser = async (user) => {
  try {

    const response = await axiosInstance.post(`${constants.baseURL}/api/user/register`, user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`${constants.baseURL}/api/user/get-current-user`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-all-users");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const UpdateProfilePicture = async (image) => {
  try {
    const response = await axiosInstance.post("/api/users/update-profile-picture", {
      image,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

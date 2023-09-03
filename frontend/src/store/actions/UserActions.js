import { toast } from 'react-hot-toast';
import instance from '../../utils/axiosInstance';

export const signup = async (data, navigate) => {
    console.log(data);
    const url = "/auth/register";
    let response = {};
    try {
        response = await instance.post(url, data);
        console.log(response);
    } catch (error) {
        toast.error(error?.response?.data?.msg?.split("_").join(" "));
        // console.log(error?.response?.data?.msg?.split("_").join(" "));
    } finally {
        if (response?.status === 200) {
            navigate("/login");
            toast.success("Signup Succesfull");
        }
    }
}

export const login = (data, navigate) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = `/auth/login`;
    try {
        const response = await instance.post(url, data);

        if (response.status === 200) {
            toast.success("Login successfull");
            dispatch({ type: "LOGIN_SUCCESS", payload: response?.data?.user });
            navigate("/");
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg?.split("_").join(" "));
    }
}
export const logout = (navigate) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = `/auth/logout`;
    try {
        const response = await instance.get(url);

        if (response.status === 200) {
            toast.success("Logged out successfully");
            dispatch({ type: "LOGOUT_SUCCESS" });
            navigate("/login");
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.success("Something wrong")
    }
}
export const loadUser = () => async (dispatch) => {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const url = `/user/profile`;
    try {
        const response = await instance.get(url);

        if (response.status === 200) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: response?.data?.user });
            return true;
        } else {
            dispatch({ type: "LOAD_USER_FAILURE" });
            toast.error(response.data.msg);
            return false;
        }
    } catch (error) {
        // toast.success(error?.response?.data?.msg);
        return false;
    }
}
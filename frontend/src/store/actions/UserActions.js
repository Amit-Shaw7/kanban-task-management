import { toast } from 'react-hot-toast';
import instance from '../../utils/axiosInstance';

export const signup = async (data, navigate) =>  {
    const url = "/auth/register";
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        toast.error(error?.response?.data?.msg?.split("_").join(" "));
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
        dispatch({ type: "STOP_LOADER" });
        toast.error(error?.response?.data?.msg?.split("_").join(" "));
    }
}
export const logout = (navigate) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = `/auth/logout`;
    try {
        const response = await instance.get(url);

        if (response.status === 200) {
            toast.dismiss();
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
export const loadUser = (navigate) => async (dispatch) => {
    const url = `/user/profile`;
    try {
        const response = await instance.get(url);

        if (response.status === 200) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: response?.data?.user });
            return;
        } else {
            navigate("/login");
            return;
        }
    } catch (error) {
       navigate("/login");
       return;
    }
}
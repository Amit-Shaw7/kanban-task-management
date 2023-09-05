import { toast } from 'react-hot-toast';
import instance from '../../utils/axiosInstance';

export const signup = (data, navigate) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = "/auth/register";
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        dispatch({ type: "STOP_LOADER" });
        toast.error(error?.response?.data?.msg?.split("_").join(" "));
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "STOP_LOADER" });
            navigate("/login");
            toast.success("Signup Succesfull");
        }
    }
}

export const login = (data, navigate) => async (dispatch) => {
    // setLoading(true);
    dispatch({ type: "START_LOADER" });
    const url = `/auth/login`;
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        // setLoading(false);
        dispatch({ type: "STOP_LOADER" });
        toast.error(error?.response?.data?.msg?.split("_").join(" "));
    } finally {
        if (response.status === 200) {
            dispatch({ type: "STOP_LOADER" });
            // setLoading(false);
            toast.success("Login successfull");
            dispatch({ type: "LOGIN_SUCCESS", payload: response?.data?.user });
            navigate("/");
        }
    }
}

export const logout = (navigate) => async (dispatch) => {
    const url = `/auth/logout`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.success("Something wrong please try again");
    } finally {
        if (response.status === 200) {
            toast.dismiss();
            dispatch({ type: "LOGOUT_SUCCESS" });
            toast.success("Logged out successfully");
            navigate("/login");
        }
    }
}
export const loadUser = (navigate) => async (dispatch) => {
    const url = `/user/profile`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        navigate("/login");
    } finally {
        if (response.status === 200) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: response?.data?.user });
        } else {
            navigate("/login");
        }
    }
}
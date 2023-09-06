import { toast } from 'react-hot-toast';
import instance from '../../utils/axiosInstance';

export const getTodo = () => async (dispatch) => {
    dispatch({ type: "FETCH_TODO_REQUEST" });
    const url = `/task/todo`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        console.log(error.response?.data);
        if (error.response?.data.msg === "UNAUTHORIZED") {
            toast.error("Please login");
        } else if (error?.response?.data?.msg) {
            toast.error(error?.response?.data?.msg);
        } else {
            toast.error("Please wait for 15 seconds to let the server start as it is hosted in a free server");
        }
    } finally {
        if (response.status === 200) {
            dispatch({ type: "FETCH_TODO_SUCCESS", payload: response?.data?.tasks });
        }
    }
};

export const getDoing = () => async (dispatch) => {
    dispatch({ type: "FETCH_DOING_REQUEST" });
    const url = `/task/doing`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        if (error.response?.data.msg && error.response?.data.msg !== "UNAUTHORIZED") {
            toast.error(error?.response?.data?.msg);
        }
    } finally {
        if (response.status === 200) {
            dispatch({ type: "FETCH_DOING_SUCCESS", payload: response?.data?.tasks });
        }
    }
};

export const getDone = () => async (dispatch) => {
    dispatch({ type: "FETCH_DONE_REQUEST" });
    const url = `/task/done`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        if (error.response?.data.msg && error.response?.data.msg !== "UNAUTHORIZED") {
            toast.error(error?.response?.data?.msg);
        }
    } finally {
        if (response.status === 200) {
            dispatch({ type: "FETCH_DONE_SUCCESS", payload: response?.data?.tasks });
        }
    }
};

export const addTask = (data) => async (dispatch) => {
    const url = `/task/add`;
    toast.loading("Adding your task");
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response.status === 200) {
            toast.dismiss();
            toast.success("Added in todo");
            dispatch({ type: "ADD_TASK_SUCCESS", payload: response?.data?.task });
        }
    }
};

export const editTask = (data, id, status) => async (dispatch) => {
    const url = `/task/${id}`;
    dispatch({ type: "EDIT_TASK_SUCCESS", payload: { data, id, status } });
    try {
        const response = await instance.patch(url, data);
        if (response.status !== 200) {
            toast.error(response.data.msg);
            window.location.reload();
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        window.location.reload();
    }
};

export const deleteTask = (id) => async (dispatch) => {
    const url = `/task/${id}`;
    dispatch({ type: "DELETE_TASK_SUCCESS", payload: id });
    try {
        const response = await instance.delete(url);
        if (response.status !== 200) {
            toast.error(response.data.msg);
            window.location.reload();
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        window.location.reload();
    }
};

export const changeTaskStatus = (data) => async (dispatch) => {
    console.log(data);
    const url = `/task/changeStatus`;
    let response = {};
    dispatch({ type: "UPDATE_TASKS", payload: data.tasks });
    toast.success(`Moved to ${data.toStatus}`);
    const dataToSend = {
        toStatus: data.toStatus,
        draggedTaskId: data.draggedTaskId,
    }
    try {
        response = await instance.patch(url, dataToSend);
        if (response.status !== 200) {
            // window.location.reload();
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        // window.location.reload();
    }
};

export const changeTaskStatusForMobile = (data) => async (dispatch) => {
    const url = `/task/changeStatus`;
    let response = {};
    if (data.toStatus === "Doing") {
        dispatch({ type: "DELETE_TASK_SUCCESS", payload: data.task?._id });
        dispatch({ type: "ADD_TASK_TO_DOING", payload: data.task });
    } else if (data.toStatus === "Done") {
        dispatch({ type: "DELETE_TASK_SUCCESS", payload: data.task?._id });
        dispatch({ type: "ADD_TASK_TO_DONE", payload: data.task });
    } else {
        dispatch({ type: "DELETE_TASK_SUCCESS", payload: data.task?._id });
        dispatch({ type: "ADD_TASK_TO_TODO", payload: data.task });
    }
    toast.success(`Moved to ${data.toStatus}`);

    const dataToSend = {
        toStatus: data.toStatus,
        draggedTaskId: data.task._id,
    }
    try {
        response = await instance.patch(url, dataToSend);
        if (response.status !== 200) {
            // window.location.reload();
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        // window.location.reload();

    }
};

export const swapTaskIndex = (data) => async (dispatch) => {
    const url = `/task/swap`;
    let response = {};

    dispatch({ type: "UPDATE_TASKS", payload: data.tasks });

    const dataToSend = {
        draggedId: data.draggedId,
        droppedId: data.droppedId,
    }
    toast.success("Re-arranged tasks");
    try {
        response = await instance.patch(url, dataToSend);
    } catch (error) {
        toast.success(error?.response?.data?.msg);
    } finally {
        if (response.status !== 200) {
            // window.location.reload();
        }
    }
};
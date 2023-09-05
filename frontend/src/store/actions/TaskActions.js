import { toast } from 'react-hot-toast';
import instance from '../../utils/axiosInstance';

export const getTodo = () => async (dispatch) => {
    dispatch({ type: "FETCH_TODO_REQUEST" });
    const url = `/task/todo`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
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
        toast.error(error?.response?.data?.msg);
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
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response.status === 200) {
            dispatch({ type: "FETCH_DONE_SUCCESS", payload: response?.data?.tasks });
        }
    }
}

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
            dispatch({ type: "ADD_TASK_SUCCESS", payload: response?.data?.task });
        }
    }
}

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
    }
}

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
    }
}

export const changeTaskStatus = (data) => async (dispatch) => {
    const url = `/task/changeStatus`;
    let response = {};

    dispatch({ type: "UPDATE_TASKS", payload: data.tasks });
    toast.success(`Moved to ${data.toStatus}`);

    const dataToSend = {
        toStatus: data.toStatus,
        draggedTaskId: data.draggedTaskId,
        index: data.index
    }

    try {
        response = await instance.patch(url, dataToSend);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response.status === 200) {
            toast.dismiss()
        }
    }
}

export const changeTaskStatusForMobile = (data) => async (dispatch) => {
    const url = `/task/changeStatus`;
    let response = {};
    if (data.toStatus === "Doing") {
        dispatch({ type: "DELETE_TASK_SUCCESS", payload: data.task?._id });
        dispatch({ type: "ADD_TASK_TO_DOING", payload: data.task });
    } else if (data.toStatus === "Done") {
        dispatch({ type: "DELETE_DOING_SUCCESS", payload: data.task?._id });
        dispatch({ type: "ADD_TASK_TO_DONE", payload: data.task });
    } else {
        dispatch({ type: "DELETE_DONE_SUCCESS", payload: data.task?._id });
        dispatch({ type: "ADD_TASK_TO_TODO", payload: data.task });
    }

    toast.success(`Moving to ${data.toStatus}`);

    const dataToSend = {
        toStatus: data.toStatus,
        draggedTaskId: data.task._id,
        index: data.index
    }
    try {
        response = await instance.patch(url, dataToSend);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response.status === 200) {
            toast.success(`Moved to ${data.toStatus}`);
        } else {
            window.location.reload();
        }
    }
}

export const swapTaskIndex = (data) => async (dispatch) => {
    const url = `/task/swap`;
    let response = {};

    dispatch({ type: "UPDATE_TASKS", payload: data.tasks });

    const dataToSend = {
        draggedId: data.draggedId,
        droppedId: data.droppedId,
    }

    toast.loading("Re-arranging tasks");
    try {
        response = await instance.patch(url, dataToSend);
    } catch (error) {
        toast.success(error?.response?.data?.msg);
    } finally {
        if (response.status === 200) {
            // toast.success("Swapped");
            toast.dismiss();
            toast.success("Re-arranged tasks");
        }
    }
}
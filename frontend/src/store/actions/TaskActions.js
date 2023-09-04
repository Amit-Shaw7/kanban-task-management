import { toast } from 'react-hot-toast';
import instance from '../../utils/axiosInstance';

export const getTodo = () => async (dispatch) => {
    dispatch({ type: "FETCH_TODO_REQUEST" });
    const url = `/task/todo`;
    try {
        const response = await instance.get(url);
        if (response.status === 200) {
            dispatch({ type: "FETCH_TODO_SUCCESS", payload: response?.data?.tasks });

        } else {
            dispatch({ type: "FETCH_TODO_FAILURE" });
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}
export const getDoing = () => async (dispatch) => {
    dispatch({ type: "FETCH_DOING_REQUEST" });
    const url = `/task/doing`;
    try {
        const response = await instance.get(url);
        if (response.status === 200) {
            dispatch({ type: "FETCH_DOING_SUCCESS", payload: response?.data?.tasks });
        } else {
            dispatch({ type: "FETCH_DOING_FAILURE" });
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}
export const getDone = () => async (dispatch) => {
    dispatch({ type: "FETCH_DONE_REQUEST" });
    const url = `/task/done`;
    try {
        const response = await instance.get(url);
        if (response.status === 200) {
            dispatch({ type: "FETCH_DONE_SUCCESS", payload: response?.data?.tasks });

        } else {
            dispatch({ type: "FETCH_DONE_FAILURE" });
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}

export const addTask = (data) => async (dispatch) => {
    const url = `/task/add`;
    try {
        const response = await instance.post(url, data);
        if (response.status === 200) {
            dispatch({ type: "ADD_TASK_SUCCESS", payload: response?.data?.task });
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return false;
    }
}

export const editTask = (data, id, status) => async (dispatch) => {
    const url = `/task/${id}`;
    try {
        const response = await instance.patch(url, data);
        dispatch({ type: "EDIT_TASK_SUCCESS", payload: { data, id, status } });
        if (response.status !== 200) {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return false;
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
export const deleteDoing = (id) => async (dispatch) => {
    const url = `/task/${id}`;
    try {
        const response = await instance.delete(url);
        if (response.status === 200) {
            dispatch({ type: "DELETE_DOING_SUCCESS", payload: id });
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}
export const deleteDone = (id) => async (dispatch) => {
    const url = `/task/${id}`;
    try {
        const response = await instance.delete(url);
        if (response.status === 200) {
            dispatch({ type: "DELETE_DONE_SUCCESS", payload: id });
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}

export const changeTaskStatus = (data) => async (dispatch) => {
    dispatch({ type: "UPDATE_TASKS", payload: data.tasks });
    const url = `/task/changeStatus`;
    const dataToSend = {
        toStatus: data.toStatus,
        draggedTaskId: data.draggedTaskId,
        index: data.index
    }
    toast.loading(`Moving to ${data.toStatus}`);

    try {
        const response = await instance.patch(url, dataToSend);
        if (response.status === 200) {
            toast.dismiss()
            toast.success(`Moved to ${data.toStatus}`);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}

export const changeTaskStatusForMobile = (data) => async (dispatch) => {
    const url = `/task/changeStatus`;
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
    toast.loading(`Moving to ${data.toStatus}`);

    const dataToSend = {
        toStatus: data.toStatus,
        draggedTaskId: data.task._id,
        index: data.index
    }
    try {
        const response = await instance.patch(url, dataToSend);
        if (response.status === 200) {
            toast.dismiss();
            toast.success(`Moved to ${data.toStatus}`);
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}

export const swapTaskIndex = (data) => async (dispatch) => {
    console.log(data.tasks);
    dispatch({ type: "UPDATE_TASKS", payload: data.tasks });
    const url = `/task/swap`;
    const dataToSend = {
        draggedId: data.draggedId,
        droppedId: data.droppedId,
    }
    toast.loading("Re-arranging tasks");
    try {
        const response = await instance.patch(url, dataToSend);
        if (response.status === 200) {
            // toast.success("Swapped");
            toast.dismiss();
            toast.success("Re-arranged tasks");
        } else {
            toast.error(response.data.msg);
        }
    } catch (error) {
        toast.success(error?.response?.data?.msg);
    }
}
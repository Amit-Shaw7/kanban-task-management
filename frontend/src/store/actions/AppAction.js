export const changeTaskType = (type) => async (dispatch) => {
    dispatch({ type: "CHANGE_TASK_TYPE" , payload : type });
}
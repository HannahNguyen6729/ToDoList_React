import { ADD_TASK, CHANGE_THEME, DONE_TASK, DELETE_TASK, EDIT_TASK , UPDATE_TASK} from "../types/ToDoListTypes";

export const add_task = (payload) => ({
  type: ADD_TASK,
  payload,
});

export const changeThemes = (payload) => ({
  type: CHANGE_THEME,
  payload
})

export const doneTask = (payload) =>({
  type: DONE_TASK,
  payload
})

export const deleteTask = (payload) =>({
  type: DELETE_TASK,
  payload
})
export const editTask = (payload) => ({
  type: EDIT_TASK,
  payload
})
export const updateTask = (payload) => ({
  type: UPDATE_TASK,
  payload
})


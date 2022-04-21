import { ToDoListLightTheme } from "../../ToDoList/Theme/ToDoListLightTheme";
import { ToDoListDarkTheme } from "../../ToDoList/Theme/ToDoListDarkTheme";
import { ToDoListPrimaryTheme } from "../../ToDoList/Theme/ToDoListPrimaryTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DONE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../types/ToDoListTypes";
import { arrThemes } from "../../ToDoList/Theme/ArrayTheme";
const initialState = {
  theme: ToDoListDarkTheme,
  taskList: [
    { id: "task-0", name: "Code", done: true },
    { id: "task-00", name: "Clean house", done: false },
    { id: "task-000", name: "fix bug", done: true },
    { id: "task-0000", name: "gym", done: false },
  ],
  taskEdit: { id: "task-000", name: "task important", done: false },
};
const ToDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      let newList = [...state.taskList];
      if (action.payload.name.trim() === "") {
        alert("Please fill the task name!");
        return { ...state };
      }
      let index = newList.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index !== -1) {
        alert("the task name is already in the list");
        return { ...state };
      }
      state.taskList = [...newList, action.payload];
      return { ...state };
    }
    case CHANGE_THEME: {
      const theme = arrThemes.find((item) => item.id == action.payload);
      if (theme) {
        state.theme = { ...theme.theme };
      }
      return { ...state };
    }
    case DONE_TASK: {
      const newTaskList = [...state.taskList];
      const index = newTaskList.findIndex((item) => item.id == action.payload);
      if (index !== -1) {
        newTaskList[index].done = true;
      }
      state.taskList = newTaskList;
      return { ...state };
    }
    case DELETE_TASK: {
      let newTaskList = [...state.taskList];
      newTaskList = newTaskList.filter((item) => item.id !== action.payload);
      state.taskList = newTaskList;
      return { ...state };
    }
    case EDIT_TASK: {
      return { ...state, taskEdit: action.payload };
    }
    case UPDATE_TASK: {
      let newTaskList = [...state.taskList];
      //update the name of taskEdit
      state.taskEdit={...state.taskEdit,name: action.payload}
      let index = newTaskList.findIndex((item) => item.id == state.taskEdit.id);
      if (index !== -1) {
        newTaskList[index]= state.taskEdit;
      }
      state.taskEdit={id: -1, name: '', done:false}
      return { ...state, taskList: newTaskList };
    }
    default:
      return { ...state };
  }
};
export default ToDoListReducer;

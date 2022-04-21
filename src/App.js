import ToDoList from "./ToDoList/ToDoListMain/ToDoList/ToDoList";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";

const store = createStore(rootReducer);
function App() {
  return (
    <Provider store={store}>
      <ToDoList/>
    </Provider>
  );
}

export default App;

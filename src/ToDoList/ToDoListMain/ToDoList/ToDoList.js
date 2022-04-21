import React, { Component, createRef } from "react";
import { Container } from "../../ToDoListComponents/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../../ToDoListComponents/Dropdown";
import { Heading2 } from "../../ToDoListComponents/Heading";
import { TextField } from "../../ToDoListComponents/TextField";
import { Button } from "../../ToDoListComponents/Button";
import { arrThemes } from "../../Theme/ArrayTheme";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
} from "../../ToDoListComponents/Table";
import { connect } from "react-redux";
import {
  add_task,
  changeThemes,
  doneTask,
  deleteTask,
  editTask,
  updateTask,
} from "../../../redux/action/ToDoListAction";

class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((item, index) => (
        <Thead key={item.id}>
          <Tr>
            <Th style={{ verticalAlign: "middle" }}>{item.name}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState({ disabled: false }, () => {
                    this.props.dispatch(editTask(item));
                  });
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                className="mx-2"
                onClick={() => this.props.dispatch(doneTask(item.id))}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button onClick={() => this.props.dispatch(deleteTask(item.id))}>
                <i className="fa fa-trash-alt"></i>
              </Button>
            </Th>
          </Tr>
        </Thead>
      ));
  };
  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((item, index) => (
        <Thead key={item.id}>
          <Tr>
            <Th style={{ verticalAlign: "middle" }}>{item.name}</Th>
            <Th className="text-right">
              <Button onClick={() => this.props.dispatch(deleteTask(item.id))}>
                <i className="fa fa-trash-alt"></i>
              </Button>
            </Th>
          </Tr>
        </Thead>
      ));
  };
  renderArrThemes = () => {
    return arrThemes.map((item, index) => (
      <option value={item.id} key={index}>
        {item.name}
      </option>
    ));
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => this.props.dispatch(changeThemes(e.target.value))}
          >
            {this.renderArrThemes()}
          </Dropdown>
          <Heading2 className="font-weight-bolder">To do list</Heading2>
          <TextField
            onChange={(event) => {
              this.setState({ taskName: event.target.value });
            }}
            label="Task name"
            className="w-50"
            value={this.state.taskName}
          />
          <Button
            className="mx-2"
            onClick={() => {
              let { taskName } = this.state;
              let newTask = {
                id: Date.now(),
                name: taskName,
                done: false,
              };
              this.setState({ taskName: "" }, () => {
                this.props.dispatch(add_task(newTask));
              });
            }}
          >
            <i className="fa fa-plus"></i> Add
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTask(this.state.taskName));
              }}
            >
              <i className="fa fa-upload"></i> Update
            </Button>
          ) : (
            <Button
              onClick={() => {
                let { taskName } = this.state;
                this.setState({ disabled: true, taskName: "" }, () => {
                  this.props.dispatch(updateTask(taskName));
                });
              }}
            >
              <i className="fa fa-upload"></i> Update
            </Button>
          )}

          <hr />
          <Heading2 className="font-weight-bolder">Task to do</Heading2>
          <Table>{this.renderTaskToDo()}</Table>

          <Heading2 className="font-weight-bolder">Task completed</Heading2>
          <Table>{this.renderTaskCompleted()}</Table>
        </Container>
      </ThemeProvider>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({ taskName: this.props.taskEdit.name });
    }
  }
}
const mapStateToProps = (state) => {
  return {
    theme: state.ToDoListReducer.theme,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);

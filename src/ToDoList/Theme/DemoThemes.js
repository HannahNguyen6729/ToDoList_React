import React, { Component } from "react";
import styled from "styled-components";
import {ThemeProvider} from 'styled-components';

const configDarkTheme = {
  bg: "black",
  textColor: "white",
  border: '10px solid orange'
};
const configLightTheme = {
  bg: 'green',
  textColor: 'white',
  border: '10px solid purple'
};

export default class DemoThemes extends Component {
  state={
    current: configLightTheme,
  };
  handleChangeTheme=(event)=>{
    this.setState({
      current: event.target.value == '1'? configDarkTheme: configLightTheme
    })
  };
  render() {
    const DivStyle = styled.div`
      background-color: ${props=> props.theme.bg};
      color: ${props => props.theme.textColor};
      border: ${props => props.theme.border};
      text-align:center;
      padding: 1rem 2rem;
      font-size: 2rem;
    `;
    return (
      <ThemeProvider theme = {this.state.current}>
        <DivStyle>
          Hello Risto!
        </DivStyle>
        <select onChange={this.handleChangeTheme}>
          <option value='1'>Dark theme</option>
          <option value='2'> light theme</option>
        </select>
      </ThemeProvider>
    )
  }
}

import React, { Component } from "react";
import Form from "./Form";
import CardContainer from "./CardContainer";
import ShowDetails from "./ShowDetails";
import "./App.scss";

export default class App extends Component {

  state = {
    foxes: [],
    foxItem: {},
    name: "",
    imgUrl: ""
  }

  handleShowClick = (fox) => {
    // console.log("hey", fox)
    this.setState({
      foxItem: fox,
      name: fox.name,
      imgUrl: fox.img_url
    })
  }

  handleChange = (event) => {
    console.log("hey", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave = (event, fox) => {
    event.preventDefault()
    fetch("http://localhost:3000/foxes", {
      method: 'POST',
      headers: {
        "Content-Type": "application/JSON",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        img_url: this.state.imgUrl
      })
    })
    .then(res => res.json())
    .then(foxObj => {
      this.setState({
        foxes: [foxObj, ...this.state.foxes]
      })
    })
    .then(
      this.setState({
      name: '',
      imgUrl: ''
      })
    )
  }

  handleEdit = (event, fox) => {
    console.log("edit button", fox)
    event.preventDefault()
    fetch(`http://localhost:3000/foxes/${fox.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        img_url: this.state.imgUrl
      })
    })
    .then(res => res.json())
    .then(foxObj => {
      const foxes = this.state.foxes.map((fox => {
        return fox.id === foxObj.id ? foxObj : fox
      }))
      this.setState({
      foxes: foxes,
      foxItem: foxObj
    })
  })
    .then(
      this.setState({
        name: '',
        imgUrl: ''
      })
    )
  }

  componentDidMount(){
    fetch("http://localhost:3000/foxes")
    .then(res => res.json())
    .then(foxObj => {
      this.setState({
        foxes: foxObj
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Form
          fox={this.state.foxItem}
          name={this.state.name}
          imgUrl={this.state.imgUrl}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleEdit={this.handleEdit}
          />
        <CardContainer
          foxes={this.state.foxes} handleShowClick={this.handleShowClick}
        />
      <ShowDetails fox={this.state.foxItem}/>
      </React.Fragment>
    );
  }
}

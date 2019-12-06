import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./Home.css";
import firebase from "./core/firebase";
const uuidv1 = require("uuid/v1");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      searchValue: "",
      searchResult: [],
      name: "",
      userPassword: "",
      userPhone: "",
      username: "",
      userType: "",
      uuid: uuidv1(),
      openForm: false
    };
  }

  componentDidMount() {
    const database = firebase.database().ref("data");
    database.on("value", snapshot => {
      let userData = snapshot.toJSON();
      let userList = []
      for (let key in userData) {    
        userList.push(Object.assign(userData[key], {id: key}));
    }

      this.setState({ users: userList, searchResult: Object.values(userList) });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue != this.state.searchValue) {
      let searchResult = [];
      Object.entries(this.state.users).map((id, index) => {
        if (id[1].name.toLowerCase().includes(this.state.searchValue)) {
          searchResult.push(id[1]);
          this.setState({
            searchResult: searchResult
          });
        }
      });
    }
  }

  addStudent = () => {
    firebase
      .database()
      .ref(`data/${this.state.uuid}`)
      .set({
        name: this.state.name,
        password: this.state.userPassword,
        phone: this.state.userPhone,
        user_name: this.state.username,
        user_type: this.state.userType
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      name: "",
      userPassword: "",
      userPhone: "",
      username: "",
      userType: ""
    });
  };

  deleteUser = (id) =>{
    let userRef = firebase.database().ref('data/' + id);
    userRef.remove()
  }

  render() {
    return (
      <div className="home-main-container">
        <div className="navbar-container">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">USERS</Navbar.Brand>
            <Nav className="mr-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link> */}
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={event => {
                  this.setState({ searchValue: event.target.value });
                }}
              />
              <Button
                variant="primary"
                className="add-btn"
                onClick={() => this.setState({ openForm: true })}
              >
                Add Details
              </Button>
            </Form>
          </Navbar>
        </div>
        {this.state.openForm && (
          <Form>
            <Form.Group controlId="userForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={e => this.setState({ name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e =>
                  this.setState({ userPassword: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={e => this.setState({ userPhone: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Username"
                onChange={e =>
                  this.setState({ username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Type"
                onChange={e => this.setState({ userType: e.target.value })}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={() => this.addStudent()}
            >
              Submit
            </Button>
            <Button
              variant="secondary"
              type="submit"
              className="add-btn"
              onClick={() => this.setState({ openForm: false })}
            >
              Cancel
            </Button>
          </Form>
        )}

        <div className="userlist-container">
          {this.state.searchResult.length
            ? this.state.searchResult.map((id, index) => {
                return (
                  <div key={index} className="user-details-container">
               
                    <Button variant="dark" className="delete-btn" onClick={()=>this.deleteUser(id.id)}>Delete</Button>
                   
                    <p>Name: {id.name}</p>
                    <p>Password: {id.password}</p>
                    <p>Phone No: {id.phone}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

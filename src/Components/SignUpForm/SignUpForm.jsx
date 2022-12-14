import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };
  signupHandle = async (evt) => {
    evt.preventDefault();

    console.log(
      `Handling Name is ${this.state.username} and email is ${this.state.email}`
    );
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone,
        }),
      });
      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) {
        const errorMsg = await fetchResponse.json();

        throw new Error(errorMsg);
      }

      let token = await fetchResponse.json(); //3.decode fetch response to get jwt from srv
      console.log(`This is the token we got: `, token);
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;

      console.log(`This is userDoc after parsing token: `, userDoc);
      //call function all the way up in login page and update user
      this.props.handleLoginUpdate(userDoc);
    } catch (error) {
      console.log("SignupForm error", error);
      this.setState({ error: `Sign Up Error: ${error}` });
    }
  };

  render() {
    //const disable = this.state.password !== this.state.confirm;
    return (
      <div className="SignUpForm" onSubmit={this.signupHandle} id="login">
        <form name="form-login">
          <h1>USER SIGN UP</h1>
          <span class="fontawesome-user"></span>
          <input
            type="text"
            id="user"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <span class="fontawesome-lock"></span>
          <input
            type="password"
            id="pass"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <span class="fontawesome-user"></span>
          <input
            id="pass"
            placeholder="email"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <span class="fontawesome-user"></span>
          <input
            id="pass"
            placeholder="FirstName"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <span class="fontawesome-user"></span>
          <input
            id="pass"
            placeholder="LastName"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />
          <span class="fontawesome-user"></span>
          <input
            type="text"
            id="pass"
            placeholder="Phone"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="SIGN UP" />
        </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}

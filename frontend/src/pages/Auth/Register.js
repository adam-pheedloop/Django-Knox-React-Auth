import React, { useState } from "react";
import { connect } from "react-redux";
import { auth } from "../../actions";

function Register(props) {
  const [formData, setFormData] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    props.register(formData.username, formData.password, formData.first_name, formData.last_name);
  };

  return (
    <div>
      <h1>JOIN NOW</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="card-header">Create Account</h2>
        <div className="card-body">
          <label htmlFor="email">
            <b> Email: </b> <br />
            <input
              type="text"
              value={formData.username}
              placeholder="Email"
              name="email"
              onChange={e =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </label>
          <br />
          <label htmlFor="first_name">
            <b>First Name: </b> <br />
            <input
              type="text"
              value={formData.first_name}
              placeholder="First Name"
              name="first_name"
              onChange={e =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              required
            />
          </label>
          <br />
          <label htmlFor="last_name">
            <b>Last Name: </b> <br />
            <input
              type="text"
              value={formData.last_name}
              placeholder="Last Name"
              name="last_name"
              onChange={e =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            <b> Password: </b> <br />
            <input
              type="password"
              value={formData.password}
              placeholder="Password"
              name="password"
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            <b>Confirm Password: </b> <br />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
            />
          </label>
          <br />
          <input type="submit" value="Sign-up" />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password, first_name, last_name) =>
      dispatch(auth.register(username, password, first_name, last_name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

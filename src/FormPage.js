import React, { useState } from "react";
import { UserDetails } from "./UserDetails";
import { SelectedUsers } from "./SelectedUsers";

export const FormPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSelectedUsers, setShowSelectedUsers] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validateErrors = {};

    if (!formData.username.trim()) {
      validateErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      validateErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      validateErrors.email = "Email format is not valid";
    }

    if (!formData.password.trim()) {
      validateErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)
    ) {
      validateErrors.password = "Password should contain at least 1 uppercase and 1 lowercase letter, 1 special character, 1 numerical value, and be a minimum of 8 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      validateErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0 && selectedUsers.length >= 3) {
      setShowSelectedUsers(true);
    } else if (selectedUsers.length < 3) {
      alert("Please select at least 3 users.");
    }
  };

  return (
    <div>
      <h1>Form Handling with Users</h1>
      <div className="form-container">
        {!showSelectedUsers ? (
          <form onSubmit={handleSubmit}>
            <label>Admin name:</label>
            <input type="text" name="username" autoComplete="off" placeholder="Enter your name here" onChange={handleChange} />
            <br />
            {errors.username && <span>{errors.username}</span>}
            <br />
            <label>Admin email :</label>
            <input type="email" name="email" autoComplete="off" placeholder="Enter your email here" onChange={handleChange} />
            <br />
            {errors.email && <span>{errors.email}</span>}
            <br />
            <label>Password :</label>
            <input type="password" name="password" autoComplete="off" placeholder="Enter your password here" onChange={handleChange} />
            <br />
            {errors.password && <span>{errors.password}</span>}
            <br />
            <label>Confirm password :</label>
            <input type="password" name="confirmPassword" autoComplete="off" placeholder="Passwords should be the same" onChange={handleChange} />
            <br />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            <br />
            <div className="user-list">
              <UserDetails onSelectUsers={setSelectedUsers} />
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <SelectedUsers users={selectedUsers} />
        )}
      </div>
    </div>
  );
};

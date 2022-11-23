import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import FormInput from "./FormInput";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Form validations...
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Enter username...",
      errorMessage:
        "Username should be 3-12 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,12}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Enter your email...",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: "^[w-.]+@([w-]+.)+[w-]{2,4}$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter your password...",
      errorMessage: "Password should be 6-12 characters",
      label: "Password",
      pattern: "^[0-9]{6,12}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password...",
      errorMessage: "Password not matching!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const payload = {
        name: values.username,
        email: values.email,
        password: values.password,
      };
      const result = await axios.post(
        "http://restapi.adequateshop.com/api/authaccount/register",
        payload
      );
      console.log(payload);
      if (result.data.code === 1) return toastr.error(result.data.message);
      toastr.success(result.data.message);
      navigate("/login");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // console.log(values);

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button disabled={loading} type="submit">
          Register
        </button>

        <div style={{ paddingBottom: "30px" }}>
          <Link to="/">Return to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

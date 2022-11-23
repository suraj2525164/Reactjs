import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useToastr } from "../toastr";
import FormInput from "./FormInput";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastr = useToastr();

  // Form validations...
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Enter your email...",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern:
        "[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(.[-a-zA-Z0-9_]+)*.([cC][oO][mM]))(:[0-9]{1,5})?",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Enter your password...",
      errorMessage: "Password should be 6-12 characters",
      label: "Password",
      pattern: "^[0-9]{6,12}$",
      required: true,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
      };
      const result = await axios.post(
        "http://restapi.adequateshop.com/api/authaccount/login",
        payload
      );
      console.log(result);
      if (result.data.code === 1) return toastr.error(result.data.message);
      localStorage.setItem("user",JSON.stringify(result.data.data))
      toastr.success(result.data.message);
      navigate("/home");
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
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button disabled={loading} type="submit">
          Login
        </button>

        <div style={{ paddingBottom: "30px" }}>
          <Link to="/register">Return to Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
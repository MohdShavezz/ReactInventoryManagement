import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/Login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(3),
    password: Yup.string().required("Password is required")
    // .matches(
    //     "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    //   )
      ,
  });

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        var decodedToken = jwtDecode(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", decodedToken.username);
        localStorage.setItem("email", decodedToken.email);
        window.location.reload(); 
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div style={{ width: "130vh", height: "83vh" }}>
      <div className="container">
        <h2>login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" required />
              <ErrorMessage name="username" component="p" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" required />
              <ErrorMessage name="password" component="p" className="error" />
            </div>
            <div>
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

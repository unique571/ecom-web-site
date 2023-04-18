import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/usre/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().nullable().email("email should be valid"),
  mobile: yup.string.required("mobile No is required"),
  password: yup.string().required("password should be valid"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValue: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onsubmit: (value) => {
     dispatch(registerUser(value));
    },
  });
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                onsubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                 type="text"
                  name="firstname"
                   placeholder="first Name"
                   value={formik.firstname}
                   onChange={formik.handleChange("firstName")}
                   onBlur={formik.handleBlur("firstName")} 
                   />
                    <div className="error">
                      {
                        formik.touched.firstName && formik.errors.firstname
                      }

                    </div>
                    <CustomInput 
                type="text"
                 name="lastname"
                  placeholder="last Name"

                  value={formik.lastname}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")} 
                  />
                   <div className="error">
                     {
                       formik.touched.lastName && formik.errors.lastname
                     }
                   </div>
                <CustomInput 
                type="email"
                 name="email"
                  placeholder="Email"

                  value={formik.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")} 
                  />
                   <div className="error">
                     {
                       formik.touched.email && formik.errors.email
                     }

                   </div>



                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.mobile}
                   onChange={formik.handleChange("mobile")}
                   onBlur={formik.handleBlur("mobile")} 
                   />
                    <div className="error">
                      {
                        formik.touched.mobile && formik.errors.mobile
                      }

                    </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.password}
                   onChange={formik.handleChange("password")}
                   onBlur={formik.handleBlur("password")} 
                   />
                    <div className="error">
                      {
                        formik.touched.password && formik.errors.password
                      }

                    </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;

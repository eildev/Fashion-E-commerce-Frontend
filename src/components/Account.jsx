import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGetCsrfTokenQuery, useRegisterUserMutation } from '../redux/features/api/auth/authApi';
import { useForm } from 'react-hook-form';
import { loginFailure, loginStart, loginSuccess } from '../redux/features/slice/authSlice';
import toast from 'react-hot-toast';
import DynamicForm from './DynamicForm';
import { Icon } from '@iconify/react/dist/iconify.js';

const Account = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from || "/";
  
    // RTK Query hooks
    const { isLoading: csrfLoading } = useGetCsrfTokenQuery();
    const [registerUser, { isLoading: registerLoading, error: registerError }] =
      useRegisterUserMutation();
  
    // react-hook-form setup
    const {
      register,
      handleSubmit,
      watch,
      setError,
      formState: { errors },
    } = useForm();
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword((prevState) => !prevState);
    };
  
    const signUpHandleData = async (data) => {
      dispatch(loginStart());
      try {
        const result = await registerUser({
          email: data.email,
          name: data.name,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }).unwrap();
  console.log("result", result);
        if (result.status === 200 || result.status === 201) {
          dispatch(loginSuccess(result));
          
          toast.success("Registration successful! You are now logged in.");
          navigate(from);
      
        } else {
          dispatch(loginFailure(result.message));
          if (result.errors) {
            Object.keys(result.errors).forEach((field) => {
              setError(field, {
                type: "manual",
                message: result.errors[field][0],
              });
            });
          } else {
            toast.error(result.message || "Registration failed");
          }
        }
      } catch (err) {
        dispatch(loginFailure(err?.data?.message || "Registration failed"));
        const errorData = err?.data;
        if (errorData?.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            setError(field, {
              type: "manual",
              message: errorData.errors[field][0],
            });
          });
        } else {
          toast.error(errorData?.message || "Registration failed");
        }
      }
    };
    return (
        <section className="account py-80">
            <div className="container container-lg">
                <form action="#">
                    <div className="row gy-4">
                        {/* Login Card Start */}
                        <div className="col-xl-6 pe-xl-5">
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">Login</h6>
                                <div className="mb-24">
                                    <label
                                        htmlFor="username"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Username or email address <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="username"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="password"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Password
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="password"
                                            className="common-input"
                                            id="password"
                                            placeholder="Enter Password"
                                            defaultValue="password"
                                        />
                                        <span
                                            className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                                            id="#password"
                                        />
                                    </div>
                                </div>
                                <div className="mb-24 mt-48">
                                    <div className="flex-align gap-48 flex-wrap">
                                        <button type="submit" className="btn btn-main py-18 px-40">
                                            Log in
                                        </button>
                                        <div className="form-check common-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue=""
                                                id="remember"
                                            />
                                            <label
                                                className="form-check-label flex-grow-1"
                                                htmlFor="remember"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-48">
                                    <Link
                                        to="#"
                                        className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Login Card End */}
                        {/* Register Card Start */}
                        
                        <div className="col-xl-6">
                        <DynamicForm title="Sign Up" handleForm={handleSubmit(signUpHandleData)}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                                <h6 className="text-xl mb-32">Register</h6>
                                <div className="mb-24">
                                    <label
                                        htmlFor="usernameTwo"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Username <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="usernameTwo"
                                        placeholder="Write a username"
                                    />
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="emailTwo"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Email address
                                        <span className="text-danger">*</span>{" "}
                                    </label>
                                    <input
                                        type="email"
                                        className="common-input"
                                        id="emailTwo"
                                        placeholder="Enter Email Address"
                                    />
                                </div>
                                <div className="mb-24">
                                    <label
                                        htmlFor="enter-password"
                                        className="text-neutral-900 text-lg mb-8 fw-medium"
                                    >
                                        Password
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="position-relative">
                                        {/* <input
                                            type="password"
                                            className="common-input"
                                            id="enter-password"
                                            placeholder="Enter Password"
                                            defaultValue="password"
                                        /> */}
                                             <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="common-input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                //   message: "Password must contain at least one letter and one number",
                // },
              })}
            />
                                        {/* <span
                                            className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                                            id="#enter-password"
                                        /> */}
                                        <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer "
            >
              <Icon
                icon={showPassword ? "ooui:eye-closed" : "ooui:eye"}
                width="1.5em"
                height="2em"
                style={{ color: "#898989" }}
              />
            </button>
                                    </div>
                                </div>
                                 {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm Password"
                  className="common-input"
              {...register("password_confirmation", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="toggle-password position-absolute top-30 inset-inline-end-0 me-16 translate-middle-y cursor-pointer "
            >
              <Icon
                icon={showConfirmPassword ? "ooui:eye-closed" : "ooui:eye"}
                width="1.5em"
                height="2em"
                style={{ color: "#898989" }}
              />
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
                                <div className="my-48">
                                    <p className="text-gray-500">
                                        Your personal data will be used to process your order, support
                                        your experience throughout this website, and for other purposes
                                        described in our
                                        <Link to="#" className="text-main-600 text-decoration-underline">
                                            {" "}
                                            privacy policy
                                        </Link>
                                        .
                                    </p>
                                </div>
                                <div className="mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40"
                                           
                                             >
                                                 {registerLoading ? "Signing up..." : "Register"}
                                        
                                    </button>
                                </div>
                            </div>
                            </DynamicForm>
                        </div>
                 
                        {/* Register Card End */}
                    </div>
                </form>
            </div>
        </section>

    )
}

export default Account
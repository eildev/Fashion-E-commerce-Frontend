// src/components/dynamic-form/DynamicForm.js
import { Icon } from "@iconify/react";
// import loginImage from "../../assets/img/login/Left Content.gif";
// import smallimage from "../../assets/img/login/small-logo.gif";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useGetFacebookAuthUrlQuery, useGetGoogleAuthUrlQuery } from "../redux/features/api/auth/authApi";

const DynamicForm = ({ title, handleForm, children = " " }) => {
  // const { data: googleData, isLoading: googleLoading } =
  //   useGetGoogleAuthUrlQuery();
  // const { data: facebookData, isLoading: facebookLoading } =
  //   useGetFacebookAuthUrlQuery();

  // Get the current route
  const location = useLocation();
  const showSocialLogin = ["/login", "/sign-up"].includes(location.pathname); // Check if route is /login or /sign-up

  const handleSubmit = (e) => {
    alert("sadf")
    e.preventDefault();
    const data = {
      email: e.target.email?.value,
      password: e.target.password?.value,
      name: e.target.name?.value,
      lastName: e.target.lastName?.value,
      confirmPassword: e.target.confirmpassword?.value,
    };
    handleForm(data);
  };

  // Google Login
  // const handleGoogleLogin = () => {
  //   if (googleData?.url) {
  //     window.location.href = googleData.url; // Google page redirect
  //   }
  // };

  // // Facebook login
  // const handleFacebookLogin = () => {
  //   if (facebookData?.url) {
  //     window.location.href = facebookData.url; // Facebook page redirect
  //   }
  // };

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* Left Section */}
        {/* <div className="w-full md:w-1/2 text-white flex flex-col justify-center items-center">
          <Link to="/" className="md:hidden w-full h-44">
            <image src={smallimage} alt="Small Device Image" className="w-full" />
          </Link>
          <Link to="/" className="hidden md:flex mt-auto w-full h-full">
            <imgge src={loginImage} alt="Login Image" />
          </Link>
        </div> */}
        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 md:px-12 rounded-t-[30px]">
          <h2 className="text-2xl font-bold mb-4 pt-5 md:pt-0">{title}</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            {children}
          </form>
          {/* Conditionally render social login section */}
          {/* {showSocialLogin && (
            <>
              <div className="my-6 text-gray-500 text-center">or</div>
              <div className="flex gap-4 md:flex-row">
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || !googleData?.url}
                  className="flex items-center bg-white justify-center gap-2 w-full border border-gray-300 py-2 px-4 rounded disabled:opacity-50"
                >
                  <Icon
                    icon="flat-color-icons:google"
                    width="2em"
                    height="2em"
                    className="w-5 h-5"
                  />
                  {googleLoading ? "Loading..." : "Google"}
                </button>
                <button
                  onClick={handleFacebookLogin}
                  disabled={facebookLoading || !facebookData?.url}
                  className="flex items-center bg-white justify-center gap-2 w-full border border-gray-300 py-2 px-4 rounded disabled:opacity-50"
                >
                  <Icon
                    icon="ic:baseline-facebook"
                    width="2em"
                    height="2em"
                    style={{ color: "#1977f3" }}
                    className="w-5 h-5"
                  />
                  {facebookLoading ? "Loading..." : "Facebook"}
                </button>
              </div>
            </>
          )} */}
          <p className="text-xs text-gray-400 mt-6 text-center">
            Protected by reCAPTCHA and subject to the Rhombus{" "}
            <Link to="/privacy-policy" className="text-secondary">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms-and-conditions" className="text-secondary">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;

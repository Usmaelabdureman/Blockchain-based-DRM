import { useCallback, useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../services/authApi";
import { useAppDispatch } from "../Hooks/hooks";
import { setUser } from "../services/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PropTypes from "prop-types";

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
  forgotPassword: "Forgot Password?",
  redirect: "Register",
};

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create an account",
  subheader: "Enter your details to create an account",
  buttonText: "Register",
  redirect: "Sign In",
};

const initialFormState = {
  userType: "creator",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordVisible: false,
};

AuthForm.propTypes = {
  mode: PropTypes.string.isRequired,
};

const AuthForm = ({ mode }) => {
  const [formState, setFormState] = useState({ ...initialFormState });
  const [error, setError] = useState("");
  const [
    login,
    { data: loginData, isSuccess: isLoginSuccess, isError: LoginError },
  ] = useLoginMutation();
  const [signup, { data: registerData }] = useSignupMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validateInput = () => {
        if (formState.username === "") {
          setError("Username is required");
          return false;
        } else if (formState.username.length < 4) {
          setError("Username must be at least 4 characters");
          return false;
        }
        if (formState.password === "" || formState.password.length < 6) {
          setError("Password is required and must be at least 6 characters");
          return false;
        }
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(formState.password)) {
          setError(
            "Password must contain at least one letter, one number, and one special character",
          );
          return false;
        }

        if (mode === "register") {
          if (formState.firstName === "") {
            setError("First Name is required");
            return false;
          } else if (formState.firstName.length < 4) {
            setError("First Name must be at least 4 characters");
            return false;
          }
          if (formState.lastName === "") {
            setError("Last Name is required");
            return false;
          }
          if (formState.email === "") {
            setError("Email is required");
            return false;
          }
          const validEmail = /\S+@\S+\.\S+/;

          if (!validEmail.test(formState.email)) {
            setError("Please enter a valid email");
            return false;
          }
        }
      };

      if (!validateInput()) {
        return;
      }

      try {
        if (mode === "register") {
          if (formState.password !== formState.confirmPassword) {
            setError("Passwords do not match");
            return;
          }

          signup(formState);
        } else {
          login(formState);
        }
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initialFormState });
      }
    },
    [formState, mode, login, signup],
  );

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/profile");
    }
    dispatch(
      setUser({
        username: loginData?.username,
        token: loginData?.token,
      }),
    );

    if (LoginError) {
      setError("Invalid Credentials");
    }

    if (registerData) {
      navigate("/signin");
    }
  }, [
    isLoginSuccess,
    navigate,
    LoginError,
    dispatch,
    loginData?.token,
    loginData?.username,
    registerData,
  ]);

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {content.header}
      </h2>
      <p className="text-gray-600 mb-4 text-center">{content.subheader}</p>
      <h1>Continue With</h1>
      <div className="grid grid-cols-2 gap-8">
        <button className="flex items-center   rounded " onClick={() => {}}>
          <FcGoogle className="mr-2" />
          Google
        </button>

        <button className="flex items-center  rounded " onClick={() => {}}>
          <FaFacebook className="mr-2" />
          Facebook
        </button>
      </div>

      <div className="flex items-center mt-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="px-3 text-gray-500">Or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={formState.firstName}
                  required
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      firstName: e.target.value,
                    }))
                  }
                />
                {error && error.includes("First Name") && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={formState.lastName}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      lastName: e.target.value,
                    }))
                  }
                />
                {error && error.includes("Last Name") && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 p-2 w-full border rounded"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              {error && error.includes("Email") && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={formState.username}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
          {error && error.includes("Username") && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={formState.passwordVisible ? "text" : "password"}
              className="mt-1 p-2 w-full border rounded"
              value={formState.password}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />

            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              onClick={() =>
                setFormState((prevState) => ({
                  ...prevState,
                  passwordVisible: !prevState.passwordVisible, // Toggle password visibility
                }))
              }
            >
              {formState.passwordVisible ? (
                <AiFillEye className="text-gray-500" />
              ) : (
                <AiFillEyeInvisible className="text-gray-500" />
              )}
            </div>
          </div>
          {error && error.includes("Password") && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </div>

        {mode === "register" && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={formState.passwordVisible ? "text" : "password"}
                  className="mt-1 p-2 w-full border rounded"
                  value={formState.confirmPassword}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={() =>
                    setFormState((prevState) => ({
                      ...prevState,
                      passwordVisible: !prevState.passwordVisible,
                    }))
                  }
                >
                  {formState.confirmPassword ? (
                    <AiFillEye className="text-gray-500" />
                  ) : (
                    <AiFillEyeInvisible className="text-gray-500" />
                  )}
                </div>
                {error && error.includes("Passwords do not match") && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-500"
              />
              <p className="text-gray-600 ml-2">
                I agree to the terms and conditions
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          {content.buttonText}
        </button>
      </form>
      {mode === "signin" && (
        <div className="flex justify-end">
          <Link
            to="/reset-password"
            className="text-gray-700 hover:underline mt-2 "
          >
            Forgot Password?
          </Link>
        </div>
      )}
      <p className="mt-4 text-gray-700 text-center">
        {content.linkText}{" "}
        <Link to={content.linkUrl} className="text-blue-500 hover:underline">
          {content.redirect}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;

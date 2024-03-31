import { useCallback, useEffect, useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate ,useLocation} from 'react-router-dom'
import { useLoginMutation, useSignupMutation } from '../services/authApi'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import PropTypes from 'prop-types';
import Alert from './Alert'



const signinContent = {
  linkUrl: '/',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
  forgotPassword: 'Forgot Password?',
  redirect: 'Register',
}

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create an account',
  subheader: 'Enter your details to create an account',
  buttonText: 'Register',
  redirect: 'Sign In',
}

const initialFormState = {
  userType: '',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  passwordVisible: false,
}


/**
 * AuthForm component handles the authentication form for user login and registration.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.mode - The mode of the form, either 'register' or 'login'.
 * @returns {JSX.Element} The rendered AuthForm component.
 */
const AuthForm = ({ mode }) => {
  const [formState, setFormState] = useState({ ...initialFormState });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' }); 
  const location = useLocation();

const searchParams = new URLSearchParams(location.search);
const userTypeFromUrl = searchParams.get('role')   
useEffect(() => {
  setFormState((prevState) => ({
    ...prevState,
    userType: userTypeFromUrl,
  }));
}, [userTypeFromUrl]);

  const [
    login,
    {  isSuccess: isLoginSuccess, isErrors: LoginErrors },
  ] = useLoginMutation();
  const [signup, { data: registerData }] = useSignupMutation();

  
  const navigate = useNavigate();
 

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrors({}); // Clear previous errors

      const validateInput = () => {
        let newErrors = {};

       
        if (formState.username === '') {
          newErrors.username = 'Username is required';
        } else if (formState.username.length < 4) {
          newErrors.username = 'Username must be at least 4 characters';
        }
        if (mode === 'register') {
          if (formState.firstName === '') {
            newErrors.firstName = 'First Name is required';
          }
          if (formState.lastName === '') {
            newErrors.lastName = 'Last Name is required';
          }
          if (formState.email === '') {
            newErrors.email = 'Email is required';
          } else if (!formState.email.includes('@')) {
            newErrors.email = 'Invalid email';
          }
        }
        if (formState.password === '') {
          newErrors.password = 'Password is required';
        } else if (formState.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(formState.password)) {
          newErrors.password = 'Password must contain at least one letter, one number, and one special character';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
      };

      if (!validateInput()) {
        return;
      }

      try {
        if (mode === 'register') {
          if (formState.password !== formState.confirmPassword) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: 'Passwords do not match',
            }));
            return;
          }

            await signup(formState).unwrap();
            setAlert({ message: 'Registration successful!', type: 'success' });
            // after showing the alert, navigate to the login page after 2 seconds
            setTimeout(() => {
            navigate('/signin');
            }, 3000);
        } else {
          await login(formState).unwrap();
          setAlert({ message: 'Login successful!', type: 'success' });
          
          setTimeout(() => {
            navigate('/profile');
          }
          , 3000);
        }
      } catch (e) {
        setAlert({ message: `Could not ${mode}. Please try again later.`, type: 'errors' });
      }
    },
    [formState, mode, login, signup, navigate]
  );

  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/profile');
    }

    if (LoginErrors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Invalid Credentials',
      }));
    }

    if (registerData) {
      navigate('/signin');
    }
  }, [isLoginSuccess, navigate, LoginErrors, registerData]);

  const content = mode === 'register' ? registerContent : signinContent;


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {content.header}
      </h2>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <p className="text-gray-600 mb-4 text-center">{content.subheader}</p>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {mode === 'register' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={formState.firstName}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      firstName: e.target.value,
                    }))
                  }
                />
                {
                  errors.firstName && (
                    <p className="text-red-500 mt-2">{errors.firstName}</p>
                  )
                }
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
                {errors.lastName && (
                  <p className="text-red-500 mt-2">{errors.lastName}</p>
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
              {errors.email && (
                <p className="text-red-500 mt-2">{errors.email}</p>
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
          {errors.username && (
            <p className="text-red-500 mt-2">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={formState.passwordVisible ? 'text' : 'password'}
              className="mt-1 p-2 w-full border rounded"
              value={formState.password}
              autoComplete='off'
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
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password}</p>
          )}
        </div>

        {mode === 'register' && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={formState.passwordVisible ? 'text' : 'password'}
                  className="mt-1 p-2 w-full border rounded"
                  value={formState.confirmPassword}
                  autoComplete='off'
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
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-2">{errors.confirmPassword}</p>
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
      {errors.general && <p className="text-red-500 mt-2 text-center">{errors.general}</p>}
      {mode === 'signin' && (
        <div className="flex justify-end">
          <Link
            to="/reset-password"
            className="text-gray-700 hover:underline mt-2 "
          >
            Forgot Password?
          </Link>
        </div>
      )}
      <div className="flex items-center mt-6">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="px-3 text-gray-500">Or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <h1 className='mt-5'>Continue With</h1>

      <div className="grid grid-cols-2 gap-8 mt-2">
        <button className="flex hover:border items-center border-gray-300 rounded" onClick={() => {}}>
          <FcGoogle className="mr-2" />
          Google
        </button>
        <button className="flex items-center hover:border border-gray-300 rounded" onClick={() => {}}>
          <FaFacebook className="mr-2 ml-3" />
          Facebook
        </button>
      </div>
      <p className="mt-4 text-gray-700 text-center">
        {content.linkText}{' '}
        <Link to={content.linkUrl} className="text-blue-500 hover:underline">
          {content.redirect}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm

AuthForm.propTypes = {
  mode: PropTypes.string.isRequired,
  
};

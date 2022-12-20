import logo from '../image/logo.jpg';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/authReducer';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [loginAttempt, setLoginAttempt] = useState(false);

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const res = await authService.login(credentials);
      dispatch(setUser(res));
      navigate('/');
    } catch (err) {
      setLoginAttempt(true);
      console.log(err.message);
    }
  };

  return (
    <div className="h-full bg-gray-50 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <img className="mx-auto h-12 w-auto" src={logo} alt="Annunci" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          In dein Konto einloggen

        </h2>
      </div>

      {/*Form field email */}
      <div className="h-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/*Form field passwort */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Passwort
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
              {/*Add routing to reset password */}
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Passwort vergessen?
                </a>
              </div>
            </div>

            {/*SignIn Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in

              </button>
            </div>
            {loginAttempt ? (<div className="p-4 mb-4 text-sm text-red-700 bg-white-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
              <span className="font-medium">Die E-Mail-Adresse oder das Passwort ist ungültig.</span>
            </div>) : ''}

          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500"></span>
              </div>
            </div>

            <p className="mt-2 text-center text-sm text-gray-600">
              Hast du noch kein Konto?
              {/*Add routing */}
              <a
                href="#"
                className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Jetzt registrieren.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

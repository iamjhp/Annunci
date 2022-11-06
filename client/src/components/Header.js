import { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../image/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '../reducers/authReducer';
import userService from '../services/user';
import authSerivce from '../services/auth';

const Header = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      authSerivce.verifyLoggedInUser().then((res) => {
        if (res === 201) {
          dispatch(setUser(userFromStorage));
        }
      });
    }
  }, [dispatch]);

  const handleLogOut = () => {
    navigate('/');
    dispatch(logout());
  };

  return (
    <div className="min-h-full ">
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                to="/"
              >
                <span className="sr-only">Annunci</span>
                <img className="h-8 w-auto sm:h-10" src={logo} alt="Annunci" />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Link
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                to="/faq"
              >
                FAQ
              </Link>
            </Popover.Group>
            {user == null ? (
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                <Link
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  to="/login"
                >
                  Sign in
                </Link>
                <Link
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  to="/signup"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                <p>hello {user.email}</p>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src={logo} alt="Annunci" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link
                      to="/"
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        Home
                      </span>
                    </Link>
                    <Link
                      to="/faq"
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        FAQ
                      </span>
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div>
                  <Link
                    to="/signup"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Du hast schon ein Konto?{' '}
                    <Link
                      to="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default Header;

import logo from '../image/logo.jpg';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../services/account';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;
const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const SignUp = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);

  const [errMsgInvalidEmail, setErrMsgInvalidEmail] = useState('');
  const [errMsgInvalidPassword, setErrMsgInvalidPassword] = useState('');
  const [errMsgInvalidConfirmPwd, setErrMsgInvalidConfirmPwd] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //validate email syntax
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  //validate pwd syntax and checks if the pwd & confirmPwd is equal
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidConfirmPwd(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  //clear the errormessage if the user changes user or pwd state
  useEffect(() => {
    setErrMsgInvalidEmail('');
    setErrMsgInvalidPassword('');
    setErrMsgInvalidConfirmPwd('');
  }, [email, pwd, confirmPwd]);

  //handles submit request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validEmail || !validPwd || !validConfirmPwd) {
      if (!validEmail) {
        setErrMsgInvalidEmail('Ungültige E-Mail-Adresse');
      }
      if (!validPwd) {
        setErrMsgInvalidPassword(
          'Passwort muss folgendes enthalten: mindestens eine Ziffer, ein Kleinbuchstaben, ein Grossbuchstaben, ein Sonderzeichen und 8 Zeichen lang sein'
        );
      } else
        setErrMsgInvalidConfirmPwd(
          'Die eingegebenen Passwörter stimmen nicht überein.'
        );
      setSuccess(false);
    } else {
      const newAccount = {
        email: email,
        password: pwd
      }
      accountService.createAccount(newAccount)

      setEmail('');
      setPwd('');
      setConfirmPwd('');

      navigate('/login');
    }
  };

  return (
    <>
      {success ? (
        navigate('/')
      ) : (
        <div className="h-full bg-gray-50 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo */}
            <img className="mx-auto h-12 w-auto" src={logo} alt="Annunci" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Neues Konto erstellen
            </h2>
          </div>

          {/*Form field email*/}
          <div className="h-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6" action="#">
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
                      ref={userRef}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {/* Errormessage invalid email*/}
                    <section>
                      <p
                        ref={errRef}
                        className={
                          errMsgInvalidEmail
                            ? 'text-red-600 errmsg'
                            : 'offscreen'
                        }
                        aria-live="assertive"
                      >
                        {errMsgInvalidEmail}
                      </p>
                    </section>
                  </div>
                </div>

                {/*Form field passwort*/}
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
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {/* Errormessage invalid pwd*/}
                    <section>
                      <p
                        ref={errRef}
                        className={
                          errMsgInvalidPassword
                            ? 'text-red-600 errmsg'
                            : 'offscreen'
                        }
                        aria-live="assertive"
                      >
                        {errMsgInvalidPassword}
                      </p>
                    </section>
                  </div>
                </div>

                <div>
                  {/*Form field confirm password */}
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passwort bestätigen
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      value={confirmPwd}
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {/* Errormessage invalid confirm pwd*/}
                    <section>
                      <p
                        ref={errRef}
                        className={
                          errMsgInvalidConfirmPwd
                            ? 'text-red-600 errmsg'
                            : 'offscreen'
                        }
                        aria-live="assertive"
                      >
                        {errMsgInvalidConfirmPwd}
                      </p>
                    </section>
                  </div>
                </div>

                {/*SignUp Button*/}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Jetzt registrieren
                  </button>
                </div>
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
                  Du hast schon ein Konto?
                  <a
                    href="/login"
                    className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Einloggen
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

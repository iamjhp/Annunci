import logo from '../image/logo.jpg'

const SignUp = () => {
  return(
      <div className="h-full bg-gray-50 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Annunci"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Neues Konto erstellen</h2>
        </div>

        {/*Form field email TODO*/}
        <div className="h-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

              {/*Form field passwort TODO*/}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

              <div>
                {/*Form field repeat password  TODO*/}
                <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
                  Passwort bestätigen
                </label>
                <div className="mt-1">
                  <input
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/*SignUp Button  TODO*/}
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

              {/*Add routing to loggin TODO*/}
              <a href="" className="ml-2 font-medium text-indigo-600 hover:text-indigo-500">
              Einloggen
              </a>
            </p>
              
            </div>
          </div>
        </div>
      </div>
    
  )
}


export default SignUp
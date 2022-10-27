import {CreateLoginTitle } from './LoginComponents'
import {CreateSignUpTitle } from './SignUp'

//Refactoring (Duplicate)
const logo = 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png'
const logoName = 'Annunci'

//Replace 
var isSignUp = true;
export default function LoginForm() {
    return (
      <>
      {/* Create logo*/}
        <div className="h-full bg-gray-50 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto"
            src={logo}
            alt={logoName}/>  

            {/* Switch between Login and SignUp title */}
            {isSignUp ? (
              <CreateSignUpTitle/>
            ) : (
                <CreateLoginTitle/>
              )
            }
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {/* Login body */}
            <div className="h-full bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
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
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
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
                  <div className="flex items-center">
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Passwort vergessen?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
  
              <div className="mt-6">
              <div className="relative flex justify-center text-sm">
                    
                    <span className ="firstLabel">
                    Hast du noch kein Konto?   
                     <a href="#" className="pl-2 font-medium text-indigo-600 hover:text-indigo-500">
                       Jetzt registrieren.
                   </a>
                   </span>
                 </div>
  
                
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
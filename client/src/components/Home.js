import { PlusIcon } from '@heroicons/react/24/outline'

const Home = () => {
  return(
      <div className="min-h-full bg-gray-100">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Entdecke die neuesten Inserate</h1>
              
              <button
              type="button"
              className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
              <PlusIcon className="mr-35 ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Inserat aufgeben
          </button>
              </div>
            
  
          <main>
               <div className="min-h-fit mt-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                  {/* Ad Content */}
                  < div className = "px-4 py-8 sm:px-0" >
                      <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                  </div >
              </div>
           </main>
       </div>
  )
};

export default Home;

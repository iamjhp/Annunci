import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdCard from './AdCard';
import adsService from '../services/ads';

/*Landing page with ads */
const Home = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    adsService.getAllItems().then((items) => {
      setAds(items);
    })

  }, []);

  const handleNewAdButton = () => {
    if (user) {
      navigate('/new-ad');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-full bg-gray-100">
      {/* Home title */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Entdecke die neuesten Inserate
        </h1>
        {/* New ad button */}
        <button
          type="button"
          onClick={handleNewAdButton}
          className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Inserat aufgeben
        </button>
      </div>

      <main>
        <div className="min-h-screen mt-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Ad Content */}
          <div className="px-4 py-8 sm:px-0">
            <div className="min-h-screen rounded-lg border-gray-200">
              {ads.length !== 0 ? <AdCard ads={ads} /> : <></>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

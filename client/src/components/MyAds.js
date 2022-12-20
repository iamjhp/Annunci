import { useState, useEffect } from 'react';
import userService from '../services/user';
import adsService from '../services/ads';
import { Link } from 'react-router-dom';

const MyAds = () => {
  const [ads, setAds] = useState('');

  useEffect(() => {
    const getUserAds = async () => {
      const userId = await userService.getUserID();
      adsService.getUserItems(userId).then((item) => setAds(item));
    };
    getUserAds();
  }, []);

  // Delete ad
  const handleDelete = async (id) => {
    const newAdsArray = ads.ads.filter(ad => ad.id !== id)
    const newObj = { ...ads, ads: newAdsArray }
    setAds(newObj)
    await adsService.deleteAd(id)
  }

  return (
    <>
      {ads ? (
        <div className="h-100 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="sm:flex sm:items-center">
            { /* Title */}
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Meine Inserate</h1>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              { /* Table with user ads */}
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Bild
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Preis
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Erstellt am
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Löschen</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {ads.ads.map((item) => (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <img
                              className="inline-block h-20 w-20 rounded-md"
                              src={adsService.makeImageLink(item.fileId)}
                              alt={item.title}
                            />
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {item.title}
                          </td>
                          <td className="whitespace-nowrap px-30 py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {item.price + " CHF"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">
                            {item.createdAt.substring(0, 19)}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className='mb-10'>
                            { /* Delete button */}
                              <button
                                type="button"
                                onClick={e => handleDelete(item.id, e)}
                                className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Delete
                              </button>
                              { /* Show details button */}
                              <Link
                                className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                to={`/ads/${item.id}`}
                              >
                                Show details
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default MyAds;

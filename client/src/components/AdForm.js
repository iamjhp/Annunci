import { useState } from 'react';
import adsService from '../services/ads';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/*Shows the form to create an ad and processing the upload*/

//Ad offers
const offers = [
  { id: 'sell', title: 'Biete' },
  { id: 'buy', title: 'Suche' },
];

const AdForm = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [file, setFile] = useState('');

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  //File upload message
  let fileMessage;
  if (file) {
    fileMessage = `hochgeladen: ${file.name}`;
  } else {
    fileMessage = 'PNG oder JPG bis zu 10MB';
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', event.target['file-upload'].files[0]);
      formData.append('title', event.target['form-title'].value);
      formData.append('description', event.target['form-description'].value);
      formData.append('price', event.target['form-price'].value);
      formData.append('offer', event.target['radio-button'].value);
      formData.append('owner', user.email)
      await adsService.createAd(formData);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  if (!user) {
    return navigate('/login');
  }

  return (
    <div className="h-full-screen bg-gray-100">
      <main className="h-full">
        <div className="h-full mt-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Ad Content */}
          <div className="px-4 py-8 sm:px-0">
            <div className="h-200 rounded-lg border-gray-200">
              <form
                onSubmit={handleOnSubmit}
                className="bg-gray-100 space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="space-y-6 sm:space-y-5">
                    <div>
                      {/* Title */}
                      <h1 className="text-lg font-medium leading-6 text-gray-900">
                        Neues gratis Inserat erstellen
                      </h1>
                    </div>

                    <div className="space-y-6 sm:space-y-5">
                      {/* Radio button for offer */}
                      <div>
                        {/* Subtitle */}
                        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Angebot
                        </label>
                        <fieldset className="mt-4">
                          <legend className="sr-only">
                            Notification method
                          </legend>
                          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                            {offers.map((offer) => (
                              <div key={offer.id} className="flex items-center">
                                <input
                                  id={offer.id}
                                  name="radio-button"
                                  type="radio"
                                  defaultChecked={offer.id === 'sell'}
                                  value={offer.title}
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={offer.id}
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  {offer.title}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>

                      {/* Title input */}
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="form-title"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Titel
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <div className="flex max-w-lg rounded-md shadow-sm">
                            <input
                              type="text"
                              name="form-title"
                              id="form-title"
                              autoComplete="form-title"
                              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* description input */}
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="form-description"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Beschreibung
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <textarea
                            id="form-description"
                            name="form-description"
                            rows={3}
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={''}
                          />
                        </div>
                      </div>

                      {/* price input */}
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="form-title"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Preis
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <div className="flex max-w-lg rounded-md shadow-sm">
                            {/* Currency */}
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                              CHF
                            </span>
                            <input
                              type="number"
                              name="form-price"
                              id="form-price"
                              autoComplete="form-price"
                              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* file upload field */}
                      <div className="bg-gray-100 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="upload-pic"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Bild hinzufügen
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-gray font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Ein Bild hochladen</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleUpload}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">
                                {fileMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  {/* Cancel Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    {/* Save Button */}
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdForm;

import adsService from '../services/ads';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import auth from '../services/auth';
import userService from '../services/user'
import CommentSection from './CommentSection';
import { useNavigate } from 'react-router-dom';

/*Shows the detailed description of an advertisement card.*/
const AdDetails = () => {
  const [ad, setAd] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    adsService.getItemById(id).then((item) => setAd(item));
  }, [id]);

  useEffect(() => {
    const checkIfLoggedUserOwner = async () => {
      const user = userService.getUser()
      if (user !== null) {
        const statusCode = await auth.verifyLoggedInUser()
        const adOnwer = await ad.owner
        if (statusCode === 201 && user.email === adOnwer) {
          setIsOwner(true)
        }
      }
    }

    checkIfLoggedUserOwner()
  }, [ad, isOwner])

  const handleDelete = async () => {
    await adsService.deleteAd(id)
    navigate('/');
  }

  return (
    <div>
      {ad.fileId ? (
        <div className="bg-gray-100">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:max-w-lg lg:self-end">
              <div className="mt-4">
                {/* Product title */}
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {ad.title}
                </h1>
              </div>
              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                {/* Product price */}
                <div className="flex items-center">
                  <p className="text-lg text-gray-900 sm:text-xl">
                    {ad.price} CHF
                  </p>

                  <div className="ml-4 border-l border-gray-300 pl-4">
                    {/* Product offer */}
                    {ad.offer === 'Biete' ? (
                      <div className="flex items-center">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm text-gray-500">Biete</p>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="ml-2 text-sm text-gray-500">Suche</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Product description */}
                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500">{ad.description}</p>
                </div>

                {/* email */}
                <div className="mt-4 space-y-6">
                  <span className="inline-flex items-center rounded-md bg-green-100 px-0 py-0.5 text-sm font-medium text-gray-800">
                    Contact:  {ad.owner}
                  </span>
                </div>
                {
                  isOwner ? (
                    <div className='mb-10'>
                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <></>
                  )
                }
              </section>
              {/* Comment section */}
              <div>
                <CommentSection ad={ad} />
              </div>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <img
                  src={adsService.makeImageLink(ad.fileId)}
                  alt="img"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      ) : ad === '' ? (
        <p>Loading...</p>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
};

export default AdDetails;

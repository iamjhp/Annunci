import adsService from '../services/ads';
import { Link } from 'react-router-dom';

/*An advertisement card with picture, offer, title and price*/ 
const AdCard = ({ ads }) => {
  return (
    <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {ads.slice().reverse().map((post) => (
        <div
          key={post.id}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg"
        >
          {/*Ad image*/}
          <div className="flex-shrink-0">
            <img
              className="h-48 w-full object-cover"
              src={adsService.makeImageLink(post.fileId)}
              alt="d"
            />
          </div>
          {/*Ad details*/}
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
              {/*Ad price*/}
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              {/*Ad offer*/}
              <span className="inline-flex items-center rounded bg-green-100 px-0.5 py-0.5 text-xs font-medium text-green-800">
                Typ: {post.offer}
              </span>
              <div></div>
              {/*Ad price*/}
              <span className="inline-flex items-center rounded bg-green-100 px-0.5 py-0.5 text-xs font-medium text-green-800">
                Preis: {post.price} CHF
              </span>
              <p className="mt-3 text-base text-gray-500">{post.description.substring(0, 100)}</p>
            </div>
            {/*show details button*/}
            <div className="mt-6 flex items-center justify-center">
              <Link
                className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                to={`/ads/${post.id}`}
              >
                Show details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdCard;

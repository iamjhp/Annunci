import adsService from "../services/ads";

const AdCard = ({ ads }) => {

  return (
    <div className="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {ads.map((post) => (
        <div
          key={post.id}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg"
        >
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={adsService.makeImageLink(post.fileId)} alt="d" />
          </div>
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
              <p className="text-xl font-semibold text-gray-900">
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {post.offer}
                </span>
                {post.title}
              </p>
              <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  price: {post.price}
              </span>
              <p className="mt-3 text-base text-gray-500">{post.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <button
                type="button"
                className="mr-5 float-right inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Show details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdCard;

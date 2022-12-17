import userService from '../services/user';
import adsService from '../services/ads';
import { useState } from 'react'

/*Comments section in AdDetails. Creates and manages comments.*/
const CommentSection = ({ ad }) => {
  const [comments, setComments] = useState(ad?.comments);
  const [comment, setComment] = useState('');
  const user = userService.getUser()?.email;

  const handleClick = (e) => {
    e.preventDefault();
    const toSaveComment = `${user} [${new Date().toLocaleString('en-GB')}] ${comment} `;
    //Check comment if not null
    if (comment.length !== 0) {
      adsService.commentAd(ad.id, toSaveComment);
      setComments([...comments].concat(toSaveComment));
    }
    e.target.comment.value = '';
    setComment('');
  };

  return (
    <div>
      {/* Title comment view*/}
      <h2 className='py-5'>Comments </h2>
      <div className="grid grid-cols-1 gap-3">
        {comments.map((comment, i) => (
          <div

            key={i}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >

            <div className="min-w-0 flex-1" >
              <span className="absolute inset-0" aria-hidden="true" />
              {/* Set user email and date */}
              <p className="text-sm font-medium text-gray-900">{comment.replace("[", "").split(']')[0]}</p>
              {/* Set user comment */}
              <p className="break-normal text-sm text-gray-500">{comment.split(']')[1]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-start space-x-4">

        {/* Check if user logged in */}
        {user && (
          <div className="min-w-0 flex-1 mt-5">
            <form action="#" className="relative" onSubmit={handleClick}>
              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                {/* Title comment section */}
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                {/* Comment text input */}
                <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  onChange={(e) => setComment(e.target.value)}
                  className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                  placeholder="Add your comment..."
                  defaultValue={''}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div className="py-2" aria-hidden="true">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                  </div>

                </div>
                <div className="flex-shrink-0">
                  {/* Post button */}
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
};

export default CommentSection;
